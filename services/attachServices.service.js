const MongoClient = require('mongodb').MongoClient;
const serviceAttacherModel = require('../model/alphaServicesGods');
const credsUtils = require('../utils/assignRole.db.Collection')();
const serviceSchema = require('../model/servicesList')
const masterSchema = require('../model/alphaMaterSchema')
const roleSchema = require('../model/role')
const config = require("../config/index");
const { atlasClient } = require('../mongo.js')
const { env } = config;

module.exports = () => {
    /**
     * @param {JSON} payload
     * @param {Object} logger
     * @param {Object} db
     */
    const attachTenantService = (payload, logger, db) => new Promise(async(resolve, reject) => {
        try {
            /**
             * create the list of collection in the database.
             */
            const {
                db_host,
                db_port,
                db_name,
                service_name,
                company_oid,
                collection_name,
                user_role,
                user_type
            } = payload;

            const db = atlasClient.db(db_name);
            const collect_names = collection_name
            const size = collect_names.length
            for (let i = 0; i < size; i++) {
                db.createCollection(collect_names[i]);
            }


            /**
             * creating a username and password for the service.
             */
            const createUserResponse = await credsUtils.assignRoleOnDatabaseCollection(db_name, atlasClient, collection_name, user_type, logger)

            /**
             * inserting new entry to the serives collection of the alpha's database with newly created user
             */
            const username = createUserResponse[0]
            const password = createUserResponse[1]
            const service_status = true
                // get service docuement
            const service = await serviceSchema.findById(service_name)
                // get tenant object ID
            const company_id = await masterSchema.findById(company_oid)
                //  get roles object ID
            const roles = await roleSchema.findById(user_role)
                //  save new service god with details
            const newServiceGod = new serviceAttacherModel({ company_id, company_oid, username, password, service, service_status, user_role })
                // save tenant to new service god
            newServiceGod.company_id = company_id
                // save serivce to new service god
            newServiceGod.service_name = service
                // attach role for new god
            newServiceGod.user_role = roles
            await newServiceGod.save()
                // save new tenant to service collection
            service.tenant_id = company_id
            await service.save()
                // save new service to master collection
            company_id.service_name = service
            await company_id.save()
            resolve(`Successfully attached service `);
            logger.info(`Successfully attached service ${payload.service_name}`);
        } catch (error) {
            reject(error);
            logger.error(`Error while attaching service ${payload.service_name} for company_id: ${payload.company_id}`);
        }
    });

    return {
        attachTenantService,
    };
};