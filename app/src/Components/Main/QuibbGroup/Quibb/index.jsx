import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {
  Box,
  CardHeader,
  Typography,
  Avatar,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './index.css';

const options = ['Edit', 'Delete'];

const ITEM_HEIGHT = 48;

export default function Quibb({
  user = '',
  product = '',
  time = '',
  description = '',
  image,
  action = false,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    if (event.target.innerText === 'Edit') {
      window.location.href = '/editQuibb/' + product + '/' + user;
    }
    setAnchorEl(null);
  };
  return (
    <Card
      key={user + product}
      sx={{ maxWidth: '30%', maxHeight: '10%', margin: '0.3em' }}
      className="card"
      raised={true}
    >
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[700] }}>{user.split('')[0]}</Avatar>
          }
          title={product}
          subheader={user + ' • ' + time}
          action={
            action === true && (
              <Box>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      selected={option === 'Edit'}
                      name={option}
                      onClick={handleClose}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )
          }
        />

        <Box className="card-wrapper">
          <CardMedia component="img" image={image} draggable="false" />
        </Box>

        <CardContent>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
