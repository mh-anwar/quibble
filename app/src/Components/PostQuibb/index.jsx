import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import Quibb from '../Main/QuibbGroup/Quibb';
import Header from '../Main/Header';
import styles from './index.css';

export default function PostQuibb() {
  const [value, setValue] = useState({
    userName: '',
    password: '',
    productName: '',
    image: '',
    description: '',
  });
  const [quibb, setQuibb] = useState(
    <Quibb
      user={value.username}
      product={value.productName}
      description={value.description}
      image={value.image}
    />
  );

  const handleChange = (event) => {
    setValue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log(value);
    setQuibb(
      <Quibb
        user={value.userName}
        product={value.productName}
        time={
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
        }
        description={value.description}
        image={value.image}
      />
    );
  };

  return (
    <Box className="main">
      <Header />
      <Box className="main-quibb">
        <Box className="preview">
          <Typography variant="h4">Preview</Typography>
          {quibb}
        </Box>
        <Box
          className="post-quibb"
          component="form"
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4">Details</Typography>
          <TextField
            required
            value={value.userName}
            onChange={handleChange}
            name="userName"
            label="Username:"
            className="field"
          />
          <TextField
            required
            value={value.password}
            onChange={handleChange}
            name="password"
            label="Password"
            className="field"
          />
          <TextField
            required
            value={value.productName}
            onChange={handleChange}
            name="productName"
            label="Product Name"
            className="field"
          />
          <TextField
            required
            value={value.image}
            onChange={handleChange}
            name="image"
            label="Image URL"
            className="field"
          />
          <TextField
            required
            value={value.description}
            onChange={handleChange}
            name="description"
            label="Product Description"
            className="field"
            multiline
            rows={4}
          />
          <Button className="button" variant="contained">
            Post Quibb
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// eslint-disable-next-line no-unused-vars
function postQuibb() {}
