/* eslint-disable no-unused-vars */
const {
  addTaskQuery,
  getTasksQuery,
  deleteTaskQuery,
  getDateQuery,
  addDateQuery,
} = require('../database/queries');

const addTask = (req, res) => {
  const { task, date } = req.body;
  res.json({ task, date });
};

module.exports = addTask;
