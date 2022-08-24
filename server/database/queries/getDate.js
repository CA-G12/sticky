/* eslint-disable no-unused-vars */
const connection = require('../config/connection');

const getDate = (date) => connection.query('SELECT id FROM dates WHERE (SELECT EXISTS(SELECT * FROM dates WHERE task_date = ($1))) AND task_date=($1);', date);

module.exports = getDate;
