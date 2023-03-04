import * as React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Header } from './Components/Components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Main, PostQuibb, EditQuibb, Profile, Auth } from './Routes/Routes';
import { CssBaseline } from '@mui/material';

function App() {
  const [theme, setTheme] = React.useState(
    createTheme({
      palette: {
        mode: 'dark',
      },
    })
  );
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header setTheme={setTheme} />
          <Main />
        </>
      ),
    },
    {
      path: '/quibb',
      element: (
        <>
          <Header setTheme={setTheme} />
          <PostQuibb />
        </>
      ),
    },
    {
      path: '/auth',
      element: (
        <>
          <Header setTheme={setTheme} />
          <Auth />
        </>
      ),
    },
    {
      path: '/editQuibb/*',
      element: (
        <>
          <Header setTheme={setTheme} />
          <EditQuibb />
        </>
      ),
    },
    {
      path: '/profile/*',
      element: (
        <>
          <Header setTheme={setTheme} />
          <Profile />
        </>
      ),
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider basename={process.env.PORT} router={router} />
    </ThemeProvider>
  );
}
export default App;
