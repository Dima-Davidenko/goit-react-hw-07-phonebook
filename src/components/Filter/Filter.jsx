import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleInputChange = ({ target }) => {
    setValue(target.value);
    dispatch(updateFilter(target.value.toLowerCase()));
  };

  return (
    <TextField
      InputLabelProps={{ disableAnimation: true, shrink: true }}
      id="outlined-basic"
      label="Знайти по імені"
      variant="outlined"
      size="small"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default Filter;
