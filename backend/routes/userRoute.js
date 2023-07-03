const express = require('express')
const userContoller = require('../controllers/userController');

const router = express.Router()

router
  .route('/')
  .get(userContoller.getAllUsers)
  .post(userContoller.createUser)

router
  .route('/:id')
  .patch(userContoller.updateUser)
  .delete(userContoller.deleteUser, userContoller.deleteRecord)


module.exports = router