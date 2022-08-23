const connection = require('../config/connection');

const getTasksQuery = () => connection.query('SELECT * FROM tasks;');

module.exports = getTasksQuery;
