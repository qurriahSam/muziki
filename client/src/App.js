import { ThemeProvider, createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
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
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="about" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
