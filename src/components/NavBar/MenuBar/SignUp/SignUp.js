import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import db from "../../../../firebase";
import { setUserCart } from "store/slices/userSlices";
import { useDispatch } from "react-redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        ACA PROJECT SHOP
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const register = async (e) => {
    e.preventDefault();

    const regUser = await createUserWithEmailAndPassword(
      auth,
      regEmail,
      regPass
    );

    await setDoc(doc(db, "users", regUser.user.uid), {
      name: firstName,
      surname: lastName,
      email: regEmail,
    });

    const userRef = doc(db, "users", regUser.user.uid);

    const cart = await addDoc(collection(db, "cart"), {
      userRef,
      items: [],
    });

    dispatch(setUserCart({ items: [], userRef, id: cart.uid }));

    navigate("/home");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="sectionContainer signUpTitle">
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
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
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
                    onChange={(e) => setLastName(e.target.value)}
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
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setRegPass(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={register}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/sign-in">
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </div>
    </ThemeProvider>
  );
}
