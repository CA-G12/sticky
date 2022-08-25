const { checkTaskQuery } = require('../database/queries');

const checkTask = (req, res) => {
  const { id } = req.params;
  checkTaskQuery([id])
    .then((response) => res.status(200).json({ message: 'task updated', state: 'success' }))
    .catch((err) => res.status(500).json({ message: 'something went wrong', state: 'fail' }));
};

module.exports = checkTask;
