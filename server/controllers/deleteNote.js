/* eslint-disable no-unused-vars */
const {
  addTaskQuery,
  getTasksQuery,
  deleteTaskQuery,
  getDateQuery,
  addDateQuery,
} = require('../database/queries');

const deleteNote = (req, res) => {
  const { id } = req.params;
  res.send(id);
};

module.exports = deleteNote;
