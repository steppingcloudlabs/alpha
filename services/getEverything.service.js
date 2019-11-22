const roleschema = require('../model/role')
module.exports = () => {
    const getroleservice = (payload, logger) => new Promise(async (resolve, reject) => {
        try {
            const { role } = payload
            const response = await roleschema.findOne({ role })
            resolve(response)

        } catch (error) {
            res.status(200).send({
                status: 200,
                result: error
            })
        }
    })
    // const getservice = (payload, logger) => new Promise(async (resolve, reject) => {
    //     try {
    //         const { role } = payload
    //         const response = await roleschema.findOne({ role })
    //         resolve(response)

    //     } catch (error) {
    //         res.status(200).send({
    //             status: 200,
    //             result: error
    //         })
    //     }
    // })
    return {
        getroleservice,
        // getservice
    }
}