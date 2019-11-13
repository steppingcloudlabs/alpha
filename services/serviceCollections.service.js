const serviceColletionModel = require('../model/servicesCollectionSchema')
module.exports = () => {
    const addService = (payload, logger, db) => new Promise(async(resolve, reject) => {
        try {
            const { serviceName, collection } = payload.body;
            const collectionSchema = new serviceColletionModel({ serviceName, collection })
            await collectionSchema.save();
            resolve(" Saved Collection Names of the service")
        } catch (error) {
            reject(error)
        }
    })

    return {
        addService,
        deleteService,
        modifyService
    }

}