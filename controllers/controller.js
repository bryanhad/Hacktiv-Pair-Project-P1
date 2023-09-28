const { Blog, Creditor, Trustee } = require("../models")

class Controller {
    static GET_homePage(req, res) {
        const { error } = req.query
        const { trusteeUsername, adminUsername } = req.session

        Blog.findAll({
            include: {
                model: Trustee
            }
        })
            .then((blogs) => {
                return res.send(blogs)
                res.render("homePage", {
                    error,
                    blogs,
                    trustee: trusteeUsername,
                    admin: adminUsername,
                })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static GET_detailPage(req, res) {
        let creditorsArr

        Creditor.findAll({
            include: { model: Attorney, attributes: ["firstName", "lastName"] },
        })
            .then(creditors => {
                creditorsArr = creditors

                return Creditor.findAll({
                    attributes: [
                        [sequelize.fn("sum", sequelize.col("claimAmount")),"totalClaimAmount",],
                    ],
                })
            })
            .then(totalClaimAmount => {
                const totalClaimCreditors = totalClaimAmount[0].dataValues.totalClaimAmount

                res.render("", {
                    creditorsArr,
                    totalClaimCreditors,
                })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = Controller
