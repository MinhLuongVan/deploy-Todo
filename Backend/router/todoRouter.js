const express = require('express')
const router = express.Router();
const todoController = require('../controller/todoController');
const middleware = require('../controller/middleware');

router.get('/page',middleware.verifyToken,todoController.getListPage);
router.post('/todo',middleware.verifyToken,todoController.createList);
router.delete('/:id',middleware.verifyToken,todoController.deleteList);
router.get('/:id',middleware.verifyToken,todoController.findOneTodo);
router.put('/:id',middleware.verifyToken,todoController.updateList);
module.exports = router;