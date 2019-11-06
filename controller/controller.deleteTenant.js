/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const addTenantService = require('../services/addTenant.service')();
const deleteTenantService = require('../services/deleteTenant.service')();


module.exports = () => {
  /**
     * Add Company
     */
  // delete Tenant Database Controller
  const deleteTenantDatabase = async (req, res, next, { logger, db }) => {
    try {
      const payload = req.body;
      const response = await deleteTenantService.deleteTenantDatabase(payload, logger);
      if (response == true) {
        res.status(200).send({
          status: '200 OK',
          result: 'database deleted',

        });
      }
      else {
        res.status(200).send({
          status: '200 OK',
          result: 'database doesnot Exist',

        });
      }
    } catch (error) {
      next(error);
      logger.error(`Error while registering new company ${error}`);
    }
  };
  // delete Tenant SFTP Controller
  const deleteTenantSftp = async (req, res, next, { logger }) => {
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
