const serviceSchema = require('../model/servicesList')
const masterSchema = require('../model/alphaMaterSchema')
module.exports = () => {
    const addservice = (payload, logger) => new Promise(async(resolve, reject) => {
        try {
            const { service_name } = payload
            const newservice = new serviceSchema({ service_name })
            const success = await newservice.save()
            logger.info("suceessfully created the service")
            resolve(success._id)
        } catch (error) {
            reject(error)
            logger.error("error while adding service")
        }
    })
    const registertenant = (payload, logger) => new Promise(async(resolve, reject) => {
        try {
            const { tenant_id, service_name } = payload
            const attachservice = new serviceSchema({ tenant_id, service_name })
                // get tenant
            const tenant = await masterSchema.findById(tenant_id)
                // save reference to service collection.
            attachservice.tenant_id = tenant
                // save the object to database
            const success = await attachservice.save()
                // add service to tenant
            tenant.service_name.push(attachservice)
                // save the tenant with attached serivce
            await tenant.save()
            logger.info("suceessfully registered tenant")
            resolve(success)
        } catch (error) {
            reject(error)
            logger.error("error while registering tenant")
        }
    })
    const getservice = (payload, logger) => new Promise(async(resolve, reject) => {
        try {
            const { service_name } = payload
            const service = await serviceSchema.findOne({ service_name }).populate(tenant_id)
            logger.info("suceessfully created the service")
            resolve(service)
        } catch (error) {
            reject(error)
            logger.error("error while adding service")
        }
    })
    return {
        addservice,
        registertenant,
        getservice
    }

}