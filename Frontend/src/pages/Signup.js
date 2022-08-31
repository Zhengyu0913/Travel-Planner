import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as RouterLink, useHistory, useNavigate } from "react-router-dom";
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

  const [phoneInput, setPhoneInput] = useState("");
  const [phoneIsTouched, setPhoneIsTouched] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const firstNameIsValid = firstNameInput.trim() !== "";
  const firstNameInputIsInValid = !firstNameIsValid && firstNameIsTouched;

  const lastNameIsValid = lastNameInput.trim() !== "";
  const lastNameInputIsInValid = !lastNameIsValid && lastNameIsTouched;

  const emailIsValid = emailInput.includes("@");
  const emailIsInValid = !emailIsValid && emailIsTouched;

  const phoneIsValid = phoneInput.trim() !== "";
  const phoneInputIsInValid = !phoneIsValid && phoneIsTouched;

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
  const phoneChangeHandler = (e) => {
    setPhoneInput(e.target.value);
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
  const phoneBlurHandler = () => {
    setPhoneIsTouched(true);
  };
  const passwordBlurHandler = () => {
    setPasswordIsTouched(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstNameIsTouched(true);
    setLastNameIsTouched(true);
    setEmailIsTouched(true);
    setPhoneIsTouched(true);
    setPasswordIsTouched(true);
    if (
      !firstNameIsValid ||
      !lastNameIsValid ||
      !emailIsValid ||
      !phoneIsValid ||
      !passwordInput
    ) {
      return;
    }

    // console.log({
    //   firstName: firstNameInput,
    //   lastName: lastNameInput,
    //   email: emailInput,
    //   phoneNumber: phoneInput,
    //   password: passwordInput,
    // });

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXaLa6CbxBKo3owWVxbQQbtEeoxHl2DYw",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.login(data.idToken);
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });

    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setPhoneInput("");
    setPasswordInput("");

    setFirstNameIsTouched(false);
    setLastNameIsTouched(false);
    setEmailIsTouched(false);
    setPhoneIsTouched(false);
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone"
                  type="phoneNumber"
                  id="phoneNumber"
                  autoComplete="new-password"
                  onChange={phoneChangeHandler}
                  onBlur={phoneBlurHandler}
                  error={phoneInputIsInValid}
                  value={phoneInput}
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
      </Container>
    </ThemeProvider>
  );
}
