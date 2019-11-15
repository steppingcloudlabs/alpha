const mongodb = require('mongodb');
const generator = require('generate-password');
const UsernameGenerator = require('username-generator');

module.exports = () => {
    /*
     *
     * @param {String} dbname
     * @param {String} dbhost
     * @param {String} dbport
     * @param {String} collectionName
     * @param {String} roleType
     * @param {String} logger
     *
     */
    // This function will create mongodb database for a database name which will be the name of
    const assignRoleOnDatabaseCollection = (dbname, dbhost, dbport, collectionName, roleType, logger) => new Promise(async(resolve, reject) => {
        try {
            const userPassword = generator.generate({
                length: 12,
                numbers: true,
            });
            const userName = UsernameGenerator.generateUsername() + (new Date()).getTime().toString(36);
            const client = new mongodb.MongoClient(`mongodb://${dbhost}:${dbport}`, { useUnifiedTopology: true });
            client.connect((err) => {
                if (!err) {
                    logger.info(`Successfully created connection on Mongodb for DatabaseName: ${dbname}`);
                }
            });
            const db = client.db(dbname);
            if (roleType == 'admin') {
                for (let i = 0; i < collectionName.length; i++) {
                    db.createCollection(collectionName[i]);
                }
                // Use the admin database for the operation
                // Add the new user to the admin database
                db.addUser(userName, userPassword, {
                        roles: [{
                            role: 'dbAdmin',
                            db: dbname,
                        }],
                    }, {
                        privileges: [{
                            resources: { db: dbname },
                        }],
                    },
                    (err) => {
                        if (err) {
                            logger.error('Error: could not add new user');
                        }
                    });
                resolve([userName, userPassword, dbname]);
                logger.info(`Successfully created the User : ${userName}, and Password : ${userPassword} for database access:${dbname}`);
            }
            // if roletype is user
            else if (roleType == 'user') {
                //   Creating collections if database in this looop and creating list of privileges.
                const listPriviliges = [];
                for (let i = 0; i < collectionName.length; i++) {
                    db.createCollection(collectionName[i]);
                    listPriviliges.push({ resources: { db: dbname, collection: collectionName[i] }, action: ['find', 'update', 'insert'] });
                }
                // Creating user
                db.addUser(userName, userPassword, {
                        roles: [{
                            role: 'readWrite',
                            db: dbname,
                        }],
                    }, {
                        privileges: listPriviliges,
                    },
                    (err) => {
                        if (err) {
                            logger.error('Error: could not add new user');
                        }
                    });
                resolve([userName, userPassword, dbname]);
                logger.info(`Successfully created the User : ${userName}, and Password : ${userPassword} for database access:${dbname}`);
            }
        } catch (error) {
            logger.error(`Caught error: ${error} for createTenantDatabaseforaCompany`);
            reject(error);
        }
    });
    return {
        assignRoleOnDatabaseCollection,
    };

};