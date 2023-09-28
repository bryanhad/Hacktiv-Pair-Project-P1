const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const TrusteeController = require('../controllers/TrusteeController')
const AdminController = require('../controllers/adminController')
const { adminRoutes } = require('./adminRoutes')
const { trusteeRoutes } = require('./trusteeRoutes')

router.get('/', Controller.GET_homePage)

router.route('/login')
    .get(TrusteeController.GET_loginForm)
    .post(TrusteeController.POST_login)

router.route('/login-admin')
    .get(AdminController.GET_loginForm)
    .post(AdminController.POST_login)

router.route('/add-admin-hehe')
    .get(AdminController.GET_registerForm)
    .post(AdminController.POST_newAdmin)

router.use('/trustee', trusteeRoutes)

router.use('/admin', adminRoutes)

module.exports = {mainRoutes: router}