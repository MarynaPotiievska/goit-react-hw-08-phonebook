import PropTypes from 'prop-types';

import { ButtonGroup, IconButton, ListItem, Typography } from '@mui/material';
import Loader from 'components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteContact } from 'redux/contactsOperations';
import { selectIsLoading } from 'redux/selectors';

const ContactListItem = ({ contact }) => {
  const { id, name, number: phone } = contact;

  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  return (
    <ListItem
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px',
        borderBottom: '1px solid #093C01',
      }}
    >
      <Typography sx={{ maxWidth: '300px' }}>{name}</Typography>
      <Typography>{phone}</Typography>
      <ButtonGroup>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
        <IconButton color="primary" onClick={() => dispatch(deleteContact(id))}>
          {isLoading ? <Loader /> : <DeleteIcon />}
        </IconButton>
      </ButtonGroup>
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
