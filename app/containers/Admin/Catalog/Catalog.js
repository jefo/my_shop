import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from 'components/Table/Table';

class Catalog extends React.Component {
  render() {
    const { classes } = this.props;
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
  }
}

export default withStyles({})(Catalog);
