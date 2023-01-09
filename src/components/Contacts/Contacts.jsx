import DeleteIcon from '@mui/icons-material/Delete';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/operations/operations';
import { getFilteredContacts, selectIsLoading } from '../../selectors/selectors';

function Contacts({ children }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const filteredContacts = useSelector(getFilteredContacts);
  return (
    <div>
      {children}
      <Grid item xs={12} md={6}>
        <List sx={{ maxWidth: '500px' }}>
          {[...filteredContacts].reverse().map(({ id, name, number }) => (
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => dispatch(deleteContact(id))}
                  disabled={isLoading}
                >
                  <DeleteIcon />
                </IconButton>
              }
              key={id}
            >
              <a href={`tel:+38${number.replace(/[^\d]/g, '')}`} aria-label="call">
                <ListItemAvatar>
                  <Avatar>
                    <LocalPhoneIcon />
                  </Avatar>
                </ListItemAvatar>
              </a>
              <ListItemText primary={`${name}  ${number}`} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </div>
  );
}

export default Contacts;
