const connection = require('../config/connection');

const getTasksQuery = () => connection.query('SELECT tasks.id, tasks.task, tasks.state, dates.task_date FROM tasks JOIN dates ON dates.id = tasks.date_id;');

module.exports = getTasksQuery;
