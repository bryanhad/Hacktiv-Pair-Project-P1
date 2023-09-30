const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const TrusteeController = require('../controllers/TrusteeController')
const AdminController = require('../controllers/adminController')
const { adminRoutes } = require('./adminRoutes')
const { trusteeRoutes } = require('./trusteeRoutes')

function validateToGetTrusteeLoginForm(req, res, next) {
    if (req.session.user) {
        if (req.session.user.isAdmin) { //Ga boleh ke form login Kurator kalo udah login sbg Admin
            const errorMsg = 'You have logged in as an Admin loh!'
            return res.redirect(`/admin?error=${errorMsg}`)
        } else {
            const errorMsg = 'You have logged in loh!'
            return res.redirect(`/trustee?error=${errorMsg}`)
        }
    }
    next()
}
function validateToGetAdminLoginForm(req, res, next) {
    if (req.session.user) {
        if (!req.session.user.isAdmin) { //Ga boleh ke form login Admin kalo udah login sbg Kurator
            const errorMsg = 'You have logged in as a Kurator loh!'
            return res.redirect(`/trustee?error=${errorMsg}`)
        } else {
            const errorMsg = 'You have logged in loh!'
            return res.redirect(`/admin?error=${errorMsg}`)
        }
    }
    next()
}

router.get('/', Controller.GET_homePage)

router.get('/blog/:blogId', Controller.GET_blogDetail)
router.get('/details', Controller.GET_detailPage)

router.route('/login')
    .get(validateToGetTrusteeLoginForm, TrusteeController.GET_loginForm)
    .post(TrusteeController.POST_login)

router.route('/login-admin')
    .get(validateToGetAdminLoginForm, AdminController.GET_loginForm)
    .post(AdminController.POST_login)

router.route('/add-admin-hehe')
    .get(AdminController.GET_registerForm)
    .post(AdminController.POST_newAdmin)

router.use('/trustee', trusteeRoutes)

router.use('/admin', adminRoutes)

module.exports = {mainRoutes: router}