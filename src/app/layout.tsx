"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Toolbar, Typography, Container, Box, Paper } from "@mui/material";
import theme from "./theme";
import { useEffect, useState } from "react";
import { User } from "@/types/RegisterRes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Books Application</title>
        <meta
          name="description"
          content="A beautiful books collection application"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* ✅ Header */}
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              background:
                "linear-gradient(135deg, #740001 0%, #2d1b69 50%, #eeba30 100%)",
              borderBottom: "3px solid #ffc500",
              boxShadow: "0 4px 20px rgba(116, 0, 1, 0.3)",
            }}
          >
            <Toolbar sx={{ py: 1 }}>
              {/* Logo + Title */}
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                <Box
                  sx={{
                    mr: 2,
                    fontSize: "2rem",
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  📚
                </Box>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    letterSpacing: "1px",
                    flexGrow: 1,
                    "&:hover": { color: "#ffc500", transition: "0.3s ease" },
                  }}
                >
                  Books Application
                </Typography>
              </Box>

              
              {user ? (
                <Box textAlign="right">
                  <Typography variant="body1" sx={{ color: "#fff", fontWeight: "bold" }}>
                    ✨ Welcome! ✨
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    {user.username}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    {user.email}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  
                </Typography>
              )}
            </Toolbar>
          </AppBar>
         
          {/* Main Content */}
          <Box
            component="main"
            sx={{
              minHeight: "calc(100vh - 80px)",
              background: `
                radial-gradient(circle at 20% 50%, rgba(45, 27, 105, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 197, 0, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(116, 0, 1, 0.05) 0%, transparent 50%)
              `,
              backgroundColor: "#f4f1de",
            }}
          >
            <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mb: 4,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(244,241,222,0.9) 100%)",
                  border: "2px solid #ffc500",
                  borderRadius: "15px",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background:
                      "linear-gradient(90deg, #740001, #ffc500, #2d1b69)",
                  },
                }}
              >
                <Typography
                  variant="h3"
                  component="h2"
                  align="center"
                  sx={{
                    fontWeight: 700,
                    color: "#740001",
                    mb: 1,
                  }}
                >
                  📚 Books Application 📚
                </Typography>
              </Paper>

              {/* Children Content */}
              <Box sx={{ "& > *": { mb: 2 } }}>{children}</Box>
            </Container>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              mt: "auto",
              py: 3,
              background: "linear-gradient(135deg, #2d1b69 0%, #740001 100%)",
              borderTop: "3px solid #ffc500",
            }}
          >
            <Container maxWidth="lg">
              <Typography
                variant="body2"
                align="center"
                sx={{
                  color: "#ffc500",
                  fontSize: "1rem",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                }}
              >
                ✨ "So many books, so little time" ✨
                <br />
                <Box component="span" sx={{ opacity: 0.8, fontSize: "0.9rem" }}>
                  © Books Application - Your Digital Library
                </Box>
              </Typography>
            </Container>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
