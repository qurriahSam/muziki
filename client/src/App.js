import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import Navbar from "./components/Navbar";
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
  const [user, setUser] = useState({});
  return (
    <ThemeProvider theme={theme}>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
        <Route path="signup" element={<SignUp setUser={setUser} />} />
        <Route path="login" element={<Login setUser={setUser} />} />
        <Route path="dashboard" element={<Dashboard user={user} />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
