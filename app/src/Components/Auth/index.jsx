import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Join from './Join';
import Login from './Login';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Header from '../Main/Header';
import './index.css';

export default function PostQuibb() {
  const [auth, setAuth] = React.useState('login');

  const handleauth = (event, newauth) => {
    setAuth(newauth);
  };

  return (
    <Box className="main">
      <Header />
      <Box className="main-login">
        <Paper
          elevation={3}
          className="auth"
          component="form"
          noValidate
          autoComplete="off"
        >
          <Typography variant="h5">Connect to the World!</Typography>
          <ToggleButtonGroup value={auth} exclusive onChange={handleauth}>
            <ToggleButton value="login">Login</ToggleButton>
            <ToggleButton value="join">Join</ToggleButton>
          </ToggleButtonGroup>
          {auth === 'login' && <Login />}
          {auth === 'join' && <Join />}
        </Paper>
      </Box>
    </Box>
  );
}
