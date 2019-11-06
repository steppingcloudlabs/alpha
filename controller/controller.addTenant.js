/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const addTenantService = require('../services/addTenant.service')();

module.exports = () => {
  /**
     * Add Company
     */
  const createTenantDatabase = async (req, res, next, { logger, db }) => {
    try {
      const payload = req.body;
      const response = await addTenantService.createTenantDatabase(payload, logger, db);
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

  const createTenantSftp = async (req, res, next, { logger }) => {
    try {
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
  return {
    createTenantDatabase,
    createTenantSftp,
  };
};
