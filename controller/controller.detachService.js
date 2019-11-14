/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const servicesService = require('../services/detachServices.service')();

module.exports = () => {
    const detachTenantService = async(req, res, next, { logger }) => {
        try {
            const payload = req.body;
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