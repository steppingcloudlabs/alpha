/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const servicesService = require('../services/attachServices.service')();

module.exports = () => {
    /**
     * Add Company
     */
    const attachTenantService = async(req, res, next, { logger, db }) => {
        try {
            const payload = req.body;
            const response = await servicesService.attachTenantService(payload, { logger, db });
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

    const detachTenantService = async(req, res, next, { logger }) => {
        try {
            const payload = req.body;
            const responseList = [];
            for (let i = 0; i < payload.length; i++) {
                const response = await servicesService.detachTenantService(payload[i], logger);
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
        attachTenantService,
        detachTenantService,
        dropTenantService,
    };
};