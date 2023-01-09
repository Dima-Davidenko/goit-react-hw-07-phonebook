import { Button, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { addContact } from '../../redux/operations/operations';
import { getContacts } from '../../selectors/selectors';
import { MyErrorMsg, Wrapper } from './NewContactForm.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Має бути трошки довше :)')
    .required('Нажаль без імені нічого не вийде'),
  number: yup
    .string()
    .matches(
      /([0-9]{3})[ .-][0-9]{3}[ .-][0-9]{2}[ .-][0-9]{2}/,
      'Невірний формат. Має бути 066-333-22-22'
    )
    .max(13, 'Невірний формат. Має бути 066-333-22-22')
    .required("Номер телефону також обов'язковий"),
});

const INITIAL_FORM_VALUES = { name: '', number: '' };

function NewContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = ({ name, number }, { setSubmitting, resetForm }) => {
    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert('Контакт з таким іменем вже існує');
      setSubmitting(false);
      return;
    }
    resetForm();
    dispatch(addContact({ name, number }));
    setSubmitting(false);
  };
  return (
    <div>
      <Formik initialValues={INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
        <Form autoComplete="off">
          <Wrapper>
            <Field
              as={TextField}
              type="text"
              name="name"
              id="standard-basic"
              label="Ім'я"
              variant="standard"
              sx={{ mr: '20px', width: '400px' }}
            />
            <MyErrorMsg name="name" component="div" />
          </Wrapper>
          <Wrapper>
            <Field
              as={TextField}
              type="text"
              name="number"
              id="standard-basic"
              label="Номер телефону (формат 066-333-22-22)"
              variant="standard"
              sx={{ mr: '20px', width: '400px' }}
            />
            <MyErrorMsg name="number" component="div" />
          </Wrapper>
          <Button type="submit" sx={{ display: 'block' }}>
            Додати до записника
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default NewContactForm;
