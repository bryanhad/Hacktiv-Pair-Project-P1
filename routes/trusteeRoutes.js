const express = require('express')
const TrusteeController = require('../controllers/TrusteeController')
const router = express.Router()

router.use((req, res, next) => {
    if (!req.session.trusteeUsername) {
        const errorMsg = 'You need to login as a kurator!'
        return res.redirect(`/login?error=${errorMsg}`)
    }
    next()
})

router.get('/', TrusteeController.GET_homePage)

router.get('/logout', TrusteeController.GET_logout)

module.exports = {trusteeRoutes: router}