const mongodb = require('mongodb');
const servicesSchema = require("../model/alphaServicesGods")

module.exports = () => {
    const detachTenantService = (payload, logger, db) => new Promise(async(resolve, reject) => {
        try {
            /**
             * update services collection of aplha databse {service_status: active/non-active}
             */
            const { company_id, service_name, status } = payload;
            const findServiceRespone = servicesSchema.findOne({ company_id })
            if (findServiceRespone) {
                await findServiceRespone.findOneAndUpdate({ service_name }, { $set: status }, { multi: true });
                resolve(`Successfully attached service ${payload.service_name}`);
                logger.info(`Successfully attached service ${payload}`);
            } else {
                reject(`${payload.service_name} does not exists for ${paylaod.company_id}`)
            }

        } catch (error) {
            reject(error);
            logger.error(`Error while attaching service ${payload}`);
        }
    });
    const dropTenantService = (payload, logger, db) => new Promise(async(resolve, reject) => {
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
        detachTenantService,
        dropTenantService
    }
}