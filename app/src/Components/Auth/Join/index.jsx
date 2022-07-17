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
import './index.css';

export default function Join() {
  const [value, setValue] = useState({
    email: '',
    userName: '',
    password: '',
    profile: '',
  });

  const handleChange = (event) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(value);
  };

  const handleClickShowPassword = () => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box component="form" className="join">
      <TextField
        required
        value={value.email}
        onChange={handleChange}
        name="email"
        label="Email"
      />
      <TextField
        required
        value={value.userName}
        onChange={handleChange}
        name="userName"
        label="Username"
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          required
          id="password"
          type={value.showPassword ? 'text' : 'password'}
          value={value.password}
          name="password"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {value.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <TextField
        required
        value={value.profile}
        onChange={handleChange}
        name="profile"
        label="Profile"
        className="field"
        multiline
        sx={{ maxHeight: '10ch' }}
        rows={4}
      />
      <Button
        onClick={() => createAccount(value)}
        className="button"
        variant="contained"
      >
        Join
      </Button>
    </Box>
  );
}

async function createAccount(value) {
  console.log(value);
  return fetch('http://localhost:4000/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  })
    .then((data) => data.json())
    .then((response) => {
      if (response.success === true) {
        window.location.href = '/';
      } else {
        window.alert(
          'This username already exists! Please choose a new username!'
        );
      }
    });
}
