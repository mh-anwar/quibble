import * as React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Main,
  PostQuibb,
  Auth,
  EditQuibb,
  Settings,
} from './Components/Components';

import './App.css';

function App() {
  return (
    <Box className="App">
      <BrowserRouter basename={process.env.PORT}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/quibb" element={<PostQuibb />} />{' '}
          <Route path="/auth" element={<Auth />} />
          <Route path="/editQuibb/*" element={<EditQuibb />} />{' '}
          <Route path="/accountSettings/*" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
