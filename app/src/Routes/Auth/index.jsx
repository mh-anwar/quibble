import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Join from './Join';
import Login from './Login';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import './index.css';

export default function PostQuibb() {
  const [auth, setAuth] = React.useState('login');

  const handleauth = (event, newauth) => {
    if (newauth !== null) {
      setAuth(newauth);
    }
  };

  return (
    <Box className="main-login">
      <Paper
        elevation={3}
        className="auth"
        component="form"
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5">Connect to the World!</Typography>
        <ToggleButtonGroup
          value={auth}
          exclusive
          onChange={handleauth}
          className="auth-toggle"
        >
          <ToggleButton sx={{ width: '50%' }} value="login">
            Login
          </ToggleButton>
          <ToggleButton sx={{ width: '50%' }} value="join">
            Join
          </ToggleButton>
        </ToggleButtonGroup>
        {auth === 'login' && <Login />}
        {auth === 'join' && <Join />}
      </Paper>
    </Box>
  );
}
