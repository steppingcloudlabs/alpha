/* eslint-disable no-async-promise-executor */
const sftpUtil = require('../utils/s3.sftp')();
const aws = require('../aws');

const { S3 } = aws;

module.exports = () => {
  const createTenantDatabase = (payload) => new Promise(async (resolve, reject) => {
    try {
      resolve(payload);
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
