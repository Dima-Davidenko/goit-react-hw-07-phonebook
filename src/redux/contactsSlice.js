import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations/operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const pending = state => {
  state.isLoading = true;
};

const error = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, pending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, error)
      .addCase(addContact.pending, pending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, action.payload];
      })
      .addCase(addContact.rejected, error)
      .addCase(deleteContact.pending, pending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(({ id }) => id !== action.payload);
      })
      .addCase(deleteContact.rejected, error);
  },
  /*  {
    [fetchContacts.pending.toString()]: pending,
    [fetchContacts.fulfilled.toString()]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [fetchContacts.rejected.toString()]: error,
    [addContact.pending.toString()]: pending,
    [addContact.fulfilled.toString()]: (state, action) => {
      state.isLoading = false;
      state.items = [...state.items, action.payload];
    },
    [addContact.rejected.toString()]: error,
    [deleteContact.pending.toString()]: pending,
    [deleteContact.fulfilled.toString()]: (state, action) => {
      state.isLoading = false;
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
    [deleteContact.rejected.toString()]: error,
  }, */
});

export const contactsReducer = contactsSlice.reducer;

/* const itemsReducer = createReducer([], {
  [fetchContactsSuccess.toString()]: (_, action) => [...action.payload],
  [addContactSuccess.toString()]: (state, action) => [...state, action.payload],

  [deleteContactSuccess.toString()]: (state, action) =>
    state.filter(({ id }) => id !== action.payload),
});

const isLoadingReducer = createReducer(false, {
  [fetchContactsRequest.toString()]: () => true,
  [fetchContactsSuccess.toString()]: () => false,
  [fetchContactsError.toString()]: () => false,
  [addContactRequest.toString()]: () => true,
  [addContactSuccess.toString()]: () => false,
  [addContactError.toString()]: () => false,
  [deleteContactRequest.toString()]: () => true,
  [deleteContactSuccess.toString()]: () => false,
  [deleteContactError.toString()]: () => false,
});
const errorReducer = createReducer(null, {
  [fetchContactsRequest.toString()]: () => null,
  [addContactRequest.toString()]: () => null,
  [deleteContactRequest.toString()]: () => null,
  [fetchContactsError.toString()]: (_, action) => action.payload,
  [addContactError.toString()]: (_, action) => action.payload,
  [deleteContactError.toString()]: (_, action) => action.payload,
});

export const contactsReducer = combineReducers({
  items: itemsReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
}); */
