/* eslint-disable max-len */

module.exports = () => {
  /**
     * This function will create a folder in S3 bucket with the name of company and the service for which SFTP is required
     * @param {String} companyName
     * @param {String} bucketName
     * @param {String} serviceName
     */
  const createCompanyFolderforSubscribedServicesInSftp = (companyName, bucketName, serviceName, S3, logger) => new Promise(async (resolve, reject) => {
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
          resolve(`Successfully created the path on S3 for Company: ${companyName}, for service ${serviceName}`);
          logger.info(`Successfully created the path on S3 for Company: ${companyName}, for service ${serviceName}`);
        }
      });
    } catch (error) {
      reject(error);
    }
  });

  const deleteCompanyFolderforSubscribedServicesInSftp = (companyName, bucketName, serviceName, S3, logger) => new Promise(async (resolve, reject) => {
    try {
      const param = {
        Bucket: bucketName,
        Prefix: `${companyName}/${serviceName}/`,
      };

      S3.deleteObject(param, (err, data) => {
        if (err) {
          logger.error(`Error deleting the path on S3 for Company: ${companyName}, for service ${serviceName} with error: ${err}`);
        } else {
          resolve(`Successfully deleted the path on S3 for Company: ${companyName}, for service ${serviceName}`);
          logger.info(`Successfully deleted the path on S3 for Company: ${companyName}, for service ${serviceName}`);
        }
      });
    } catch (error) {
      reject(error);
    }
  });

  return {
    createCompanyFolderforSubscribedServicesInSftp,
    deleteCompanyFolderforSubscribedServicesInSftp,
  };
};
