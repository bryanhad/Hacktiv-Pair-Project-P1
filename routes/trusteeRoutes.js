const express = require('express')
const TrusteeController = require('../controllers/TrusteeController')
const CreditorController = require('../controllers/creditorController')
const router = express.Router()

router.use((req, res, next) => {
    if (!req.session.user) {
        const errorMsg = 'You need to login as a kurator'
        return res.redirect(`/login?error=${errorMsg}`)
    }
    if (req.session.user.isAdmin) {
        const errorMsg = 'You have logged in as an Admin'
        return res.redirect(`/admin?error=${errorMsg}`)
    }
    next()
})

router.get('/', TrusteeController.GET_homePage)

router.route('/add-creditor')
    .get(CreditorController.GET_form)
    .post(CreditorController.POST_newCreditor)

router.get('/delete-creditor/:creditorId', CreditorController.GET_deleteCreditor)

router.get('/edit-creditor/:creditorId', CreditorController.GET_formEditCreditor)

router.get('/logout', TrusteeController.GET_logout)

module.exports = {trusteeRoutes: router}