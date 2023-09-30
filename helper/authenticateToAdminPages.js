module.exports = function authenticateToAdminPages(req, res, next) {
    if (!req.session.user) {
        const errorMsg = 'You need to login as an Admin LOHZ!'
        return res.redirect(`/login?error=${errorMsg}`)
    }
    if (!req.session.user.isAdmin) {
        const errorMsg = 'You have logged in as a Kurator LOHZ!'
        return res.redirect(`/admin?error=${errorMsg}`)
    }
    next()
}