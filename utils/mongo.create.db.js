module.exports = () => {
  const mongodb = require('mongodb');
  const generator = require('generate-password');
  const UsernameGenerator = require('username-generator');

  const userPassword = generator.generate({
    length: 12,
    numbers: true,
  });
  const userName = UsernameGenerator.generateUsername();


  /**
     *
     * @param {String} dbname
     * @param {String} dbhost
     * @param {String} dbport
     */
  // This function will create mongodb database for a database name which will be the name of
  const createmongodbforcompany = (dbname, dbhost, dbport, logger) => new Promise(async (resolve, reject) => {
    try {
      const client = new mongodb.MongoClient(`mongodb://${dbhost}:${dbport}`, { useUnifiedTopology: true });
      client.connect((err) => {
        if (!err) {
          logger.info(`Successfully created connection on Mongodb for DatabaseName: ${dbname}`);
        }
        const newDB = client.db(dbname);
        newDB.createCollection('masterdata');
        newDB.createCollection('admin');
        newDB.createCollection('user');
        newDB.createCollection('faqs');
        newDB.createCollection('news');
        newDB.createCollection('events');
        newDB.createCollection('personalinformation');
      });
      // Use the admin database for the operation
      const db = client.db(dbname);


      // Add the new user to the admin database
      db.addUser(userName, userPassword, {
        roles: [{
          role: 'userAdmin',
          db: dbname,

        }],
      }, { privileges: [{ resources: { db: dbname } }] },
      (err) => {
        if (err) {
          logger.error('Error: could not add new user');
        }
      });
      resolve([userName, userPassword, dbname]);
      logger.info(`Successfully created the User : ${userName}, and Password : ${userPassword} for database access:${dbname}`);
    } catch (error) {
      logger.error(`Caught error: ${error} for createCompanyFolderforSubscribedServicesInSftp`);
      reject(error);
    }
  });
  return {
    createmongodbforcompany,

  };
};
