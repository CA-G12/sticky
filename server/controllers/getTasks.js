/* eslint-disable no-unused-vars */
const { getTasksQuery } = require('../database/queries');

const getTasks = (req, res) => {
  getTasksQuery()
    .then((data) => res.status(200).json({ data: data.rows, message: 'success', state: 'success' }))
    .catch((err) => res.status(500).json({ message: 'something went wrong', state: 'fail' }));
};

module.exports = getTasks;
