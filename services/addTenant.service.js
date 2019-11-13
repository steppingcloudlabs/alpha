/* eslint-disable no-async-promise-executor */
const sftpUtil = require('../utils/s3.sftp')();
const mongoUtil = require('../utils/mongo.create.db')();
const assignrole = require('../utils/assignRole.db.Collection')();
const TenantCreatorModel = require('../model/alphaMaterSchema');
const aws = require('../aws');
const { S3 } = aws;
module.exports = () => {
    const createTenantDatabase = (payload, logger, db) => new Promise(async(resolve, reject) => {
        try {
            const {

                db_host,
                db_port,
                company_name,
                company_id,
                client_id,
                idp_url,
                token_url,
                private_key,
                grant_type,
                company_admin_contact_email
            } = payload;

            const response = await mongoUtil.createmongodbforcompany(
                company_id,
                db_host,
                db_port,
                logger,
            );
            master_username = response[0];
            master_password = response[1];
            const newTenant = new TenantCreatorModel({
                company_name,
                company_id,
                client_id,
                idp_url,
                token_url,
                private_key,
                grant_type,
                company_admin_contact_email,
                master_username,
                master_password,
            });
            await newTenant.save();
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

    const assignRole = (payload, logger) => new Promise(async(resolve, reject) => {
        try {
            const {
                dbname,
                dbhost,
                dbport,
                collectionName,
                roleType,
            } = payload;
            const response = await assignrole.assignRoleOnDatabaseCollection(
                dbname,
                dbhost,
                dbport,
                collectionName,
                roleType,
                logger,
            );
            resolve(response);
        } catch (error) {
            reject(error);
            logger.error(`Error while assigning role ${error}`);
        }
    });

    const createTenantSftp = (payload, logger) => new Promise(async(resolve, reject) => {
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
        assignRole,
    };
};