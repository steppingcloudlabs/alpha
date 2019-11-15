const serviceCollectionsService = require('../services/serviceCollections.service')()
module.exports = () => {
    const addService = async(req, res, next, { logger, db }) => {
        try {
            payload = req.body
            const response = await serviceCollectionsService.addService(payload, logger, db)
            if (response) {
                res.status(200).send({
                    status: "200 OK",
                    result: response
                })
                logger.info("Added service Schema to the database")
            } else {
                res.status(200).send({
                    status: "400",
                    result: "Encountered some error"
                })
            }

        } catch (error) {
            res.status(200).send({
                status: "400",
                result: error
            })
            logger.error("Error while adding service collection name to the database")

        }

    }
    const deleteService = async(req, res, next, { logger, db }) => {
        try {
            payload = req.body
            const response = await serviceCollectionsService.deleteService(payload, logger)
            if (response) {
                res.status(200).send({
                    status: "200 OK",
                    result: response
                })
                logger.info("Added service Schema to the database")
            } else {
                res.status(200).send({
                    status: "400",
                    result: "Encountered some error"
                })
            }

        } catch (error) {
            res.status(200).send({
                status: "400",
                result: error
            })
            logger.error("Erroe while adding service collection name to the database")
        }

    }
    const modifyService = async(req, res, next, { logger, db }) => {
        try {
            payload = req.body
            const response = await serviceCollectionsService.modifyService(payload, logger)
            if (response) {
                res.status(200).send({
                    status: "200 OK",
                    result: response
                })
                logger.info("Added service Schema to the database")
            } else {
                res.status(200).send({
                    status: "400",
                    result: "Encountered some error"
                })
            }

        } catch (error) {
            res.status(200).send({
                status: "400",
                result: error
            })
            logger.error("Erroe while adding service collection name to the database")
        }

    }
    return {
        addService,
        deleteService,
        modifyService
    }

}