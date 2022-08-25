const connection = require('../config/connection');

const checkTask = (id) => connection.query('UPDATE tasks SET done = NOT done WHERE id = $1', id);

module.exports = checkTask;
