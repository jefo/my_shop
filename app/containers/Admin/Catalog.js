import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from 'components/Table';

const Catalog = ({ classes }) => {
  const rows = [
    {
      id: 1,
      name: 'Товар 1',
      categories: 'Категория 1, категория 2',
    },
  ];
  return (
    <Paper className={classes.root}>
      <Table rows={rows} page={0} rowsPerPage={20} />
    </Paper>
  );
};

Catalog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles({})(Catalog);
