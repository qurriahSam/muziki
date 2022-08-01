import React from "react";
import headphones from "../img/headphonesClipartpng";
import { Box, Button } from "@mui/material";

const landing = {
  height: "89vh",
  backgroundImage: "linear-gradient(to right, #E5D96A 50% , white 50%)",
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
        <Button variant="contained">Start Listening</Button>
      </Box>
    </div>
  );
}

export default LandingPage;
