const {Trustee} = require('../models')

class TrusteeController {
    static GET_loginForm(req, res) {
        res.render('trusteePages/loginForm')
    }

    static GET_registerForm(req, res) {
        res.render('trusteePages/registerForm')
    }
}

module.exports = TrusteeController