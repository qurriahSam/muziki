import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import { Box, TextField, InputAdornment, OutlinedInput, IconButton, Button } from "@mui/material";

const landing = {
  height: "89vh",
  marginTop: "0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const title = {
  marginBlockStart: "0em",
  marginBlockEnd: "0em",
  paddingTop: "5vh",
  paddingBottom: "5vh",
};

function Login({ handleSetUser }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    const sendCredentials = async () => {
      try {
        const url = "/login";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const user = await response.json();
        if (user.id) {
          handleSetUser(user);
          console.log("created in db", user);
          setValues({
            email: "",
            password: "",
            showPassword: false,
          });
          navigate("/dashboard");
        } else {
          alert(user["error"]);
        }
      } catch (error) {
        console.log("signup error", error);
      }
    };
    sendCredentials();
  };

  return (
    <div style={landing}>
      <Box>
        <h2 style={title}>Sign In</h2>
        <form>
          <FormControl sx={{ display: "block" }}>
            <TextField
              id="email"
              label="Email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mt: "3vh" }}
              size="small"
            />
          </FormControl>
          <FormControl sx={{ display: "block" }}>
            <OutlinedInput
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              placeholder="Password"
              size="small"
              sx={{ mt: "3vh" }}
            />
          </FormControl>
          <Button variant="contained" sx={{ mt: "3vh" }} onClick={handleSubmit}>
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default Login;
