import * as React from 'react';
import { useTheme, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ListItemIcon, MenuItem } from '@mui/material';

function ModeToggle({ handleTheme, theme }) {
  return (
    <MenuItem onClick={handleTheme}>
      <ListItemIcon>
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon fontSize="small" />
        ) : (
          <Brightness4Icon fontSize="small" />
        )}
      </ListItemIcon>
      Dark Mode
    </MenuItem>
  );
}

export default function ToggleColorMode({ setTheme }) {
  const theme = useTheme();
  const setColorMode = () => {
    setTheme(
      createTheme({
        palette: {
          mode: theme.palette.mode === 'light' ? 'dark' : 'light',
        },
      })
    );
  };

  return <ModeToggle handleTheme={setColorMode} theme={theme} />;
}
