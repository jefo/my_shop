/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AdminPage from 'containers/Admin';
import CatalogPage from 'containers/Admin/Catalog';
import ModelEditor from 'containers/Admin/ModelEditor';

const adminRoutes = [
  {
    path: '/admin/catalog',
    component: CatalogPage,
    text: 'Каталог', // todo: i8n
  },
  {
    path: '/admin/forms',
    component: ModelEditor,
    text: 'Редактор форм',
  },
];

export default function App() {
  return (
    <div>
      <Switch>
        <Route
          path="/admin"
          component={() => AdminPage({ routes: adminRoutes })}
        />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
