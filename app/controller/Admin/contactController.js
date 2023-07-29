const User = require('../../../src/models/contact')

function contactController(){
    return {
        async index(req, res, next) {
            const users = await User.find()
            return res.render('adminContact', { users: users })
        },

        // changeStatus(req, res) {
        // },
    }

}

module.exports = contactController