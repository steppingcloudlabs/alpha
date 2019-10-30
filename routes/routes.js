const express = require('express');

const router = express.Router();

const companyCreatorController = require('../controller/controller.company')();

module.exports = ({ logger, db }) => {
  router
    .route('/addCompany')
    .post((req, res, next) => companyCreatorController.addCompany(req, res, next, { logger, db }));
  router
    .route('/hi')
    .get((req, res, next) => companyCreatorController.hi(req, res, next, { logger }));
  return router;
};
