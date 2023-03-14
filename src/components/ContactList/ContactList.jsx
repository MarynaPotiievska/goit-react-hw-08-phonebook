import { List } from '@mui/material';
import ContactListItem from 'components/ContactListItem';
import { useSelector } from 'react-redux';

// import { List } from './ContactList.styled';
import { selectFilteredContacts } from 'redux/selectors';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <List
      sx={{
        width: '700px',
        margin: '0 auto',
        padding: '12px',
        border: '2px solid #093C01',
        borderRadius: '4px',
      }}
    >
      {filteredContacts.map(contact => {
        return <ContactListItem contact={contact} key={contact.id} />;
      })}
    </List>
  );
};

export default ContactList;
