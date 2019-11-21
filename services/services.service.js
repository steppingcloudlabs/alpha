const serviceSchema = require('../model/servicesList')
module.exports = () => {
    const addservice = (payload, logger) => new Promise(async (resolve, reject) => {
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
    const registertenant = (payload, logger) => new Promise(async (resolve, reject) => {
        try {
            const { tenant_id, company_name, service_name } = payload
            const attachservice = new serviceSchema({ tenant_id, company_name, service_name })
            const success = await attachservice.save()
            logger.info("suceessfully registered tenant")
            resolve(success._id)
        } catch (error) {
            reject(error)
            logger.error("error while registering tenant")
        }
    })
    return {
        addservice,
        registertenant
    }

}