const {Admin} = require('../models')

class AdminController {
    static GET_homePage(req, res) {
        res.render('adminPages/homePage')
    }

    static GET_loginForm(req, res) {
        res.render('adminPages/loginForm')
    }

    static POST_loginForm(req, res) {
        Admin.findOne({})
        res.send(req.body)
    }

    static GET_registerForm(req, res) {
        res.render('adminPages/registerForm')
    }
}

module.exports = AdminController