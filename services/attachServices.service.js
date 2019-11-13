const mongodb = require('mongodb');
module.exports = () => {
    const attachTenantService = (payload, logger, db) => new Promise(async(resolve, reject) => {
        try {
            /**
             * create collections to database and send the status with collection names
             */
            const client = new mongodb.MongoClient(`mongodb://${payload.dbhost}:${payload.dbport}`, { useUnifiedTopology: true });
            client.connect((err) => {
                if (!err) {
                    logger.info(`Successfully created connection on Mongodb for DatabaseName: ${payload.dbname}`);
                }
            });
            const db = client.db(payload.dbname);
            const collectNames = payload.collectionName
            const size = collectNames.length
            for (let i = 0; i < size; i++) {
                db.createCollection(collectNames[i]);
            }
            resolve(collectNames);
            logger.info(`Successfully attached service ${payload}`);
        } catch (error) {
            reject(error);
            logger.error(`Error while attaching service ${payload}`);
        }
    });

    return {
        attachTenantService,
        detachTenantService,
        dropTenantService,
    };
};