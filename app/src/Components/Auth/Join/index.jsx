import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  Box,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [values, setvalues] = useState({
    email: '',
    userName: '',
    password: '',
    profile: '',
  });

  const handleClickShowPassword = () => {
    setvalues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleChange = (event) => {
    setvalues((prev) => ({
      ...prev,
      [event.target.name]: event.target.values,
    }));
    console.log(values);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box className="login">
      <TextField
        values={values.email}
        onChange={handleChange}
        name="email"
        label="Email"
      />
      <TextField
        values={values.userName}
        onChange={handleChange}
        name="userName"
        label="Username"
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={values.showPassword ? 'text' : 'password'}
          values={values.password}
          name="password"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <TextField
        values={values.profile}
        onChange={handleChange}
        name="profile"
        label="Profile"
        className="field"
        multiline
        rows={4}
      />
      <Button
        onClick={() => createAccount(values)}
        className="button"
        variant="contained"
      >
        Login
      </Button>
    </Box>
  );
}

async function createAccount(values) {
  return fetch('http://localhost:4000/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then((data) => data.json())
    .then((response) => console.log(response));
}
