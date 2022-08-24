/* eslint-disable no-unused-vars */
const {
  addTaskQuery,
  getTasksQuery,
  deleteTaskQuery,
  getDateQuery,
  addDateQuery,
} = require('../database/queries');

const getTasks = (req, res) => {
  // res.send('all tasks');
  getTasksQuery()
    .then((data) => res.send(data));
};

module.exports = getTasks;
