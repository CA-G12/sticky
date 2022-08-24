/* eslint-disable no-unused-vars */
const { deleteTaskQuery } = require('../database/queries');

const deleteNote = (req, res) => {
  const { id } = req.params;
  deleteTaskQuery([id])
    .then((data) => res.status(200).json({ message: 'task deleted successfuly', state: 'success' }))
    .catch((err) => res.status(500).json({ message: 'something went wrong', state: 'fail' }));
};

module.exports = deleteNote;
