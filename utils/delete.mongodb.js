
module.exports = () => {
  const mongodb = require('mongodb');
  /**
                                                                                          *
                                                                                          * @param {String} dbname
                                                                                          * @param {String} dbhost
                                                                                          * @param {String} dbport
                                                                                          */
  // This function will delete tenant database; function accepts params database name, database host and port
  const deletemongodbforcompany = (dbname, dbhost, dbport, logger) => new Promise(async (resolve, reject) => {
    try {
      const client = new mongodb.MongoClient(`mongodb://${dbhost}:${dbport}`, { useUnifiedTopology: true });
      client.connect((err) => {
        if (!err) {
          logger.info(`Successfully created connection on Mongodb for DatabaseName: ${dbname}`);
        }
      });
      // Use the admin database for the operation
      const db = client.db(dbname);
      // Add the new user to the admin database
      await db.dropDatabase(
        (err, result) => {
          if (err) {
            logger.error('Error: could not drop the database');
            reject(err);
          }
          resolve(result);
        },
      );
      logger.info(`Successfully deleted the database:${dbname}`);
    }


    catch (error) {
      logger.error(`Caught error: ${error} for createCompanyFolderforSubscribedServicesInSftp`);
      reject(error);
    }

  });

  return {
    deletemongodbforcompany,

  };

};
