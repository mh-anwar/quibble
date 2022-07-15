import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';
import iphone from './iphone-13.png';

// eslint-disable-next-line no-unused-vars
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
export default function BarterCard({ user, time, image }) {
  return (
    <Card sx={{ maxWidth: '30%', maxHeight: '20%', margin: '0.3em' }}>
      <CardContent>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[800] }} aria-label="recipe"></Avatar>
          }
          title={user}
          subheader={time}
        />
      </CardContent>
      <CardMedia component="img" height="200" width="200" image={iphone} />
    </Card>
  );
}
