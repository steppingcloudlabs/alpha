/* eslint-disable max-len */
const S3 = require('../aws');
const logger = require('../logger');

module.exports = () => {
  /**
     * This function will create a folder in S3 bucket with the name of company and the service for which SFTP is required
     * @param {String} companyName
     * @param {String} bucketName
     * @param {String} serviceName
     */
  const createCompanyFolderforSubscribedServicesInSftp = (companyName, bucketName, serviceName) => new Promise(async (resolve, reject) => {
    try {
      const param = {
        Bucket: bucketName,
        Key: `${companyName}/${serviceName}/`,
        Body: 'body does not matter',
      };
      S3.putObject(param, (err, data) => {
        if (err) {
          logger.error(`Error creating the path on S3 for Company: ${companyName}, for service ${serviceName} with error: ${err}`);
        } else {
          logger.info(`Successfully created the path on S3 for Company: ${companyName}, for service ${serviceName}`);
          resolve(data);
        }
      });
    } catch (error) {
      logger.error(`Caught error: ${error} for createCompanyFolderforSubscribedServicesInSftp`);
      reject(error);
    }
  });
  return {
    createCompanyFolderforSubscribedServicesInSftp,
  };
};
