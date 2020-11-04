module.exports = app => {
  const patients = require('../controllers/patients.controller.js');
  const orders = require('../controllers/orders.controller.js');
  const router = require('express').Router();

  router.get('/patients', patients.findAll);

  router.post('/orders', orders.create);
  router.get('/orders/:id', orders.findOne);
  router.delete('/orders/id/:id', orders.deleteId);

  app.use('/api/todolist', router);
};
