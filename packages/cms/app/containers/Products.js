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
import { format, isThisYear } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import DataTable from 'components/DataTable';
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
  mapProps(props => ({
    ...props,
    drawerOpen: props.location.pathname === '/products/new',
  })),
);

const ProductsTable = compose(
  defaultProps({
    cols: [
      { name: 'title', content: 'Наименование' },
      { name: 'price', content: 'Цена' },
      { name: 'description', content: 'Описание' },
      { name: 'createdAt', content: 'Создано' },
      { name: 'updatedAt', content: 'Обновлено' },
    ],
    selectable: true,
  }),
  graphql(
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
        rows: get(props, 'data.allMyProducts.nodes', []).map(p => {
          const createdAt = new Date(p.createdAt);
          const updatedAt = new Date(p.updatedAt);
          const options = { locale: ruLocale };
          return {
            ...p,
            createdAt: format(
              createdAt,
              isThisYear(createdAt) ? 'DD MMMM' : 'DD MMMM YYYY',
              options,
            ).toLowerCase(),
            updatedAt: format(
              updatedAt,
              isThisYear(updatedAt) ? 'DD MMMM' : 'DD MMMM YYYY',
              options,
            ).toLowerCase(),
          };
        }),
      }),
    },
  ),
)(DataTable);

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
        <Route
          path="/products/new"
          render={() => (
            <ProductForm
              history={history}
              onCancel={() => history.replace('/products')}
            />
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
