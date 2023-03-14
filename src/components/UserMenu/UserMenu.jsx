import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Box, Typography, IconButton, Icon } from '@mui/material';
import { logOut } from 'redux/auth/operations';

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '4px',
      }}
    >
      <Icon>
        <AccountCircleIcon />
      </Icon>
      <Typography variant="subtitle2">{user.name}</Typography>
      <IconButton sx={{ ml: '12px' }} onClick={() => dispatch(logOut())}>
        <LogoutIcon color="secondary" />
      </IconButton>
    </Box>
  );
};

export default UserMenu;
