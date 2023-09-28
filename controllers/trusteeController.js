const {Trustee, Profile} = require('../models')
const bcrypt = require('bcryptjs')

class TrusteeController {

    static GET_homePage(req, res) {
        const {error} = req.query
        res.render('trusteePages/homePage', {error})
    }

    static GET_loginForm(req, res) {
        if (req.session.adminUsername) { //Ga boleh ke form login Kurator kalo udah login sbg Admin
            const errorMsg = 'You have logged in as an Admin!'
            return res.redirect(`/admin?error=${errorMsg}`)
        }
        if (req.session.trusteeUsername) { //Ga boleh ke form login Kurator kalo emang udah login
            const errorMsg = 'You have logged in!'
            return res.redirect(`/trustee?error=${errorMsg}`)
        }

        const {error, username} = req.query

        res.render('trusteePages/loginForm', {username, error})
    }

    static POST_login(req, res) {
        const {username, password} = req.body

        Trustee.findOne({where: {username}})
            .then(trustee => {
                const errorMsg = 'Invalid username or password'
                
                if (!trustee) return res.redirect(`/login?username=${username}&error=${errorMsg}`)
                
                const isValid = bcrypt.compareSync(password, trustee.password)

                if (!isValid) return res.redirect(`/login?username=${username}&error=${errorMsg}`)

                // valid trustee!
                req.session.trusteeUsername = trustee.username
                
                res.redirect('/trustee')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static GET_registerForm(req, res) {
        res.render('trusteePages/registerForm')
    }

    static POST_registerForm(req, res) {
        const {username, firstName, lastName, email, phone, domicile, password} = req.body

        Profile.create({firstName, lastName, phone, domicile})
            .then(createdProfile => {
                const AdminId = 1
                const ProfileId = createdProfile.id
                return Trustee.create({username, email, password, AdminId, ProfileId})
            })
            .then(createdTrustee => {
                res.send(createdTrustee)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static GET_logout(req, res) {
        if (req.session.adminUsername) { 
            const errorMsg = 'lah kan lu udah admin?!'
            return res.redirect(`/admin?error=${errorMsg}`)
        }

        req.session.destroy(err => {
            if (err) return res.send(err)
            res.redirect('/')
        })
    }


}

module.exports = TrusteeController