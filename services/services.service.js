module.exports = () => {
  const attachTenantService = (payload, logger, db) => new Promise(async (resolve, reject) => {
    try {
      resolve(payload);
      logger.info(`Successfully ttached service ${payload}`);
    } catch (error) {
      reject(error);
      logger.error(`Error while attaching service ${payload}`);
    }
  });
  const detachTenantService = (payload, logger, db) => new Promise(async (resolve, reject) => {
    try {
      resolve(payload);
      logger.info(`Successfully ttached service ${payload}`);
    } catch (error) {
      reject(error);
      logger.error(`Error while attaching service ${payload}`);
    }
  });
  const dropTenantService = (payload, logger, db) => new Promise(async (resolve, reject) => {
    try {
      resolve(payload);
      logger.info(`Successfully ttached service ${payload}`);
    } catch (error) {
      reject(error);
      logger.error(`Error while attaching service ${payload}`);
    }
  });
  return {
    attachTenantService,
    detachTenantService,
    dropTenantService,
  };
};
