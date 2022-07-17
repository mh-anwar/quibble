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

export default function Login() {
  const [value, setValue] = useState({
    userName: '',
    password: '',
  });

  const handleClickShowPassword = () => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };
  const handleChange = (event) => {
    setValue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log(value);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box className='login'>
      <TextField
        value={value.userName}
        onChange={handleChange}
        name="userName"
        label="Username"
      />
      <FormControl variant="outlined">
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
      <Button className="button" variant="contained">
        Login
      </Button>
    </Box>
  );
}
