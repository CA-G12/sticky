const connection = require('../config/connection');

const deleteTaskQuery = (idValue) => connection.query('DELETE * FROM tasks WHERE id=$1', idValue);

module.exports = deleteTaskQuery;
