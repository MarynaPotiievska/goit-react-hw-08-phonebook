import Loader from 'components/Loader';
import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from 'redux/contactsOperations';
import { selectIsLoading } from 'redux/selectors';

import {
  CloseIcon,
  Contact,
  ContactName,
  ContactNumber,
  ContactButton,
} from './ContactListItem.styled';

const ContactListItem = ({ contact }) => {
  const { id, name, phone } = contact;

  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const hendleDelete = id => {
    dispatch(deleteContact(id));
  };
  return (
    <Contact id={id}>
      <ContactName>{name}</ContactName>
      <ContactNumber>{phone}</ContactNumber>
      <ContactButton
        type="button"
        onClick={() => {
          hendleDelete(id);
        }}
      >
        {isLoading ? <Loader /> : <CloseIcon />}
      </ContactButton>
    </Contact>
  );
};

export default ContactListItem;
