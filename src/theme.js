import { createTheme } from "@mui/material/styles";

// A custom theme for this app
let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          "& ::-webkit-scrollbar": {
            [theme.breakpoints.down("md")]: {
              width: "4px",
            },
            [theme.breakpoints.up("md")]: {
              width: "16px",
            },
          },
          "& ::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.default,
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.action.hover,
          },
          "& ::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.palette.action.selected,
          },
        },
      },
    },
  },
});

export default theme;
