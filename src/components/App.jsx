import { CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/operations/operations';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { selectError, selectIsLoading } from '../selectors/selectors';
import { Contacts, Container, Filter, NewContactForm, Section } from './';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const notify = () => toast("Wow so easy!");
  return (
    <Container>
      <ToastContainer />
      {isLoading && (
        <div
          style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <CircularProgress size={200} />
        </div>
      )}
      {error && (
        <span style={{ position: 'fixed', top: '100px', right: '100px', color: 'red' }}>
          {error.message}...
        </span>
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
