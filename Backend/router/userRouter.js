const express = require('express');
// const authController = require('../controller/authController');
const middleware = require('../controller/middleware');
const userController = require('../controller/userController');
const router = express.Router();

router.get('/',middleware.verifyToken,userController.getAllUsers);
router.delete('/:id',middleware.verifyTokenAuth,userController.deleteUser);
router.get('/:id',middleware.verifyTokenAuth,userController.findOneUser);
router.put('/:id',middleware.verifyTokenAuth,userController.updateUser);
module.exports = router;