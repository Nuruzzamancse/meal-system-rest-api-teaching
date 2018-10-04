const todoController = require('../controllers/todo');

const express = require('express');
const router  = express.Router();

router.post('/', todoController.createTodo);
router.get('/', todoController.getAllTodo);
router.get('/:id', todoController.getSingleTodo);
router.delete('/:id', todoController.deleteTodo);
router.put('/:id', todoController.updateTodo);
module.exports = router;