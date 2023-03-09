import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import { AppTitle, Title, DefaultMessage } from './App.styled';

import { fetchContacts } from 'redux/contactsOperations';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';

export const App = () => {
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
    <div>
      <AppTitle>Phonebook</AppTitle>
      <ContactForm />

      <Title>Contacts</Title>
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
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
