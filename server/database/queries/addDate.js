/* eslint-disable no-unused-vars */
const connection = require('../config/connection');

const addDate = (date) => connection.query('INSERT INTO dates(task_date) VALUES ($1) RETURNING id', date);

module.exports = addDate;
