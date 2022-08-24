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
  console.log(task, date);
  getDateQuery([date])
    .then((data) => {
      if (data.rows.length > 0) {
        return data;
      }
      return addDateQuery([date]);
    })
    .then((dataDate) => dataDate.rows[0])
    .then((dateId) => {
      const { id } = dateId;
      return addTaskQuery([task, id]);
    })
    .then((sara) => res.status(200).json({ message: 'task added successfuly', state: 'success' }))
    .catch((err) => res.status(500).send({ message: 'something went wrong', state: 'fail' }));
};

module.exports = addTask;
