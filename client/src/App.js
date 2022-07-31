import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

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
      <h1>hello</h1>
    </ThemeProvider>
  );
}

export default App;
