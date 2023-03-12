import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DefaultMessage, Title } from 'components/App.styled';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import Loader from 'components/Loader';

import { fetchContacts } from 'redux/contactsOperations';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';

const Contacts = () => {
  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const isContacts = !isLoading && !error && contacts.length > 0;
  const isContactsEmpty = !isLoading && !error && contacts.length === 0;

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <main>
      <Title>Contacts</Title>
      <ContactForm />
      <Filter />
      {isContacts && <ContactList />}
      {isContactsEmpty && (
        <DefaultMessage>
          There is no contacts yet. Please, add a contact.
        </DefaultMessage>
      )}
      {isLoading && (
        <p>
          <Loader width="16" />
        </p>
      )}
      {error && <p>{error}</p>}
    </main>
  );
};

export default Contacts;
