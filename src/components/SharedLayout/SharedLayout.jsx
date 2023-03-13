import { NavLink } from 'react-router-dom';

import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

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
    </Container>
  );
};
export default SharedLayout;
