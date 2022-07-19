import * as React from 'react';
import { Avatar, Box, Card } from '@mui/material';
import Header from '../Main/Header';

export default function Settings() {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          marginTop: '0.3em',
          gap: '0.8em',
        }}
      >
        <Box>
          <Avatar sx={{ width: 200, height: 200 }} />
        </Box>

        <Card
          sx={{
            width: '100%',
          }}
        >
          tdd
        </Card>
      </Box>
    </Box>
  );
}
