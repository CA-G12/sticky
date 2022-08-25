/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { getTasks, deleteNote, addTask, checkTask } = require('../controllers');

const router = Router();
router.get('/tasks', getTasks);
router.post('/tasks/add', addTask);
router.get('/tasks/delete/:id', deleteNote);
router.get('/tasks/check/:id', checkTask);

module.exports = router;
