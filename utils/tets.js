/* eslint-disable max-len */
// const S3 = require('../aws');
const AWS = require('aws-sdk');
const logger = require('../logger')();

const options = {
  accessKeyId: 'AKIARKLS7FT4YCKMU5FC',
  secretAccessKey: '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',
  region: 'us-east-1',
};
AWS.config.update(options);
const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
});


const createCompanyFolderInSftp = (S3, companyName, bucketName, service) => new Promise(async (resolve, reject) => {
  try {
    const param = {
      Bucket: bucketName,
      Key: `${companyName}/${service}/`,
      Body: 'body does not matter',
    };
    S3.putObject(param, (err, data) => {
      if (err) {
        logger.error('Error creating the folder: ', err);
      } else {
        logger.info('Successfully created a folder on S3');
        resolve('Successfully created a folder on S3');
      }
    });

    /**
         * Needs to be done
         *  1. Create folder name of company in the bucket
         */
  } catch (error) {
    reject(error);
  }
});

createCompanyFolderInSftp(S3, 'titan', 'sclab-sftp', 'alumni-portal');

createCompanyFolderInSftp(S3, 'mahindra', 'sclab-sftp', 'alumni-portal');
