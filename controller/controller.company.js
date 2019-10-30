const companyService = require('../services/service.company');

module.exports = () => {
  /**
     * Add Company
     */
  const addCompany = async (req, res, next, { logger }) => {
    try {
      const response = companyService.addCompany();
      res.status(200).send({
        status: '200 OK',
        result: response,
      });
    } catch (error) {
      next(error);
      logger.error(`Error while registering new company ${error}`);
    }
  };
  const hi = async (req, res, next, { logger }) => {
    try {
      res.status(200).send({
        status: '200 OK',
        result: 'response',
      });
      logger.info('Response done');
    } catch (error) {
      next(error);
      logger.error(`Error while registering new company ${error}`);
    }
  };
  return {
    addCompany,
    hi,
  };
};
