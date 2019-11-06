/* eslint-disable no-async-promise-executor */
const sftpUtil = require('../utils/s3.sftp')();
const mongoUtil = require('../utils/mongo.create.db')();

const aws = require('../aws');

const { S3 } = aws;
module.exports = () => {
  const createTenantDatabase = (payload, logger, db) => new Promise(async (resolve, reject) => {
    try {
      const { dbname, dbhost, dbport } = payload;

      const response = await mongoUtil.createmongodbforcompany(
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


  const createTenantSftp = (payload, logger) => new Promise(async (resolve, reject) => {
    try {
      const { companyName, bucketName, serviceName } = payload;
      const response = await sftpUtil.createCompanyFolderforSubscribedServicesInSftp(
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
    createTenantDatabase,
    createTenantSftp,
  };
};
