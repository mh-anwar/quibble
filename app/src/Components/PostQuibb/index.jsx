import { Box, TextField } from '@mui/material';
import React from 'react';
import Quibb from '../Main/QuibbGroup/Quibb';
import styles from './index.css';
export default function PostQuibb() {
  return (
    <Box className="main">
      <Box className="preview">
        <Quibb />
      </Box>
      <Box className="post-quibb" component="form">
        <TextField label="Username" />
        <TextField label="Password" />
        <TextField label="Image URL" />
        <TextField label="Product Description" multiline rows={4} />
      </Box>
    </Box>
  );
}
