import React from 'react';
import PropTypes from 'prop-types';
import { compose, defaultProps, mapProps } from 'recompose';
import { Route, Switch } from 'react-router-dom';
import EditableTable from 'components/EditableTable';
import EditableForm from 'components/EditableForm';

const enhance = compose(
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
  mapProps(props => {
    const { products, productProps } = props;
    const rows = products.map((p, key) => ({}));
  }),
);

const Catalog = ({ productProps }) => {
  const rows = [
    {
      id: 1,
      name: 'Товар 1',
      categories: 'Категория 1, категория 2',
    },
  ];
  const formProps = {
    fields: productProps,
  };
  return (
    <Switch>
      <Route
        exact
        path="/admin/catalog"
        render={() => <EditableTable rows={rows} />}
      />
      <Route
        exact
        path="/admin/catalog/add"
        render={() => <EditableForm name="product" {...formProps} />}
      />
    </Switch>
  );
};

Catalog.propTypes = {
  productProps: PropTypes.array.isRequired,
};

export default enhance(Catalog);
