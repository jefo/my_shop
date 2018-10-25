import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Table from 'components/Table';

const styles = theme => ({
  mb1: {
    marginBottom: theme.spacing.unit,
  },
});

const enhance = compose(withStyles(styles));

const EditableTable = ({ classes, rows }) => (
  <div className={classes.container}>
    <div className={classes.mb1}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        component={Link}
        to="/admin/products/add"
      >
        <AddIcon />
        Добавить товар
      </Button>
    </div>
    <Paper>
      <Table rows={rows} page={0} rowsPerPage={20} />
    </Paper>
  </div>
);

EditableTable.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array,
};

EditableTable.defaultProps = {
  rows: [],
};

export default enhance(EditableTable);
