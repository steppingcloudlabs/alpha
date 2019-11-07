const express = require('express');

const router = express.Router();
const companyCreatorController = require('../controller/controller.addTenant')();
const companydeletorController = require('../controller/controller.deleteTenant')();

module.exports = ({ logger, db }) => {
  router
    .route('/createTenantDatabase')
    .post((req, res, next) => companyCreatorController
      .createTenantDatabase(req, res, next, { logger, db }));
  router
    .route('/assignrole')
    .post((req, res, next) => companyCreatorController
      .assignRole(req, res, next, { logger, db }));
  router
    .route('/deleteTenantDatabase')
    .post((req, res, next) => companydeletorController
      .deleteTenantDatabase(req, res, next, { logger, db }));
  router
    .route('/createTenantSftp')
    .post((req, res, next) => companyCreatorController
      .createTenantSftp(req, res, next, { logger, db }));
  router
    .route('/deleteTenantSftp')
    .post((req, res, next) => companydeletorController
      .createTenantSftp(req, res, next, { logger, db }));

  return router;
};
