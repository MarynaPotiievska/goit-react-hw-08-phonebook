import ContactListItem from 'components/ContactListItem';
import { useSelector } from 'react-redux';

import { List } from './ContactList.styled';
import { selectFilteredContacts } from 'redux/selectors';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <List>
      {filteredContacts.map(contact => {
        return <ContactListItem contact={contact} key={contact.id} />;
      })}
    </List>
  );
};

export default ContactList;
