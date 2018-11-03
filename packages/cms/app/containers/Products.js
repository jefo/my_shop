import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Link, Route } from 'react-router-dom';
import { compose, defaultProps, mapProps, withHandlers } from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import CloseIcon from '@material-ui/icons/Close';
import Table from 'components/Table';
import SearchField from 'components/SearchField';
import ProductForm from 'containers/ProductForm';

const drawerWidth = 650;

const enhance = compose(
  withStyles(theme => ({
    root: {
      padding: 0,
      display: 'flex',
    },
    controls: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '12px 12px 12px',
    },
    content: {
      flex: '1 1 auto',
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      maxWidth: '100%',
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    drawer: {
      maxWidth: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      padding: '12px',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
  })),
  withHandlers('drawerFullscreen', 'setDrawerFullscreen', false),
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
  }),
  mapProps(props => ({
    ...props,
    drawerOpen: props.location.pathname === '/products/new',
  })),
);

const ProductsTable = graphql(
  gql`
    {
      allMyProducts {
        nodes {
          id
          title
          price
          description
          createdAt
          updatedAt
        }
      }
    }
  `,
  {
    props: props => ({
      ...props,
      rows: get(props, 'data.allMyProducts.nodes', []),
    }),
  },
)(Table);

const Products = props => {
  const {
    classes,
    productProps,
    items,
    drawerOpen,
    drawerFullscreen,
    setDrawerFullscreen,
    history,
  } = props;
  const rows = [
    {
      id: 1,
      name: 'Товар 1',
      categories: 'Категория 1, категория 2',
    },
  ];
  return (
    <div className={classes.root}>
      <main
        className={cn(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <div className={classes.controls}>
          <Button
            component={Link}
            size="small"
            variant="contained"
            color="primary"
            className={classes.button}
            to="/products/new"
          >
            <AddCircle />
            &nbsp;Добавить товар
          </Button>
        </div>
        <Divider />
        <SearchField />
        <ProductsTable rowsPerPage={25} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerActions}>
          <IconButton
            aria-label="Fullscreen"
            onClick={() => setDrawerFullscreen(!drawerFullscreen)}
          >
            {drawerFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <IconButton
            aria-label="Close"
            onClick={() => history.replace('/products')}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Route
          path="/products/new"
          render={() => (
            <ProductForm onCancel={() => history.replace('/products')} />
          )}
        />
      </Drawer>
    </div>
  );
};

Products.propTypes = {
  productProps: PropTypes.array.isRequired,
};

export default enhance(Products);
