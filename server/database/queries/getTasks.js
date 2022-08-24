const connection = require('../config/connection');

const getTasksQuery = () => connection.query('SELECT id FROM dates WHERE (SELECT EXISTS(SELECT * FROM dates WHERE task_date = ($1))) AND task_date=($1);', ['01-12-2022']);

module.exports = getTasksQuery;
