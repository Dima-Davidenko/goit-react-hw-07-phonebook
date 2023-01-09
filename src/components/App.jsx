import { CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchContacts } from '../redux/operations/operations';
import { selectIsLoading } from '../selectors/selectors';
import { Contacts, Container, Filter, NewContactForm, Section } from './';

export const notifySuccess = message => toast.success(message);
export const notifyError = message => toast.error(message);

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading && (
        <div
          style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <CircularProgress size={200} />
        </div>
      )}
      <Typography variant="h2" sx={{ mb: 10 }}>
        Телефонна книжка
      </Typography>
      <Section title="Додати новий контакт" variant="h3">
        <NewContactForm />
      </Section>
      <Section title="Ваші контакти" variant="h3">
        <Contacts>
          <Filter />
        </Contacts>
      </Section>
    </Container>
  );
};

export default App;
