const serviceColletionModel = require('../model/servicesCollectionSchema')
module.exports = () => {
    const addService = (payload, logger, db) => new Promise(async(resolve, reject) => {
        try {
            const { serviceName, collections } = payload;
            const collectionSchema = new serviceColletionModel({ "service_name": serviceName, "collection_name": collections })
            await collectionSchema.save();
            resolve(" Saved Collection Names of the service")
        } catch (error) {
            reject(error)
        }
    })

    return {
        addService,
    }

}