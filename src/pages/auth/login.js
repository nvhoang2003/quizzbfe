import * as React from 'react';
import { TextField, Button, FormControl, Box, FormControlLabel, Grid, Link, Typography, Checkbox, InputLabel, OutlinedInput, InputAdornment, IconButton, Stack } from '@mui/material';
import { loginAuth } from '@/dataProvider/postApi';
import { setupLocalStorage } from '@/auth/utils';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const StyledContent = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#fcfcfc',
  padding: theme.spacing(4, 8),
  justifyItems: 'center',
  [theme.breakpoints.up('md')]: {
    width: 480,
    flexShrink: 0,
    padding: theme.spacing(8, 8),
    boxShadow: '5px 5px 5px 5px #cccccc',
    border: '1px',
    borderRadius: '10px'
  }
}));

const StyledRoot = styled('main')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  position: 'relative'
}));

export default function login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseLogin = await loginAuth({ username, password });
    const { response } = responseLogin;
    console.log(responseLogin);
    setupLocalStorage(responseLogin.data.accessToken);
  };

  return (
    <StyledRoot>
      <StyledContent >
        <Stack sx={{ width: 1 }}>
          <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
            <Typography variant="h4" align="center">Login</Typography>
          </Stack>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            display='flex'
            flexDirection='column'
          >
            <FormControl
              variant="outlined"
            >
              <InputLabel htmlFor="username">Username</InputLabel>
              <OutlinedInput
                margin="dense"
                required
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
              />
            </FormControl>

            <FormControl
              variant="outlined"
              sx={{ mt: 2 }}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'show' : 'hide'}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                margin="dense"
                required
                name="password"
                label="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              variant='contained'
              size="large"
              sx={{
                mt: 1,
                mb: 2,
                backgroundColor: 'blue'
              }}
            >
              Sign In
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Link href="#" variant="body2" underline="hover">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={6} display='flex' justifyContent='flex-end'>
                <Link href="#" variant="body2" underline="hover">
                  Don't have an account?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </StyledContent>
    </StyledRoot>
  )
}
