const serviceServices = require('../services/services.service')()
module.exports = () => {
    const addservice = async (req, res, next, { logger, db }) => {
        const payload = req.body
        const response = await serviceServices.addservice(payload, logger)
        if (response) {
            res.status(200).send({
                status: 200,
                result: response
            })
        }
        else {
            res.status(200).send({
                status: 400,
                result: "Error"
            })
        }
    }
    const registertenant = async (req, res, next, { logger, db }) => {
        const payload = req.body
        const response = await serviceServices.registertenant(payload, logger)
        if (response) {
            res.status(200).send({
                status: 200,
                result: response
            })
        }
        else {
            res.status(200).send({
                status: 200,
                result: "error"
            })
        }
    }
    return {
        addservice,
        registertenant
    }

}