import { createTheme } from "@mui/material";

const appTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      inverse: mode === "light" ? "#E0E0E0" : "#2F2F2F",
    },
    typography: {
      fontFamily: "Roboto",
    },
  });

export { appTheme };
