import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import * as React from 'react';
import QuibbGroup from '../../Components/QuibbGroup';

export default function Main() {
  const theme = useTheme();
  const mainStyle = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    margin: 0,
    padding: '0.5em',
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'flex-start',
  };
  return (
    <Box sx={mainStyle}>
      <QuibbGroup />
    </Box>
  );
}
