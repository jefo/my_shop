import React from 'react';
import { compose, branch, renderComponent } from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { get } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Form from 'components/Form';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation($input: UpdateMyProductInput!) {
    updateMyProduct(input: $input) {
      myProduct {
        title
        price
        description
      }
    }
  }
`;

const CREATE_PRODUCT_MUTATION = gql`
  mutation($input: CreateMyProductInput!) {
    createMyProduct(input: $input) {
      myProduct {
        title
        description
        price
      }
    }
  }
`;

const withMutation = mutation =>
  graphql(mutation, {
    options: props => ({
      input: props.product,
    }),
  });

const enhance = compose(
  withStyles(theme => ({
    button: {
      marginTop: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  })),
  branch(
    props => !!get(props, 'product.nodeId'),
    withMutation(UPDATE_PRODUCT_MUTATION),
    withMutation(CREATE_PRODUCT_MUTATION),
  ),
);

const ProductForm = ({
  classes,
  onSubmit,
  onCancel,
  history,
  product = {},
}) => (
  <Form onSubmit={onSubmit} onReset={onCancel}>
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
    <div>
      <Button
        type="submit"
        className={classes.button}
        variant="contained"
        color="primary"
      >
        Сохранить
      </Button>
      <Button type="reset" className={classes.button} variant="contained">
        Отмена
      </Button>
    </div>
  </Form>
);

export default enhance(ProductForm);
