/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  root: { height: '100vh' },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    padding: '4em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: { margin: theme.spacing(3, 0, 2) },
}));

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
      Epidraw
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
);

const Email = () => {
  const [email, setEmail] = React.useState('');

  return (
    <FormControl fullWidth required margin="normal">
      <InputLabel htmlFor="signIn-email">Email</InputLabel>
      <Input
        autoComplete="signIn-email"
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </FormControl>
  );
};

const Password = () => {
  const [password, setPassword] = React.useState('');
  const [visibility, setVisibility] = React.useState(false);

  return (
    <FormControl fullWidth required margin="normal">
      <InputLabel htmlFor="signIn-password">Password</InputLabel>
      <Input
        autoComplete="current-password"
        id="signIn-password"
        type={visibility ? 'text' : 'password'}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onMouseDown={() => setVisibility(true)}
              onMouseUp={() => setVisibility(false)}
            >
              {!visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        )}
      />
    </FormControl>
  );
};

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.paper}
      >
        <form className={classes.form} noValidate onSubmit={(a) => console.log('submit =', a.preventDefault())}>
          <Email />
          <Password />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}
