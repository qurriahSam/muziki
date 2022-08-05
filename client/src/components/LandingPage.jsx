import React from "react";
import headphones from "../img/headphonesClipartpng";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const landing = {
  height: "88vh",
  backgroundImage: "linear-gradient(158deg, #fff176 50% , white 50%)",
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

function LandingPage() {
  return (
    <div style={landing}>
      <Box sx={{ textAlign: "center" }}>
        <img src={headphones} width={200} alt="headphones" />
        <h2 style={title}>Music for everyone.</h2>
        <Link to="signup" style={{ textDecoration: "none" }}>
          <Button variant="contained">Start Listening</Button>
        </Link>
      </Box>
    </div>
  );
}

export default LandingPage;
