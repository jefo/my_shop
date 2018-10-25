import React from 'react';
import PropTypes from 'prop-types';
import { compose, defaultProps, mapProps } from 'recompose';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import Divider from '@material-ui/core/Divider';
import Table from 'components/Table';
import SearchField from 'components/SearchField';

const enhance = compose(
  withStyles(theme => ({
    root: {
      padding: 0,
    },
    controls: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '12px 12px 12px',
    },
  })),
  defaultProps({
    products: [
      { id: 1, name: 'Изделие 1' },
      { id: 2, name: 'Изделие 2' },
      { id: 3, name: 'Изделие 3' },
    ],
    productProps: [
      { name: 'id', label: 'ID', type: 'text' },
      { name: 'name', label: 'Наименование', type: 'text' },
    ],
    classes: {},
  }),
);

const Products = ({ classes, productProps }) => {
  const rows = [
    {
      id: 1,
      name: 'Товар 1',
      categories: 'Категория 1, категория 2',
    },
  ];
  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <Button variant="contained" color="primary" className={classes.button}>
          <AddCircle />
          &nbsp;Добавить товар
        </Button>
      </div>
      <Divider />
      <SearchField />
      <Table rows={rows} rowsPerPage={25} />
      {/* <Drawer></Drawer> */}
    </div>
  );
};

Products.propTypes = {
  productProps: PropTypes.array.isRequired,
};

export default enhance(Products);
