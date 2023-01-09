import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.items;
// export const getFilteredContacts = state =>
//   state.contacts.items.filter(({ name }) => name.toLowerCase().includes(state.filter));
export const getFilter = state => state.filter;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const getFilteredContacts = createSelector([getContacts, getFilter], (contacts, filter) =>
  contacts.filter(({ name }) => name.toLowerCase().includes(filter))
);
