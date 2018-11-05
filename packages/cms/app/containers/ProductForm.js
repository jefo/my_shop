import React from 'react';
import { compose, branch, withHandlers, withState, mapProps } from 'recompose';
import gql from 'graphql-tag';
import cn from 'classnames';
import { graphql } from 'react-apollo';
import { get } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Drawer from '@material-ui/core/Drawer';
import Form from 'components/Form';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
  GET_PRODUCTS,
  UPDATE_PRODUCT_MUTATION,
  CREATE_PRODUCT_MUTATION,
} from '../gql';

const drawerWidth = 650;

const withMutation = mutation =>
  graphql(mutation, {
    options: props => ({
      input: props.product,
      update: (proxy, { data }) => {
        const { myProduct } = data.createMyProduct;
        const queryResult = proxy.readQuery({ query: GET_PRODUCTS });
        queryResult.allMyProducts.nodes.push(myProduct);
        proxy.writeQuery({ query: GET_PRODUCTS, data: queryResult });
      },
    }),
  });

const enhance = compose(
  withStyles(theme => ({
    fullScreen: {
      width: 'calc(100% - 240px)',
    },
    button: {
      marginTop: theme.spacing.unit,
      marginRight: theme.spacing.unit,
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
  branch(
    props => !!get(props, 'product.nodeId'),
    withMutation(UPDATE_PRODUCT_MUTATION),
    withMutation(CREATE_PRODUCT_MUTATION),
  ),
  withState('fullScreen', 'setFullscreen', false),
  withHandlers({
    onSubmit: ({ mutate }) => myProduct => {
      mutate({
        variables: { input: { myProduct } },
        optimisticResponse: {
          __typename: 'MyProductsConnection',
          createMyProduct: {
            __typename: 'MyProduct',
            myProduct: {
              createdAt: +new Date(),
              updatedAt: +new Date(),
              ...myProduct,
            },
          },
        },
      });
    },
    toggleFullscreen: ({ fullScreen, setFullscreen }) => () => {
      setFullscreen(!fullScreen);
    },
  }),
  mapProps(props => ({
    ...props,
    drawerOpen: props.location.pathname === '/products/new',
  })),
);

function ProductForm({
  classes,
  onSubmit,
  history,
  fullScreen,
  toggleFullscreen,
  drawerOpen,
  product = {},
}) {
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={drawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Form onSubmit={onSubmit}>
        <div>
          <IconButton aria-label="Fullscreen" onClick={toggleFullscreen}>
            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <IconButton
            aria-label="Close"
            onClick={() => history.replace('/products')}
          >
            <CloseIcon />
          </IconButton>
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Сохранить
          </Button>
        </div>
        <TextField
          variant="outlined"
          label="Наименование"
          margin="normal"
          name="title"
          type="text"
          value={product.title}
          autoFocus
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Цена"
          margin="normal"
          name="price"
          type="number"
          value={product.price}
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Описание"
          margin="normal"
          name="description"
          fullWidth
          multiline
          type="text"
          value={product.description}
        />
      </Form>
    </Drawer>
  );
}

export default enhance(ProductForm);
