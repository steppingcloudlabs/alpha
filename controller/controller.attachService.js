/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const servicesService = require('../services/attachServices.service')();

module.exports = () => {
    /**
     * attaching services to the company_id
     */
    const attachTenantService = async(req, res, next, { logger, db }) => {
        try {
            const payload = req.body;
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

        } catch (error) {
            next(error);
            logger.error(`Error while registering new company ${error}`);
        }
    };
    return {
        attachTenantService,
    };
};