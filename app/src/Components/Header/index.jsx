import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Button,
  InputBase,
  Typography,
  Toolbar,
} from '@mui/material';
import AvatarMenu from './Avatar';
import { HOST } from '../../constants';
import SearchIcon from '@mui/icons-material/Search';
import Mark from './Github_mark.png';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

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

export default function Header({ setTheme }) {
  const [action, setAction] = useState(null);
  const theme = useTheme();
  useEffect(() => {
    const evalRes = (response, userName) => {
      if (response.username === true && response.password === true) {
        setAction(
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0.3em',
            }}
          >
            <Button variant="contained">
              <Link
                style={{
                  textDecoration: 'none',
                }}
                to="/quibb"
              >
                Post A Quibb
              </Link>
            </Button>

            <AvatarMenu userName={userName.split('')[0]} setTheme={setTheme} />
          </Box>
        );
      } else {
        setAction(
          <Button variant="contained">
            <Link
              style={{
                textDecoration: 'none',
              }}
              to="/auth"
            >
              Join
            </Link>
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
  const headerStyle = {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    margin: 0,
    padding: '0.5em',
    width: '100%',
  };
  return (
    <AppBar position="static" sx={headerStyle}>
      <Toolbar sx={headerStyle}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '0.5em',
            gap: '0.5em',
            flexGrow: '1',
          }}
        >
          <Link
            style={{
              textDecoration: 'none',
              color: theme.palette.text.primary,
            }}
            to="/"
          >
            <Typography variant="h4">Quibble</Typography>
          </Link>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            flexGrow: '1',
            justifyContent: 'flex-end',
            alignContent: 'space-between',
          }}
        >
          {action}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Search sx={{ margin: '0.5em', flexGrow: '1' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button href="https://github.com/mh-anwar/quibble" variant="text">
            <img alt="Source Code" src={Mark} width="32" height="32" />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
