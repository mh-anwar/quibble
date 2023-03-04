import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { Quibb } from '../../Components/Components';
import { HOST } from '../../constants';
import './index.css';

export default function PostQuibb() {
  const [value, setValue] = useState({
    userName: localStorage.getItem('userName'),
    productName: '',
    image: '',
    description: '',
    detailedDescription: '',
    time: '',
  });

  useEffect(() => {
    const fetchBarters = async () => {
      let location = window.location.href.split('/');
      const barters = await fetch(
        HOST + '/editBarter/' + location[location.length - 2]
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          return json;
        });
      let key = location[location.length - 2].replace('%20', ' ');
      let data = barters[key];
      populateValue(
        key,
        data['image'],
        data['description'],
        data['detailedDescription'],
        data['time']
      );
    };
    fetchBarters();
  }, []);

  const populateValue = (
    key,
    image,
    description,
    detailedDescription,
    time
  ) => {
    setValue({
      productName: key,
      image: image,
      description: description,
      detailedDescription: detailedDescription,
      time: time,
    });
  };

  const handleChange = (event) => {
    const re =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if (event.target.name === 'image') {
      if (re.test(event.target.value)) {
        setValue((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      }
    } else {
      setValue((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };
  const PostButton = () => {
    if (value.productName && value.description && value.detailedDescription) {
      return (
        <Button
          onClick={() => postQuibb(value)}
          className="button"
          variant="contained"
        >
          Post Quibb
        </Button>
      );
    } else {
      return (
        <Button disabled className="button" variant="contained">
          Post Quibb
        </Button>
      );
    }
  };
  return (
    <Box className="main">
      <Box className="main-quibb">
        <Box className="preview">
          <Quibb
            user={value.userName}
            product={value.productName}
            time={value.time}
            description={value.description}
            detailedDescription={value.detailedDescription}
            image={value.image}
            modal={false}
          />
        </Box>
        <Box
          className="post-quibb"
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            value={value.userName}
            onChange={handleChange}
            name="userName"
            label="Username:"
            className="field"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            required
            value={value.productName}
            onChange={handleChange}
            name="productName"
            label="Product Name"
            className="field"
            InputProps={{
              readOnly: true,
            }}
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
            label="Banner Description"
            className="field"
            multiline
            sx={{ wordWrap: 'break-word' }}
            inputProps={{
              maxLength: 100,
            }}
          />
          <TextField
            required
            value={value.detailedDescription}
            onChange={handleChange}
            name="detailedDescription"
            label="Detailed Description"
            className="field"
            multiline
            sx={{ wordWrap: 'break-word' }}
            inputProps={{
              maxLength: 500,
            }}
          />
          <PostButton />
        </Box>
      </Box>
    </Box>
  );
}
const checkLogin = async () => {
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
        if (response) {
          window.location.href = '/';
        }
      });
  } else {
    window.alert('You need to log in!');
    window.location.href = '/auth';
  }
}
