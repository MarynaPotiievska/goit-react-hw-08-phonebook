import { useDispatch, useSelector } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import 'yup-phone';

import { addContact } from 'redux/contactsOperations';
import { selectContacts } from 'redux/selectors';

import Error from '../ErrorMessage/ErrorMessage';

import {
  AddContactForm,
  Button,
  ContactInput,
  Label,
} from './ContactForm.styled';

const contactSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  number: yup.string().phone('UA').required(),
});

const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const isInContacts = contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (isInContacts === undefined) {
      dispatch(addContact(values));
    } else {
      alert(`${values.name} is already in contacts.`);
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      <AddContactForm autoComplete="off">
        <Label>
          Name
          <ContactInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage
            name="name"
            component={Error}
            message="Name must be at least 2 characters"
          />
        </Label>
        <Label>
          Phone
          <ContactInput
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and must start with +"
          />
          <ErrorMessage
            name="number"
            component={Error}
            message="Number must be a valid phone number for region UA."
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </AddContactForm>
    </Formik>
  );
};

export default ContactForm;
