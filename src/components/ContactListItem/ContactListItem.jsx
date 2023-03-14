import PropTypes from 'prop-types';

import {
  Box,
  ButtonGroup,
  IconButton,
  ListItem,
  Typography,
} from '@mui/material';
import Loader from 'components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteContact } from 'redux/contactsOperations';
import { selectIsLoading } from 'redux/selectors';
import { useState } from 'react';
import EditForm from 'components/EditForm';

const ContactListItem = ({ contact }) => {
  const { id, name, number: phone } = contact;

  const [open, setOpen] = useState(false);

  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <ListItem sx={{ display: 'block', borderBottom: '1px solid #093C01' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '4px',
        }}
      >
        <Typography sx={{ maxWidth: '300px' }}>{name}</Typography>
        <Typography>{phone}</Typography>
        <ButtonGroup>
          <IconButton color="primary" onClick={handleClick}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => dispatch(deleteContact(id))}
          >
            {isLoading ? <Loader /> : <DeleteIcon />}
          </IconButton>
        </ButtonGroup>
      </Box>
      {open && <EditForm contact={contact} setOpen={setOpen} />}
    </ListItem>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  }),
};

export default ContactListItem;
