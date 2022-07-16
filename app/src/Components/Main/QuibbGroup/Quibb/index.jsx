import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';
import iphone from './iphone-13.png';
import styles from './index.css';

export default function Quibb({ user, product, time, image }) {
  return (
    <Card
      key={user + product}
      sx={{ maxWidth: '30%', maxHeight: '20%', margin: '0.3em' }}
      className="card"
    >
      <CardContent>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[800] }} aria-label="recipe"></Avatar>
          }
          title={product}
          subheader={user + ' • ' + time}
        />
      </CardContent>
      <CardMedia component="img" height="200" width="200" image={iphone} />
    </Card>
  );
}
