module.exports = () => {
  const attachTenantService = (payload, logger, db) => new Promise(async (resolve, reject) => {
    try {
      /**
             * create collections to database and send the status with collection names
             */
      resolve(payload);
      logger.info(`Successfully ttached service ${payload}`);
    } catch (error) {
      reject(error);
      logger.error(`Error while attaching service ${payload}`);
    }
  });
  const detachTenantService = (payload, logger, db) => new Promise(async (resolve, reject) => {
    try {
      /**
             * update services collection of aplha databse {service_status: active/non-active}
             */
      resolve(payload);
      logger.info(`Successfully ttached service ${payload}`);
    } catch (error) {
      reject(error);
      logger.error(`Error while attaching service ${payload}`);
    }
  });
  const dropTenantService = (payload, logger, db) => new Promise(async (resolve, reject) => {
    try {
      /**
             * Drop collections of the services.
             */
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
