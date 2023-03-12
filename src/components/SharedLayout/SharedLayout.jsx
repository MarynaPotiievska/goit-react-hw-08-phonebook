import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import {
  AppBar,
  Box,
  Button,
  Container,
  LinearProgress,
  Toolbar,
} from '@mui/material';

const SharedLayout = () => {
  return (
    <Container>
      <AppBar position="static" sx={{ display: 'flex' }}>
        <Toolbar component="nav">
          <Box>
            <Button variant="text" color="secondary" href="/">
              Phonebook
            </Button>
            <Button variant="text" color="secondary" href="/contacts">
              Contacts
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Button variant="text" color="secondary" href="/register">
              Sign up
            </Button>
            <Button variant="text" color="secondary" href="/login">
              Log in
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Suspense fallback={<LinearProgress />}>
        <Outlet />
      </Suspense>
    </Container>
  );
};
export default SharedLayout;
