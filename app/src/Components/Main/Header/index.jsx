import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, Link } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { HOST } from '../../../constants';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const [action, setAction] = useState(null);
  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  useEffect(() => {
    const evalRes = (response, userName) => {
      if (response.username === true && response.password === true) {
        setAction(
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              marginRight: '5px',
              gap: '0.3em',
            }}
          >
            <Avatar sx={{ bgcolor: getRandomColor() }}>
              {userName.split('')[0]}
            </Avatar>
            <Button
              href="/auth"
              onClick={() => {
                localStorage.clear();
              }}
              variant="contained"
            >
              Logout
            </Button>
          </Box>
        );
      } else {
        setAction(
          <Button href="/auth" variant="contained">
            Join
          </Button>
        );
      }
    };
    const checkLogin = async () => {
      let userName = localStorage.getItem('userName');
      let password = localStorage.getItem('password');
      if (userName !== null) {
        let data = { userName: [userName], password: [password] };
        const auth = await fetch(HOST + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((data) => {
            return data.json();
          })
          .then((response) => {
            return response;
          });

        evalRes(auth, userName);
      } else {
        evalRes(false, userName);
      }
    };
    checkLogin();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link sx={{ color: '#ffff ' }} underline="none" href="/">
              Quibble
            </Link>
          </Typography>
          {action}
          <Button href="/quibb" variant="contained">
            Post A Quibb
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
