const fs = require('fs');
const Tour = require('../models/tourModel');

//Reading the data from JSON
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
);

//Middleware function
exports.checkID = (req, res, next, val) => {
  console.log(`Tour ID is ${val}`);
  const id = req.params.id * 1;
  //Another Possible Logic
  // const tour = tours.find((el) => el.id === id);
  // if (!tour) {
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'INVALID ID',
      requestedAt: req.requestTime,
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'MISSING NAME OR PRICE',
      requestedAt: req.requestTime,
    });
  }
  next();
};

//Route handlers
exports.getALLTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(204).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: null,
  });
};
