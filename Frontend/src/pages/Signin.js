import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../context/auth-context";
import { Paper } from "@mui/material";
import { message } from "antd";
import { getAllDate } from "../components/utils/getAllDate";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const emailIsValid = emailInput.includes("@");
  const emailIsInValid = !emailIsValid && emailIsTouched;

  const passwordIsValid = passwordInput.trim() !== "";
  const passwordInputIsInValid = !passwordIsValid && passwordIsTouched;

  const emailChangeHandler = (e) => {
    setEmailInput(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPasswordInput(e.target.value);
  };

  const emailBlurHandler = () => {
    setEmailIsTouched(true);
  };

  const passwordBlurHandler = () => {
    setPasswordIsTouched(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailIsTouched(true);
    setPasswordIsTouched(true);
    if (!emailIsValid || !passwordInput) {
      return;
    }

    fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          let errorMessage = "Login failed! Check your internet connection.";
          if (res.status === 401) {
            errorMessage = "Username or Password incorrect!";
          }
          throw Error(errorMessage);
          // return res.json().then((data) => {
          //   let errorMessage = "Authentication failed!";
          //   if (data && data.error && data.error.message) {
          //     errorMessage = data.error.message;
          //   }
          //   throw new Error(errorMessage);
          // });
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.login("token");
        message.success("Welcome back.");
        navigate("/explore");
      })
      .catch((err) => {
        message.error(err.message);
      });

    setEmailInput("");
    setPasswordInput("");

    setEmailIsTouched(false);
    setPasswordIsTouched(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetch("/api/trips", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          message.info("You have already logged in!");
          navigate("/explore");
          return res.json();
        } else if (res.status === 404) {
          let errorMessage =
            "Connect to server failed! Please check your internet connection.";
          throw Error(errorMessage);
        }
      })
      .catch((err) => {
        message.error(err.message, 3);
      });
  }, [navigate]);
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
      >
        <Paper
          sx={{
            width: { xs: 200, md: 400 },

            borderRadius: 5,

            paddingX: "12px",
          }}
          elevation={3}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    error={emailIsInValid}
                    value={emailInput}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="outlined-adornment-password"
                      autoComplete="new-password"
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      onChange={passwordChangeHandler}
                      onBlur={passwordBlurHandler}
                      error={passwordInputIsInValid}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Copyright sx={{ mt: 5 }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
