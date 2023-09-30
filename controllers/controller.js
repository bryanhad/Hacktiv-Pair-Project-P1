const numberToIDR = require("../helper/numberToIDR")
const { Blog, Creditor, Trustee, Profile, Attorney } = require("../models")
const sequelize = require('sequelize')
const { Op } = require("sequelize");

class Controller {
    static GET_homePage(req, res) {
        const { error } = req.query
        const { user } = req.session

        Blog.getAllWithDetail(Trustee, Profile)
            .then((blogs) => {
                // return res.send(blogs)
                res.render("homePage", {
                    error,
                    blogs,
                    user
                })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static GET_blogDetail(req, res) {
        const {blogId} = req.params
        const { user } = req.session

        const { trusteeUsername, adminUsername } = req.session

        Blog.getOneWithDetail(Trustee, Profile, blogId)
            .then(blog => {
                res.render('blogDetail', {blog,user, trustee: trusteeUsername, admin: adminUsername,})
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static GET_detailPage(req, res) {
        const {q} = req.query
        const { user } = req.session

        let creditors_outer
        let totalClaimAmount_outer
        let trusteeCount_outer

        const option = {
            include: { model: Attorney, attributes: ["firstName", "lastName"] },
        }
        if (q) {
            option.where = {[Op.or] : [
                {firstName: {[Op.iLike]: `%${q}%`}},
                {lastName: {[Op.iLike]: `%${q}%`}},
            ]}
        }

        Creditor.findAll(option)
            .then(creditors => {
                creditors_outer = creditors

                return Creditor.findAll({
                    attributes: [
                        [sequelize.fn("sum", sequelize.col("claimAmount")),"totalClaimAmount",],
                    ],
                })
            })
            .then(totalClaimAmount => {
                totalClaimAmount_outer = totalClaimAmount[0].dataValues.totalClaimAmount
                return Trustee.count()
            })
            .then(trusteeCount => {
                trusteeCount_outer = trusteeCount
                return Creditor.count()
            })
            .then(creditorCount => {
                const totalClaim = numberToIDR(Number(totalClaimAmount_outer))

                const summaries = [
                    {title:'Jumlah Kreditur',detail:creditorCount},
                    {title:'Jumlah Tagihan',detail: totalClaim},
                    {title:'Jumlah Kurator',detail:trusteeCount_outer},
                ]
                
                res.render("tableDetailPage", {
                    creditors: creditors_outer,
                    summaries,
                    user,
                    q
                })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = Controller
