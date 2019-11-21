const express = require('express');

const router = express.Router();
const companyCreatorController = require('../controller/controller.addTenant')();
const companydeletorController = require('../controller/controller.deleteTenant')();
const attachServiceCollectionController = require('../controller/controller.attachService')();
const detachServiceCollectionController = require('../controller/controller.detachService')();
const serviceCollectionController = require('../controller/controller.serviceCollections')();
const roleController = require('../controller/controller.roles')();
const serviceController = require('../controller/controller.serviceController')()

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
        .post((req, res, next) => attachServiceCollectionController
            .attachTenantService(req, res, next, { logger, db }));
    router
        .route('/detachService')
        .post((req, res, next) => detachServiceCollectionController
            .detachTenantService(req, res, next, { logger, db }));
    router
        .route('/dropService')
        .post((req, res, next) => detachServiceCollectionController
            .dropTenantService(req, res, next, { logger, db }));

    /**
     * Services Collection Names Routers
     */
    router
        .route('/addService')
        .post((req, res, next) => serviceCollectionController
            .addService(req, res, next, { logger, db }));
    router
        .route('/deleteService')
        .post((req, res, next) => serviceCollectionController
            .deleteService(req, res, next, { logger, db }));
    router
        .route('/modifyService')
        .post((req, res, next) => serviceCollectionController
            .modifyService(req, res, next, { logger, db }));
    /**
     * Roles APIs.
     */
    router
        .route('/addRole')
        .post((req, res, next) => roleController
            .addRole(req, res, next, { logger, db }));
    router
        .route('/service')
        .post((req, res, next) => serviceController.addservice(req, res, next, { logger, db }))
        .put((req, res, next) => serviceController.registertenant(req, res, next, { logger, db }))
    return router;
};