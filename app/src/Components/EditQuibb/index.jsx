import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import Quibb from '../Main/QuibbGroup/Quibb';
import Header from '../Main/Header';
import { HOST } from '../../constants';
import './index.css';

export default function PostQuibb() {
  const [value, setValue] = useState({
    userName: localStorage.getItem('userName'),
    productName: '',
    image: '',
    description: '',
  });
  let location = window.location.href.split('/');

  useEffect(() => {
    const fetchBarters = async () => {
      //Add error catching later
      const barters = await fetch(
        HOST + '/editBarter/' + location[location.length - 2]
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          return json;
        });
      console.log(barters, location[location.length - 2]);
      let key = location[location.length - 2].replace('%20', ' ');
      console.log(key);
      console.log(barters[key]);
      let data = barters[key];
      populateValue(key, data['image'], data['description']);
    };
    fetchBarters();
  }, []);

  const populateValue = (key, image, description) => {
    setValue({
      productName: key,
      image: image,
      description: description,
    });
    setValue({
      productName: key,
      image: image,
      description: description,
    });
  };

  const [quibb, setQuibb] = useState(
    <Quibb
      user={value.userName}
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
          <Button
            onClick={() => postQuibb(value)}
            className="button"
            variant="contained"
          >
            Post Quibb
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
const checkLogin = async () => {
  console.log(localStorage);
  let userName = localStorage.getItem('userName');
  let password = localStorage.getItem('password');
  if (userName !== null) {
    let data = { userName: [userName], password: [password] };
    const auth = await fetch(HOST + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        return response;
      });
    return auth;
  } else {
    return false;
  }
};
// eslint-disable-next-line no-unused-vars
async function postQuibb(value) {
  let validLogin = checkLogin();

  if (validLogin !== false) {
    await fetch(HOST + '/postQuibb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        return response;
      });
  } else {
    window.alert('You need to log in!');
    window.location.href = '/auth';
  }
}
