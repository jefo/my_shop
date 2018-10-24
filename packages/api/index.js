const express = require('express');
const migrate = require('node-pg-migrate');
const { postgraphile } = require('postgraphile');

app.use(
  postgraphile(
    process.env.DATABASE_URL ||
      'postgres://postgres:tsgddytd@localhost:5432/my_shop',
    'public',
    {
      options: {
        watchPg: true,
      },
    },
  ),
);

const app = express();

app.listen(3000, () => {
  console.log('Server started at localhost:3000');
});
