import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  InputAdornment,
  Link
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../services/api";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await auth.login(credentials.email, credentials.password);
      localStorage.setItem("token", data.token);
      navigate("/users");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />

      {/* Header */}
      <AppBar position="fixed" sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "center", alignItems: "center", gap: 2 }}>
          <img
            src={logo}
            alt="Company Logo"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              fontWeight: "bold", 
              letterSpacing: "1px", 
              color: "white", 
              textAlign: "center",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
            }}
          >
            Global Groupware Solutions Limited
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Centered Login Form */}
      <Container
        maxWidth="xs"
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          maxWidth: "100%!important",
          "@media (min-width: 600px)": { maxWidth: "600px!important" },
          background: "#F5F7FA"
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            width: "100%",
            maxWidth: "444px",
            margin: "0 auto",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 6
            }
          }}
        >
          <Typography 
            component="h1" 
            variant="h5" 
            align="center" 
            gutterBottom
            sx={{ 
              color: "#1A237E",
              fontWeight: "600",
              mb: 3
            }}
          >
            Employee Portal Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {error && (
              <Typography 
                color="error" 
                align="center" 
                sx={{ 
                  mb: 2,
                  fontWeight: "500"
                }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                color: "white",
                fontWeight: "bold",
                letterSpacing: "0.5px"
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          boxShadow: "none",
          py: 1,
          background: "linear-gradient(135deg, #1A237E 0%, #1976D2 100%)"
        }}
      >
        <Toolbar>
          <Typography
            variant="body2"
            sx={{
              width: "100%",
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "0.8rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <Box component="span" sx={{ mx: 1 }}>
              © {new Date().getFullYear()} Global Groupware Solutions Limited
            </Box>
            <Box component="span" sx={{ mx: 0.5 }}>•</Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Box component="span" sx={{ mx: 0.5 }}>•</Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default LoginPage;