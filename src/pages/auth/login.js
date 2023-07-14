import { React, useState } from 'react'
import { TextField, Button, FormControl, Box, FormControlLabel, Grid, Link, Typography, Checkbox } from '@mui/material';
import { loginAuth } from '@/dataProvider/postApi';
import { setupLocalStorage } from '@/auth/utils';

export default function login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseLogin = await loginAuth({ username, password });
    const { response } = responseLogin;
    setupLocalStorage(responseLogin.data.accessToken);
  };

  return (
    <main className='bg-login'>
      <div>
        <div className='form-login'>
          <Box
            sx={{
              paddingTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, backgroundColor: 'Highlight' }}
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
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </div>
    </main >
  )
}
