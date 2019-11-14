const mongodb = require('mongodb');
const serviceAttacherModel = require('../model/alphaServicesSchema');
const credsUtils = require('../utils/assignRole.db.Collection')();
module.exports = () => {
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
                company_id,
                collection_name,
                role_type
            } = payload;
            const client = new mongodb.MongoClient(`mongodb://${db_host}:${db_port}`, {
                useUnifiedTopology: true
            });
            client.connect((err) => {
                if (!err) {
                    logger.info(`Successfully created connection on Mongodb for DatabaseName: ${db_name}`);
                }
            });
            const db = client.db(db_name);
            const collect_names = collection_name
            const size = collect_names.length
            for (let i = 0; i < size; i++) {
                db.createCollection(collect_names[i]);
            }
            /**
             * creating a username and password for the service.
             */
            const createUserResponse = await credsUtils.assignRoleOnDatabaseCollection(db_name, db_host, db_port, collection_name, role_type, logger)

            /**
             * inserting new entry to the serives collection of the alpha's database with newly created user
             */
            const username = createUserResponse[0]
            const password = createUserResponse[1]
            const service_status = true
            const userResponse = new serviceAttacherModel({ company_id, username, password, service_name, service_status })
            await userResponse.save()
            resolve(`Successfully attached service ${payload.service_name} for company_id: ${payload.company_id}`);
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