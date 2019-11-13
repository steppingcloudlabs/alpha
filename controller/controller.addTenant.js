/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const JsonValidator = require('jsonschema').Validator;
const addTenantService = require('../services/addTenant.service')();
const TenantCreatorModel = require('../model/alphaMaterSchema');
const validatator = new JsonValidator();

module.exports = () => {
    /**
     * Add Company
     */
    const createTenantDatabase = async(req, res, next, { logger, db }) => {
        try {
            const payload = req.body;
            /**
             * /POST body Validation
             */
            const addTenantSchema = {
                id: '/addTenantSchema',
                type: 'object',
                properties: {
                    dbname: { type: 'string' },
                    dbhost: { type: 'string' },
                    dbport: { type: 'string' },
                    company_name: { type: 'string' },
                    company_id: { type: 'string', unique: 'yes' },
                    client_id: { type: 'string', unique: 'yes' },
                    idp_url: { type: 'string' },
                    token_url: { type: 'string' },
                    private_key: { type: 'string', unique: 'yes' },
                    grant_type: { type: 'string' },
                    company_admin_contact_email: { type: 'string' }
                },
                required: ['company_name', 'company_id', 'company_admin_contact_email'],
            };
            validatator.addSchema(addTenantSchema, '/addTenantSchema');
            const validatorResponse = (validatator.validate(payload, '/addTenantSchema')).valid;
            if (validatorResponse) {
                /**
                 * CHECKING IF COMPANY ALREADY EXISTS
                 */
                const { company_id } = payload
                const uniqueCompanyIdCheckResponse = await TenantCreatorModel.findOne({ company_id })
                if (uniqueCompanyIdCheckResponse) {
                    res.status(200).send({
                        status: '200 OK',
                        result: 'company ID is already in use',
                    });
                } else {
                    const response = await addTenantService.createTenantDatabase(payload, logger, db);
                    if (response) {
                        res.status(200).send({
                            status: '200 OK',
                            result: {
                                username: response[0],
                                password: response[1],
                                database: response[2],
                            },
                        });
                    } else {
                        res.status(200).send({
                            status: '400',
                            result: 'Encountered some error, please try again',
                        });
                    }
                }

            } else {
                res.status(200).send({
                    status: '400',
                    result: 'Not a valid JSON, checkout help for json schema ',
                    help: {
                        dbname: 'steppingcloud',
                        dbhost: '18.190.14.5',
                        dbport: '1000',
                        company_name: 'Titan',
                        company_id: 'titanTestT1',
                        client_id: 'ksjbv',
                        idp_url: 'sfv',
                        token_url: 'country',
                        private_key: 'private_key',
                        grant_type: 'grant_type',
                        company_admin_contact_email: 'company_admin_contact_email',
                    },
                });
            }
        } catch (error) {
            next(error);
            logger.error(`Error while registering new company ${error}`);
        }
    };

    const createTenantSftp = async(req, res, next, { logger }) => {
        try {
            // check if incoming is list or a json
            const payload = req.body;
            const responseList = [];
            for (let i = 0; i < payload.length; i++) {
                const response = await addTenantService.createTenantSftp(payload[i], logger);
                responseList.push({ index: i, result: response });
            }
            if (responseList) {
                res.status(200).send({
                    status: '200 OK',
                    result: responseList,
                });
                logger.info('Successfully created SFTP logical saperation');
            } else {
                res.status(200).send({
                    status: '400',
                    result: 'Error while created SFTP server',
                });
                logger.error('Error while created SFTP logical saperation');
            }
        } catch (error) {
            next(error);
            logger.error(`Error while registering new company ${error}`);
        }
    };

    const assignRole = async(req, res, next, { logger }) => {
        try {
            const payload = req.body;
            const response = await addTenantService.assignRole(payload, logger);
            res.status(200).send({
                status: '200 OK',
                result: {
                    username: response[0],
                    password: response[1],
                    CompanyName: response[2],
                },

            });
        } catch (error) {
            next(error);
            logger.error(`Error while registering new company ${error}`);
        }
    };

    return {
        createTenantDatabase,
        createTenantSftp,
        assignRole,

    };
};