import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Button,
  InputBase,
  Link,
  Typography,
  Toolbar,
} from '@mui/material';
import AvatarMenu from './Avatar';
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
  width: '30%',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(1),
    width: '90%',
    height: '100%',
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
  },
}));

export default function SearchAppBar() {
  const [action, setAction] = useState(null);

  useEffect(() => {
    const evalRes = (response, userName) => {
      if (response.username === true && response.password === true) {
        setAction(
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '10px',
              marginRight: '10px',
              gap: '0.3em',
            }}
          >
            <Button href="/quibb" variant="contained">
              Post A Quibb
            </Button>
            <AvatarMenu userName={userName.split('')[0]} />
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
        <Toolbar
          sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexGrow: '1',
              justifyContent: 'space-between',
            }}
          >
            <Link sx={{ color: '#ffff ' }} underline="none" href="/">
              Quibble
            </Link>
            <Box>{action}</Box>
          </Typography>

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
