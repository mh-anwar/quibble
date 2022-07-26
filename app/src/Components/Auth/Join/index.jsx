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
import { HOST } from '../../../constants';
import './index.css';

export default function Join() {
  const [value, setValue] = useState({
    email: '',
    userName: '',
    password: '',
    profile: '',
  });

  const handleChange = (event) => {
    const re = /^[a-zA-Z0-9_.-@]*$/;
    if (event.target.name === 'profile') {
      setValue((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    } else if (re.test(event.target.value)) {
      setValue((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
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
    <Box className="join">
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
      <FormControl required variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
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
        multiline
        sx={{ maxHeight: '10ch' }}
        rows={4}
      />
      <Button
        onClick={() => createAccount(value)}
        className="join-button"
        variant="contained"
      >
        Join
      </Button>
    </Box>
  );
}

async function createAccount(value) {
  return fetch(HOST + '/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  })
    .then((data) => data.json())
    .then((response) => {
      if (response.success === true) {
        localStorage.setItem('userNname', value.userName);
        localStorage.setItem('password', value.password);
        window.location.href = '/';
      } else {
        window.alert(
          'This username already exists! Please choose a new username!'
        );
      }
    });
}
