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

module.exports = app;
