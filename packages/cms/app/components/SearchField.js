import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const styles = () => ({
  root: {
    padding: '0 12px',
  },
  searchField: {
    backgroundColor: '#fff',
  },
});

const SearchField = ({ classes, value, onChange }) => (
  <div className={classes.root}>
    <TextField
      fullWidth
      type="search"
      value={value}
      onChange={onChange}
      label="Поиск"
      className={classes.searchField}
      margin="normal"
      variant="outlined"
    />
  </div>
);

export default withStyles(styles)(SearchField);
