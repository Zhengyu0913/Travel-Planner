import { useContext, useState } from "react";
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

export default function SignUp() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [firstNameInput, setFirstNameInput] = useState("");
  const [firstNameIsTouched, setFirstNameIsTouched] = useState(false);

  const [lastNameInput, setLastNameInput] = useState("");
  const [lastNameIsTouched, setLastNameIsTouched] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const firstNameIsValid = firstNameInput.trim() !== "";
  const firstNameInputIsInValid = !firstNameIsValid && firstNameIsTouched;

  const lastNameIsValid = lastNameInput.trim() !== "";
  const lastNameInputIsInValid = !lastNameIsValid && lastNameIsTouched;

  const emailIsValid = emailInput.includes("@");
  const emailIsInValid = !emailIsValid && emailIsTouched;

  const passwordIsValid = passwordInput.trim() !== "";
  const passwordInputIsInValid = !passwordIsValid && passwordIsTouched;

  const firstNameChangeHandler = (e) => {
    setFirstNameInput(e.target.value);
  };
  const lastNameChangeHandler = (e) => {
    setLastNameInput(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmailInput(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPasswordInput(e.target.value);
  };

  const firstNameBlurHandler = () => {
    setFirstNameIsTouched(true);
  };
  const lastNameBlurHandler = () => {
    setLastNameIsTouched(true);
  };
  const emailBlurHandler = () => {
    setEmailIsTouched(true);
  };

  const passwordBlurHandler = () => {
    setPasswordIsTouched(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstNameIsTouched(true);
    setLastNameIsTouched(true);
    setEmailIsTouched(true);

    setPasswordIsTouched(true);
    if (
      !firstNameIsValid ||
      !lastNameIsValid ||
      !emailIsValid ||
      !passwordInput
    ) {
      return;
    }

    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        first_name: firstNameInput,
        last_name: lastNameInput,
        email: emailInput,
        password: passwordInput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status < 200 || res.status >= 300) {
          throw Error("Failed to sign up");
        }
      })
      .then((data) => {
        // console.log(data);
        // authCtx.login(data.idToken);
        // navigate("/");
        message.success(`Successfully signed up`);
      })
      .catch((err) => {
        alert(err.message);
      });

    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setPasswordInput("");

    setFirstNameIsTouched(false);
    setLastNameIsTouched(false);
    setEmailIsTouched(false);

    setPasswordIsTouched(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={firstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                    error={firstNameInputIsInValid}
                    value={firstNameInput}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={lastNameChangeHandler}
                    onBlur={lastNameBlurHandler}
                    error={lastNameInputIsInValid}
                    value={lastNameInput}
                  />
                </Grid>
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/signin" variant="body2">
                    Already have an account? Sign in
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
