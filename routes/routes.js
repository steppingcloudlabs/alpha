const express = require('express');

const router = express.Router();
const companyCreatorController = require('../controller/controller.addTenant')();

module.exports = ({ logger, db }) => {
  router
    .route('/createTenantDatabase')
    .post((req, res, next) => companyCreatorController
      .createTenantDatabase(req, res, next, { logger, db }));
  router
    .route('/deleteTenantDatabase')
    .post((req, res, next) => companyCreatorController
      .createTenantSftp(req, res, next, { logger, db }));
  router
    .route('/createTenantSftp')
    .post((req, res, next) => companyCreatorController
      .createTenantSftp(req, res, next, { logger, db }));
  router
    .route('/deleteTenantSftp')
    .post((req, res, next) => companyCreatorController
      .createTenantSftp(req, res, next, { logger, db }));
  router
    .route('/deleteTenantSftp')
    .post((req, res, next) => companyCreatorController
      .createTenantSftp(req, res, next, { logger, db }));
  return router;
};
