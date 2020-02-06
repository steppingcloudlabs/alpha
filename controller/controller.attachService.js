/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const servicesService = require('../services/attachServices.service')();
const JsonValidator = require('jsonschema').Validator;
const validatator = new JsonValidator();

module.exports = () => {
    /**
     * attaching services to the company_id
     */
    const attachTenantService = async(req, res, next, { logger, db }) => {
        try {
            const payload = req.body;
            /**
             * /POST body Validation
             */

            const attachTenantServiceSchema = {
                id: '/attachTenantServiceSchema',
                type: 'object',
                properties: {
                    db_name: { type: 'string' },
                    db_host: { type: 'string' },
                    db_port: { type: 'string' },
                    servicename: [{ type: 'string' }],
                    company_oid: { type: 'string', },
                    collection_name: [{ type: 'string' }],
                    user_role: { type: 'string' },
                    user_type: { type: 'string' }
                },
                required: ['servicename', 'company_oid', 'collection_name', 'user_role', 'db_name', 'db_host', 'db_port', 'user_type'],
            };
            validatator.addSchema(attachTenantServiceSchema, '/attachTenantServiceSchema');
            const validatorResponse = (validatator.validate(payload, '/attachTenantServiceSchema')).valid;
            if (validatorResponse) {
                const response = await servicesService.attachTenantService(payload, logger, db);
                if (response) {
                    res.status(200).send({
                        status: '200 OK',
                        result: response,
                    });
                } else {
                    res.status(200).send({
                        status: '200 OK',
                        result: "Encountered some error while attaching service.",
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
                        servicename: { type: 'string', required: true },
                        company_oid: { type: 'string', required: true },
                        collection_name: [{ type: 'string', required: true }],
                        user_role: {
                            type: 'string',
                            required: true
                        },
                        user_type: { type: 'string' }
                    }
                })
            }

        } catch (error) {
            next(error);
            logger.error(`Error while registering new company ${error}`);
        }
    };
    return {
        attachTenantService,
    };
};