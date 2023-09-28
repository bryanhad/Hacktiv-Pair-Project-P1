const express = require('express')
const AdminController = require('../controllers/adminController')
const TrusteeController = require('../controllers/TrusteeController')
const router = express.Router()

router.use((req, res, next) => {
    if (!req.session.adminUsername) {
        const errorMsg = 'You need to login as an admin!'
        return res.redirect(`/login-admin?error=${errorMsg}`)
    }
    next()
})

router.get('/', AdminController.GET_homePage)

router.route('/add-trustee')
    .get(TrusteeController.GET_registerForm)
    .post(TrusteeController.POST_registerForm)

router.get('/logout', AdminController.GET_logout)


module.exports = {adminRoutes: router}