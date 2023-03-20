import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import ScrollToTop from "components/ScrollToTop";
import {makeStyles} from "@mui/styles";
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {auth} from "../../firebase";
import {setUser} from "../../store/slices/userSlices";


const useStyle = makeStyles({
  box: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const theme = createTheme();

export default function SignIn() {
  const classes = useStyle();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


  //-------------------------

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          dispatch(setUser({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            token: user.accessToken,
          }))
          navigate('/')
          console.log(user)
          // ...
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    } catch (e) {
      console.log('Google signin error - ', e.message)
    }


    // try {
    //   const provider = new GoogleAuthProvider();
    //   const googleUser = await signInWithPopup(auth, provider);
    //   const userRef = doc(db, "users", googleUser.user.uid);
    //
    //   const existingUser = await getDoc(userRef);
    //
    //   if (!existingUser.exists()) {
    //     await setDoc(doc(db, "users", googleUser.user.uid), {
    //       name: googleUser.user.displayName.split(" ")[0],
    //       surname: googleUser.user.displayName.split(" ").slice(1).join(" "),
    //       email: googleUser.user.email,
    //     });
    //
    //     await addDoc(collection(db, "cart"), {
    //       userRef,
    //       items: [],
    //     });
    //
    //     const response = collection(db, "cart");
    //     const q = query(response, where("userRef", "==", userRef));
    //     const data = await getDocs(q);
    //
    //     if (data.docs[0]) {
    //       dispatch(
    //         setUserCart({
    //           ...data.docs[0].data(),
    //           id: data.docs[0].data(0).uid,
    //         })
    //       );
    //     }
    //   }
    //
    //   navigate("/home");
    // } catch (error) {
    //   alert("Google error");
    // }
  };

  const loginWithEmail = async (e) => {
    e.preventDefault();

    try {
      signInWithEmailAndPassword(auth, loginEmail, loginPass).then((userCredential) => {
        const user = userCredential.user
        dispatch(setUser({
          email: user.email,
          token: user.accessToken,
          uid: user.uid,
          isAuth: true
        }))
        console.log(user)
        navigate('/')

      })

    } catch (e) {
      console.log('Login error', e.message())
    }


  };


  return (
    <ThemeProvider theme={theme}>
      <div className="sectionContainer signUpTitle">
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Box className={classes.box}>
            <Avatar sx={{m: 1, bgcolor: "secondary.main"}}></Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate sx={{mt: 1}}>
              {!error ? (
                <>
                  <TextField
                    margin="normal"
                    required={true}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setLoginPass(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <TextField
                    error
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <TextField
                    error="incorect"
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-error-helper-text"
                    name="password"
                    label="Password"
                    type="password"
                    onChange={(e) => setLoginPass(e.target.value)}
                  />
                </>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={loginWithEmail}
              >
                Sign In
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mb: 2, backgroundColor: "#e91e63"}}
                onClick={loginWithGoogle}
              >
                Sign In with GOOGLE
              </Button>

              <Grid container>
                <Grid item>
                  <NavLink to="/sign-up">
                    <Link href="src/xxxxxx/NavBar/MenuBar/SignIn#" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ScrollToTop/>
        </Container>
      </div>
    </ThemeProvider>
  );
}
