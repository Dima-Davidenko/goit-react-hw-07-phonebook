import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { addContact } from '../../redux/operations/operations';
import { getContacts, selectIsLoading } from '../../selectors/selectors';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { notifyError } from '../App';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Має бути трошки довше :)')
    .required('Нажаль без імені нічого не вийде'),
  number: yup
    .string()
    .matches(
      /[(][0-9]{3}[)][ .-][0-9]{3}[ .-][0-9]{2}[ .-][0-9]{2}/,
      'Невірний формат. Має бути (066) 333-22-22'
    )
    .max(15, 'Багато цифр')
    .required("Номер телефону також обов'язковий"),
});

const NewContactForm = () => {
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: schema,
    onSubmit: ({ name, number }, { setSubmitting, resetForm }) => {
      if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
        notifyError('Контакт з таким іменем вже існує');
        setSubmitting(false);
        return;
      }
      resetForm();
      dispatch(addContact({ name, number }));
      setSubmitting(false);
    },
    validateOnBlur: true,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          InputLabelProps={{ disableAnimation: true, shrink: true }}
          fullWidth
          id="name"
          name="name"
          label="Ім'я"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="standard"
          sx={{ mr: '20px', mb: '20px', width: '400px' }}
        />
        <TextField
          InputLabelProps={{ disableAnimation: true, shrink: true }}
          fullWidth
          id="number"
          name="number"
          label="Номер телефону"
          type="text"
          value={formik.values.number}
          onChange={evt => {
            evt.target.value = formatPhoneNumber(evt.target.value);
            formik.handleChange(evt);
          }}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
          variant="standard"
          sx={{ mr: '20px', mb: '20px', width: '400px' }}
        />
        <Button type="submit" sx={{ display: 'block' }} disabled={isLoading}>
          Додати до записника
        </Button>
      </form>
    </div>
  );
};

export default NewContactForm;
