const express = require('express');
const path = require('path');
const migrate = require('node-pg-migrate');
const { postgraphile } = require('postgraphile');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(
  postgraphile(
    process.env.DATABASE_URL ||
      'postgres://postgres:tsgddytd@localhost:5432/my_shop',
    'public',
    {
      options: {
        watchPg: true,
        classicIds: true,
        enableCors: true,
      },
    },
  ),
);

app.listen(3001, () => {
  console.log('Server started at localhost:3000');
});
