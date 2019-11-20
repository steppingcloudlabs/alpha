const roleService = require('../services/role.service')();

module.exports = () => {
    const addRole = async(req, res, next, { logger, db }) => {
        try {
            const payload = req.body
            const response = roleService.addRole(payload, logger)
            if (response) {
                res.status(200).send({
                    status: '200 OK',
                    result: response
                })
            } else {
                res.status(200).send({
                    status: 400,
                    result: response
                })
            }
        } catch (error) {
            res.status(200).send({
                status: '200',
                result: error
            })
        }
    }
    return {
        addRole
    }
}