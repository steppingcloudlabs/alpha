/* eslint-disable no-async-promise-executor */
const sftpUtil = require('../utils/s3.sftp')();
const aws = require('../aws');
const deleteMongoUtil = require('../utils/delete.mongodb')();

const { S3 } = aws;

module.exports = () => {
  // delete tenant database service
  const deleteTenantDatabase = (payload, logger) => new Promise(async (resolve, reject) => {
    try {
      const { dbname, dbhost, dbport } = payload;
      const response = await deleteMongoUtil.deletemongodbforcompany(
        dbname,
        dbhost,
        dbport,
        logger,
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
  // delete tenant SFTP service
  const deleteTenantSftp = (payload, logger) => new Promise(async (resolve, reject) => {
    try {
      const { companyName, bucketName, serviceName } = payload;
      const response = await sftpUtil.deleteCompanyFolderforSubscribedServicesInSftp(
        companyName,
        bucketName,
        serviceName,
        S3,
        logger,
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
  return {
    deleteTenantDatabase,
    deleteTenantSftp,
  };
};
