/* eslint-disable no-async-promise-executor */
const sftpUtil = require('../utils/s3.sftp')();
const aws = require('../aws');

const { S3 } = aws;

module.exports = () => {
  const deleteTenantDatabase = (payload) => new Promise(async (resolve, reject) => {
    try {
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });

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
