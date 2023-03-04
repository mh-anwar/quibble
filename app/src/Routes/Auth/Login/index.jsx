import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { HOST } from '../../../constants';

export default function Login() {
  const [value, setValue] = useState({
    userName: '',
    password: '',
  });

  const mobile = useMediaQuery('(max-width:600px)');
  const inputStyle = {
    width: mobile ? '85%' : '70%',
    minHeight: 'min-content',
    marginTop: '0.3em',
    marginLeft: '0.3em',
    marginRight: '0.3em',
  };

  const handleClickShowPassword = () => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };

  const handleChange = (event) => {
    const re = /^[a-zA-Z0-9_.-]*$/;
    if (re.test(event.target.value)) {
      setValue((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const SubmitButton = () => {
    if (value.userName.length > 5 && value.password.length > 8) {
      return (
        <Button
          onClick={() => checkAccount(value)}
          variant="contained"
          className="button"
        >
          Login
        </Button>
      );
    } else if (value.userName && value.password) {
      if (value.userName.length < 5) {
        return (
          <Typography>Username must be longer than 5 characters</Typography>
        );
      } else {
        return (
          <Typography>Password must be longer than 10 characters</Typography>
        );
      }
    } else {
      return (
        <Button disabled variant="contained">
          Login
        </Button>
      );
    }
  };
  return (
    <>
      <TextField
        value={value.userName}
        onChange={handleChange}
        name="userName"
        label="Username"
        sx={inputStyle}
      />
      <FormControl variant="outlined" sx={inputStyle}>
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
      <SubmitButton />
    </>
  );
}

async function checkAccount(value) {
  return fetch(HOST + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  })
    .then((data) => data.json())
    .then((response) => {
      if (response.username === true && response.password === true) {
        localStorage.clear();
        localStorage.setItem('userName', value.userName);
        localStorage.setItem('password', value.password);
        window.location.href = '/';
      } else if (response.username === true && response.password === false) {
        window.alert('Incorrect password');
      } else if (response.username === true) {
        window.alert('Incorrect username');
      }
    });
}
