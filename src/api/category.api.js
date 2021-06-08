const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');

module.exports = function () {
  router.post('/create', controller.createCategory);
  router.get('/', controller.getAllCategory);
  router.get('/:id', controller.getRoomsForCategory);
  router.get('/amount/:id', controller.calculateAmount);
  return router;
}