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

export default function Join() {
  const [value, setValue] = useState({
    email: '',
    userName: '',
    password: '',
    profile: '',
  });

  const mobile = useMediaQuery('(max-width:600px)');

  const inputStyle = {
    width: mobile ? '85%' : '70%',
    minHeight: 'min-content',
    marginTop: '0.3em',
    marginLeft: '0.3em',
    marginRight: '0.3em',
  };

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
  const SubmitButton = () => {
    if (value.userName.length > 5 && value.password.length > 8) {
      return (
        <Button
          onClick={() => createAccount(value)}
          variant="contained"
          className="join-button"
        >
          Join
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
        <Button disabled className="join-button" variant="contained">
          Join
        </Button>
      );
    }
  };

  return (
    <>
      <TextField
        required
        value={value.email}
        onChange={handleChange}
        name="email"
        label="Email"
        sx={inputStyle}
      />
      <TextField
        required
        value={value.userName}
        onChange={handleChange}
        name="userName"
        label="Username"
        sx={inputStyle}
      />
      <FormControl required variant="outlined" sx={inputStyle}>
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
        rows={3}
        sx={inputStyle}
      />
      <SubmitButton />
    </>
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
        localStorage.setItem('userName', value.userName);
        localStorage.setItem('password', value.password);
        window.location.href = '/';
      } else {
        window.alert(
          'This username already exists! Please choose a new username!'
        );
      }
    });
}
