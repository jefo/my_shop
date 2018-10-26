import React from 'react';
import { createBrowserRouter, makeRouteConfig, Route } from 'found';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ProductsPage from 'containers/Products';
// import ModelEditor from 'containers/ModelEditor';
// import Layout from 'components/Layout';
import AppPage from 'containers/App';

const Router = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <Route path="/" Component={AppPage}>
      <Route path="/products" Component={ProductsPage} />
    </Route>,
  ),

  renderError: ({ error }) => (
    <div>{error.status === 404 ? 'Not found' : 'Error'}</div>
  ),
});

export default Router;
