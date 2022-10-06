const express = require('express');
const userControllers = require('./../controllers/userController');

//Router Middleware
const router = express.Router();

//Routes
router
  .route('/')
  .get(userControllers.getAllUsers) //Get users route handler
  .post(userControllers.createUser); //Create users route handler

router
  .route('/:id')
  .get(userControllers.getUser) //Get users by id route handler
  .patch(userControllers.updateUser) //Update users route handler
  .delete(userControllers.deleteUser); //Delete users route handler

module.exports = router;
