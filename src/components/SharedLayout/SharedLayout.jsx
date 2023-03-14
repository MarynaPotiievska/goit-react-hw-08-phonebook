import { Outlet } from 'react-router-dom';

import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { Suspense } from 'react';
import Loader from 'components/Loader';
import { NavigateLink } from './SaredLayout.styled';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import UserMenu from 'components/UserMenu';

const SharedLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <Container>
      <AppBar position="static" sx={{ display: 'flex', mb: '16px' }}>
        <Toolbar component="nav">
          <Box>
            <Button variant="text" color="secondary">
              <NavigateLink to="/">Phonebook</NavigateLink>
            </Button>
            <Button variant="text" color="secondary">
              <NavigateLink to="/contacts">Contacts</NavigateLink>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <Box>
              <Button variant="text" color="secondary">
                <NavigateLink to="/register">Sign up</NavigateLink>
              </Button>
              <Button variant="text" color="secondary">
                <NavigateLink to="/login">Log in</NavigateLink>
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Container>
  );
};
export default SharedLayout;
