const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongoose");
const logger = require("../logger")();

const generator = require("generate-password");
const UsernameGenerator = require("username-generator");
const config = require("../config/index");
const { env } = config;
module.exports = () => {
    /*
     * @param {String} dbname
     * @param {String} dbhost
     * @param {String} dbport
     */

    // This function will create mongodb database for a database name which will be the name of
    const createmongodbforcompany = (dbname, dbhost, dbport, logger) =>
        new Promise(async(resolve, reject) => {
            try {
                const userName =
                    UsernameGenerator.generateUsername() +
                    new Date().getTime().toString(36);
                const userPassword = generator.generate({
                    length: 12,
                    numbers: true
                });
                let uri = "";

                if (config.isMongoUri) {
                    uri = config.mongo_uri;
                } else if (env === "production") {
                    uri = `mongodb://${config.mongo_username}:${config.mongo_password}@${config.mongo_host}:${config.mongo_port}/${config.mongo_dbname}`;
                } else {
                    uri = `mongodb://${config.mongo_host}:${config.mongo_port}/${config.mongo_dbname}`;
                }

                mongo.connect(
                    uri, {
                        useCreateIndex: true,
                        useNewUrlParser: true,
                        useFindAndModify: false,
                        useUnifiedTopology: true
                    },
                    err => {
                        if (err) {
                            throw new Error("Error connecting mongoose");
                        } else {
                            logger.info(`Connection successfull for ${env}`);
                        }
                    }
                );
                // console.log(uri);
                const client = new MongoClient(uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                const client_connect = client.connect(err => {
                    if (!err) {
                        logger.info(
                            `Successfully created connection on Mongodb for DatabaseName: ${dbname}`
                        );
                    }
                    const newDB = client.db(dbname);
                    newDB.createCollection("login");
                    // Use the admin database for the operation
                    const db = client.db(dbname);
                    // below line is very important, without this line you'll see this error >>> MongoError: CMD_NOT_ALLOWED: createUser
                    const db_admin = db.admin();
                    // Add the new user to the admin database
                    db_admin.addUser(
                        userName,
                        userPassword, {
                            roles: [{
                                role: "userAdmin",
                                db: dbname
                            }]
                        }, { privileges: [{ resources: { db: dbname } }] },
                        err => {
                            if (err) {
                                logger.error("Error: could not add new user");
                            }
                        }
                    );
                    resolve([userName, userPassword, dbname]);
                });

                logger.info(
                    `Successfully created the User : ${userName}, and Password : ${userPassword} for database access:${dbname}`
                );
            } catch (error) {
                logger.error(
                    `Caught error: ${error} for createTenantDatabaseforaCompany`
                );
                reject(error);
            }
        });
    return {
        createmongodbforcompany
    };
};