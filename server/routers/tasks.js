/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { getTasks, deleteNote, addTask } = require('../controllers');

const router = Router();
router.get('/tasks', getTasks);
router.post('/tasks/add', addTask);
router.get('/tasks/delete/:id', deleteNote);

module.exports = router;
