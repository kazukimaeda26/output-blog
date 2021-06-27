import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { AppDispatch } from "../../app/store";
import { getIsSignIn, getIsAdmin } from "../../features/user/userSlice";
import { auth } from "../../firebase";
import { toggleIsSignIn, toggleIsAdmin } from "../../features/user/userSlice";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface AuthDataTypes {
  email: string;
  password: string;
}

const AdminAuth: React.FC = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<AuthDataTypes>();
  const isAdmin = useSelector(getIsAdmin);
  const isSignIn = useSelector(getIsSignIn);
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();

  const handleSignUp = async (data: AuthDataTypes) => {
    const { email, password } = data;
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (err) {
      alert(err.message);
    }
  };
  const handleSignIn = async (data: AuthDataTypes) => {
    const { email, password } = data;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch(toggleIsAdmin(true));
      history.push("/admin-home");
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignIn ? "ログイン" : "新規登録"}
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={
              isSignIn ? handleSubmit(handleSignIn) : handleSubmit(handleSignUp)
            }
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors.email)}
              helperText={errors.email && errors.email.message}
              inputRef={register({
                required: {
                  value: true,
                  message: "メールアドレスを入力してください。",
                },
                pattern: {
                  value:
                    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                  message: "メールアドレスを正しい形で入力してください",
                },
              })}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password && errors.password.message}
              inputRef={register({
                required: {
                  value: true,
                  message: "passwordを入力してください。",
                },
                minLength: {
                  value: 6,
                  message: "passwordを6文字以上で入力してください.",
                },
              })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isAdmin ? "すでにサインインしてます" : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  aaaaa
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => dispatch(toggleIsSignIn(!isSignIn))}
                >
                  {isSignIn
                    ? "アカウントをお持ちでない方はこちら"
                    : "アカウントをお持ちの方はこちら"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default AdminAuth;
