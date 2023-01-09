import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notifyError, notifySuccess } from '../../components/App';

axios.defaults.baseURL = 'https://63b6f1151907f863aa077f2b.mockapi.io';

export const fetchContacts = createAsyncThunk('contacts/fetch', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/contacts');
    return data;
  } catch (error) {
    notifyError(error.message || 'Щось пішло не так...');
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk('contacts/add', async (contact, thunkAPI) => {
  try {
    const { data } = await axios.post('/contacts', contact);
    notifySuccess(
      <span>
        Контакт <b>{contact.name}</b> створений
      </span>
    );
    return data;
  } catch (error) {
    notifyError(error.message || 'Щось пішло не так...');
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/delete', async (id, thunkAPI) => {
  try {
    const { data } = await axios.delete(`/contacts/${id}`);
    notifySuccess(
      <span>
        Контакт <b>{data.name}</b> видалений
      </span>
    );
    return data.id;
  } catch (error) {
    notifyError(error.message || 'Щось пішло не так...');
    return thunkAPI.rejectWithValue(error.message);
  }
});

/* 
  export const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());
  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error.message));
  }
};

export const addContact = contact => async dispatch => {
  dispatch(addContactRequest());
  try {
    const { data } = await axios.post('/contacts', contact);
    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error));
  }
};

export const deleteContact = id => async dispatch => {
  dispatch(deleteContactRequest());
  try {
    const { data } = await axios.delete(`/contacts/${id}`);
    dispatch(deleteContactSuccess(data.id));
  } catch (error) {
    dispatch(deleteContactError(error));
  }
}; 
*/
