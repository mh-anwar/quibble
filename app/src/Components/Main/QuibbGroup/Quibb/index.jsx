import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box, CardHeader, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';
import iphone from './iphone-13.png';
import './index.css';

export default function Quibb({
  user = '',
  product = '',
  time = '',
  description = '',
  image,
}) {
  return (
    <Card
      key={user + product}
      sx={{ maxWidth: '30%', maxHeight: '20%', margin: '0.3em' }}
      className="card"
      raised={true}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[800] }} aria-label="recipe"></Avatar>
        }
        title={product}
        subheader={user + ' • ' + time}
      />
      <Box className='card-wrapper'>
        <CardMedia component="img" height="200" width="200" image={iphone} draggable="false"/>
      </Box>
      <CardContent>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}
