class Controller {
    static GET_homePage(req, res) {
        const {error} = req.query
        const {trusteeUsername, adminUsername} = req.session

        res.render('homePage', {error, trustee:trusteeUsername, admin:adminUsername})
    }
}

module.exports = Controller