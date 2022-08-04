import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[300],
    },
    secondary: {
      main: "#494c7d",
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const handleSetUser = (r) => {
    setUser(r);
    //console.log(user);
  };

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(() => user);
          console.log("logged", user);
          if (user) {
            navigate("/dashboard");
          }
        });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar user={user} handleSetUser={handleSetUser} />
      <Routes>
        <Route path="/" element={<LandingPage user={user} handleSetUser={handleSetUser} />} />
        <Route path="signup" element={<SignUp handleSetUser={handleSetUser} />} />
        <Route path="login" element={<Login handleSetUser={handleSetUser} />} />
        <Route
          path="dashboard"
          element={<Dashboard user={user} songs={songs} setSongs={setSongs} />}
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
