/* eslint-disable no-unused-vars */
const { join } = require('path');
const express = require('express');
const compression = require('compression');
const router = require('./routers');

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, '..', 'public')));
app.use(router);

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  res.sendFile(join(__dirname, '..', '/', 'public', '404.html'));
});

app.use((err, req, res, next) => {
  res.sendFile(join(__dirname, '..', '/', 'public', '500.html'));
});

module.exports = app;
