// theme.ts
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica Neue", "Arial", sans-serif',
    allVariants: {
      textTransform: 'none',
    },
    h1: {
      fontWeight: "bold",
      color: red[900],
      textTransform: 'none',
    },
    h2: {
      fontWeight: "bold",
      color: red[900],
      textTransform: 'none',
    },
    h3: {
      fontWeight: "bold",
      color: red[900],
      textTransform: 'none',
    },
    h4: {
      fontWeight: "bold",
      color: red[800],
      textTransform: 'none',
    },
    h5: {
      fontWeight: "bold",
      color: red[700],
      textTransform: 'none',
    },
    h6: {
      fontWeight: "bold",
      color: red[600],
      textTransform: 'none',
    },
    body1: {
      textTransform: 'none',
    },
    body2: {
      textTransform: 'none',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          font-family: "Roboto", "Helvetica Neue", "Arial", sans-serif !important;
        }
        
        .MuiTypography-root {
          text-transform: none !important;
        }
        
        h1, h2, h3, h4, h5, h6 {
          text-transform: none !important;
        }
      `,
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.MuiTypography-h1': {
            textTransform: 'none',
          },
          '&.MuiTypography-h2': {
            textTransform: 'none',
          },
          '&.MuiTypography-h3': {
            textTransform: 'none',
          },
          '&.MuiTypography-h4': {
            textTransform: 'none',
          },
          '&.MuiTypography-h5': {
            textTransform: 'none',
          },
          '&.MuiTypography-h6': {
            textTransform: 'none',
          },
          '&.MuiTypography-body1': {
            textTransform: 'none',
          },
          '&.MuiTypography-body2': {
            textTransform: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "2px solid #4b2e83",
          borderRadius: "12px",
          padding: "16px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgba(75, 46, 131, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(75, 46, 131, 0.2)",
            transform: "translateY(-2px)",
          },
          "& .MuiTypography-root": {
            textTransform: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "2px solid #ffcc00",
          borderRadius: "12px",
          padding: "16px",
          backgroundColor: "#fffbea",
          boxShadow: "0 2px 4px rgba(255, 204, 0, 0.1)",
          "& .MuiTypography-root": {
            textTransform: 'none',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: "8px",
          fontWeight: "500",
          padding: "8px 16px",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#4b2e83",
    },
    secondary: {
      main: "#ffcc00",
    },
  },
});

export default theme;