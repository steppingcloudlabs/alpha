/* eslint-disable max-len */
const S3 = require('../aws');

module.exports = () => {
  /**
     *
     * @param {String} companyName
     * @param {String} bucketName
     * @param {String} serviceName
     */
  const createCompanyFolderInSftp = (companyName, bucketName) => new Promise(async (resolve, reject) => {
    try {
      resolve(companyName, bucketName);
      /**
             * Needs to be done
             *  1. Create folder name of company in the bucket
             */
    } catch (error) {
      reject(error);
    }
  });
  const createServiceStructureForCompanyFolderInSftp = (companyName, bucketName, serviceName) => new Promise(async (resolve, reject) => {
    try {
      resolve(companyName, bucketName, serviceName);

      /**
             * Needs to be done
             *  1. Create service folder name of company in the company folder
             */
    } catch (error) {
      reject(error);
    }
  });
  return {
    createCompanyFolderInSftp,
    createServiceStructureForCompanyFolderInSftp,
  };
};
