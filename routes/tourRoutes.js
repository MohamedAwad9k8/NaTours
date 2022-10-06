const express = require('express');
const tourController = require('../controllers/tourController');

//Router Middleware
const router = express.Router();

router.param('id', tourController.checkID);
//Routes
router
  .route('/')
  .get(tourController.getALLTours) //Get tours route handler
  .post(
    tourController.checkBody,
    tourController.createTour
  ); //Create tours route handler

router
  .route('/:id')
  .get(tourController.getTour) //Get tours by id route handler
  .patch(tourController.updateTour) //Update tours route handler
  .delete(tourController.deleteTour); //Delete tours route handler

module.exports = router;
