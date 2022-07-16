import { Box } from '@mui/material';
import * as React from 'react';
import Header from './Header';
import QuibbGroup from './QuibbGroup';
import styles from './index.css';
export default function Main() {
  return (
    <Box className="main">
      <Header />
      <QuibbGroup />
    </Box>
  );
}
