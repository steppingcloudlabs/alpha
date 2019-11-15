/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const servicesService = require('../services/detachServices.service')();
const JsonValidator = require('jsonschema').Validator;
const validatator = new JsonValidator();
module.exports = () => {
    const detachTenantService = async(req, res, next, { logger }) => {
        try {
            const payload = req.body;
            /**
             * /POST body Validation
             */

            const detachTenantServiceSchema = {
                id: '/detachTenantServiceSchema',
                type: 'object',
                properties: {
                    company_id: { type: 'string', },
                    service_name: { type: 'string' },
                    status: { type: { "service_status": 'boolean' } },
                },
                required: ['service_name', 'company_id', 'status'],
            };
            validatator.addSchema(detachTenantServiceSchema, '/detachTenantServiceSchema');
            const validatorResponse = (validatator.validate(payload, '/detachTenantServiceSchema')).valid;
            if (validatorResponse) {
                const response = await servicesService.detachTenantService(payload, logger);
                if (response) {
                    res.status(200).send({
                        status: '200 OK',
                        result: response,
                    });
                    logger.info('Successfully created SFTP logical saperation');
                } else {
                    res.status(200).send({
                        status: '400',
                        result: 'Error while created SFTP server',
                    });
                    logger.error('Error while created SFTP logical saperation');
                }
            } else {
                res.status(200).send({
                    status: '400',
                    result: 'Not a valid JSON, checkout help for json schema ',
                    help: {
                        company_id: { type: 'string', required: true },
                        service_name: { type: 'string', required: true },
                        status: {
                            type: { "service_status": 'boolean' },
                            required: true
                        }
                    }
                })
            }
        } catch (error) {
            next(error);
            logger.error(`Error while registering new company ${error}`);
        }
    };

    const dropTenantService = async(req, res, next, { logger }) => {
        try {
            const payload = req.body;
            const responseList = [];
            for (let i = 0; i < payload.length; i++) {
                const response = await servicesService.dropTenantService(payload[i], logger);
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

    return {
        detachTenantService,
        dropTenantService,
    };
};