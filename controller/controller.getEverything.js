const getservice = require('../services/getEverything.service')()
module.exports = () => {
    //get role controller
    const getrole = async (req, res, next, { logger, db }) => {
        try {
            const payload = req.body
            const response = await getservice.getroleservice(payload, logger)
            if (response) {
                res.status(200).send({
                    status: '200',
                    result: response
                })
            }
            else {
                res.status(200).send({
                    status: '400',
                    result: error
                })
            }
        } catch (error) {
            res.status(200).send({
                status: '400',
                result: "error while getting role"
            })
        }
    }
    const getservice = async (req, res, next, { logger, db }) => {
        try {
            const payload = req.body
            const response = await getservice.getservice(payload, logger)
            if (response) {
                res.status(200).send({
                    status: '200',
                    result: response
                })
            }
            else {
                res.status(200).send({
                    status: '400',
                    result: " error while getting service"
                })
            }
        } catch (error) {
            res.status(200).send({
                status: '400',
                result: error
            })
        }
    }
    return {
        getrole,
        getservice
    }
}