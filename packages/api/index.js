const Sequelize = require('sequelize');
const express = require('express');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres|'mssql',
});

const app = express();

app.get('/schemas/models', (req, res) => {

});

app.post('/schemas/models', (req, res) => {

});
