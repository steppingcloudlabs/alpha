const express = require('express');

const router = express.Router();
const companyCreatorController = require('../controller/controller.addTenant')();
const serviceCreatorController = require('../controller/controller.services')();
const companydeletorController = require('../controller/controller.deleteTenant')();

module.exports = ({ logger, db }) => {
  /**
     * Tenant Registration Routes
     */
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
    .post((req, res, next) => companyCreatorController
      .createTenantSftp(req, res, next, { logger, db }));
  /**
     *  Service Routers
     */
  router
    .route('/attachService')
    .post((req, res, next) => serviceCreatorController
      .attachTenantService(req, res, next, { logger, db }));
  router
    .route('/detachService')
    .post((req, res, next) => serviceCreatorController
      .detachTenantService(req, res, next, { logger, db }));
  router
    .route('/dropService')
    .post((req, res, next) => serviceCreatorController
      .dropTenantService(req, res, next, { logger, db }));
  return router;
};
