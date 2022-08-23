/* eslint-disable no-unused-vars */
const addTask = (req, res) => {
  const { task, date } = req.body;
  res.json({ task, date });
};

module.exports = addTask;
