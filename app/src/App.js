import * as React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main, PostQuibb, Auth } from './Components/Components';
import './App.css';

function App() {
  return (
    <Box className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/quibb" element={<PostQuibb />} />{' '}
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

// eslint-disable-next-line no-unused-vars
async function makeRequest() {
  let test = { username: 'password' };
  return fetch('http://localhost:4000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(test),
  })
    .then((data) => data.json())
    .then((res) => console.log(res));
}

export default App;
