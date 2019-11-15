/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const addTenantService = require('../services/addTenant.service')();
const deleteTenantService = require('../services/deleteTenant.service')();
const JsonValidator = require('jsonschema').Validator;
const validatator = new JsonValidator();

module.exports = () => {
    /**
     * Add Company
     */
    // delete Tenant Database Controller
    const deleteTenantDatabase = async(req, res, next, { logger, db }) => {
        try {
            const payload = req.body;
            /**
             * /POST body Validation
             */
            const deleteTenantDatabaseSchema = {
                id: '/deleteTenantDatabaseSchema',
                type: 'object',
                properties: {
                    db_name: { type: 'string', },
                    db_host: { type: 'string' },
                    db_port: { type: 'string' },
                },
                required: ['db_name', 'db_host', 'db_port'],
            };
            validatator.addSchema(deleteTenantDatabaseSchema, '/deleteTenantDatabaseSchema');
            const validatorResponse = (validatator.validate(payload, '/deleteTenantDatabaseSchema')).valid;
            if (validatorResponse) {
                const response = await deleteTenantService.deleteTenantDatabase(payload, logger);
                if (response == true) {
                    res.status(200).send({
                        status: '200 OK',
                        result: 'database deleted',

                    });
                } else {
                    res.status(200).send({
                        status: '200 OK',
                        result: 'database doesnot Exist',

                    });
                }
            } else {
                res.status(200).send({
                    status: '400',
                    result: 'Not a valid JSON, checkout help for json schema ',
                    help: {
                        db_name: { type: 'string', required: true },
                        db_host: { type: 'string', required: true },
                        db_port: { type: 'string', required: true },
                    }
                })

            }
        } catch (error) {
            next(error);
            logger.error(`Error while registering new company ${error}`);
        }
    };
    // delete Tenant SFTP Controller
    const deleteTenantSftp = async(req, res, next, { logger }) => {
        try {
            const payload = req.body;
            const responseList = [];
            for (let i = 0; i < payload.length; i++) {
                const response = await addTenantService.deleteTenantSftp(payload[i], logger);
                responseList.push({ index: i, result: response });
            }
            if (responseList) {
                res.status(200).send({
                    status: '200 OK',
                    result: responseList,
                });
                logger.info('Successfully deleted SFTP logical saperation');
            } else {
                res.status(200).send({
                    status: '400',
                    result: 'Error while deleted SFTP server',
                });
                logger.error('Error while deleted SFTP logical saperation');
            }
        } catch (error) {
            next(error);
            logger.error(`Error while registering new company ${error}`);
        }
    };
    return {
        deleteTenantDatabase,
        deleteTenantSftp,
    };
};