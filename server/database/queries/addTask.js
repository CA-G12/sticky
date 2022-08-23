const connection = require('../config/connection');

const addTaskQuery = (values) => connection.query('INSERT INTO tasks (task, date_id) VALUES ($1, $2);', values);

module.exports = addTaskQuery;
