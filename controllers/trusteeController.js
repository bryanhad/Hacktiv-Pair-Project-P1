const {Trustee, Profile} = require('../models')
const bcrypt = require('bcryptjs')

class TrusteeController {

    static GET_homePage(req, res) {
        const {error} = req.query
        const { user } = req.session

        res.render('trusteePages/homePage', {error, user})
    }

    static GET_loginForm(req, res) {
        const {error, username} = req.query

        res.render('trusteePages/loginForm', {username, error, inLogin:true})
    }

    static POST_login(req, res) {
        const {username, password} = req.body

        Trustee.findOne({where: {username}, include:{model: Profile}})
            .then(trustee => {
                const errorMsg = 'Invalid username or password'
                
                if (!trustee) return res.redirect(`/login?username=${username}&error=${errorMsg}`)
                
                const isValid = bcrypt.compareSync(password, trustee.password)

                if (!isValid) return res.redirect(`/login?username=${username}&error=${errorMsg}`)

                // valid trustee!
                req.session.user = {
                    username: trustee.username,
                    profilePicture: trustee.profilePicture,
                    isAdmin: false
                }
                
                res.redirect('/details')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static GET_registerForm(req, res) {
        const { user } = req.session

        res.render('trusteePages/registerForm', {user})
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
                res.redirect('/admin')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static GET_logout(req, res) {
        req.session.destroy(err => {
            if (err) return res.send(err)
            res.redirect('/')
        })
    }


}

module.exports = TrusteeController