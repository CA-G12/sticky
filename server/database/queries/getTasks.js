const connection = require('../config/connection');

const getTasksQuery = () => connection.query('SELECT tasks.id, tasks.task, tasks.done, dates.task_date FROM tasks JOIN dates ON dates.id = tasks.date_id ORDER BY tasks.id;');

module.exports = getTasksQuery;
