import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

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
            <Button variant="text" color="custom">
              <NavLink to="/">Phonebook</NavLink>
            </Button>
            <Button variant="text" color="custom">
              <NavLink to="/contacts">Contacts</NavLink>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Button variant="text" color="custom">
              <NavLink to="/register">Sign up</NavLink>
            </Button>
            <Button variant="text" color="custom">
              <NavLink to="/login">Log in</NavLink>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Suspense fallback={<LinearProgress />}>
        <Outlet />
      </Suspense> */}
    </Container>
  );
};
export default SharedLayout;
