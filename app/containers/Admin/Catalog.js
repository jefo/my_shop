import React from 'react';
import PropTypes from 'prop-types';
import { compose, defaultProps } from 'recompose';
import { Route, Switch } from 'react-router-dom';
import EditableTable from 'components/EditableTable';
import { create as createForm } from 'components/EditableForm';

const enhance = compose(
  defaultProps({
    fields: [
      { name: 'id', label: 'ID', type: 'text' },
      { name: 'name', label: 'Наименование', type: 'text' },
    ],
  }),
);

const ProductForm = createForm('product');

const Catalog = ({ fields }) => {
  const rows = [
    {
      id: 1,
      name: 'Товар 1',
      categories: 'Категория 1, категория 2',
    },
  ];
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
        render={() => <ProductForm fields={fields} />}
      />
    </Switch>
  );
};

Catalog.propTypes = {
  fields: PropTypes.array.isRequired,
};

export default enhance(Catalog);
