const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const todoController = require('../src/controllers/todo-controller');

router.get('/', todoController.listTodo);
router.post('/', [check('title').isLength({min: 1}).withMessage('Required title parameter')],todoController.createTodo);
router.put('/', todoController.updateTodo);
// router.delete('/', todoController.deleteTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;