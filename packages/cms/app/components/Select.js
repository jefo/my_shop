import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const Select = ({ name, label, items = [] }) => (
  <FormControl>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Select
      inputProps={{
        id: name,
        name,
      }}
    >
      {items.map(({ value, text }) => (
        <MenuItem value={value}>{value ? text : <em>{text}</em>}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default Select;
