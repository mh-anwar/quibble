import * as React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main, PostQuibb, Auth, EditQuibb } from './Components/Components';
import { HOST } from './constants';
import './App.css';

function App() {
  return (
    <Box className="App">
      <BrowserRouter basename={'./'}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/quibb" element={<PostQuibb />} />{' '}
          <Route path="/auth" element={<Auth />} />
          <Route path="/editQuibb/*" element={<EditQuibb />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

// eslint-disable-next-line no-unused-vars
async function makeRequest() {
  let test = { username: 'password' };
  return fetch(HOST + '/api', {
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
