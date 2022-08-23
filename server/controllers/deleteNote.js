/* eslint-disable no-unused-vars */
const deleteNote = (req, res) => {
  const { id } = req.params;
  res.send(id);
};

module.exports = deleteNote;
