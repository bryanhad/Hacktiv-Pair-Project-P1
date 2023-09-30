const {Admin} = require('../models')
const bcrypt = require('bcryptjs')

class AdminController {
    static GET_homePage(req, res) {
        const {error} = req.query
        const { user } = req.session

        res.render('adminPages/homePage', {error, user})
    }

    static GET_loginForm(req, res) {
        if (req.session.trusteeUsername) { //Ga boleh ke form login Admin kalo udah login sbg Kurator
            const errorMsg = 'You have logged in as a Kurator!'
            return res.redirect(`/trustee?error=${errorMsg}`)
        }

        const {error, username} = req.query

        res.render('adminPages/loginForm', {error, username, inLogin:true})
    }

    static POST_login(req, res) {
        const {username, password} = req.body

        Admin.findOne({where: {username}})
            .then(admin => {
                const errorMsg = 'Invalid username or password'
                
                if (!admin) return res.redirect(`/login-admin?username=${username}&error=${errorMsg}`)
                
                const isValid = bcrypt.compareSync(password, admin.password)

                if (!isValid) return res.redirect(`/login-admin?username=${username}&error=${errorMsg}`)

                // valid admin!
                req.session.user = {
                    username: admin.username,
                    profilePicture: admin.imageUrl,
                    isAdmin: true
                }
                
                res.redirect('/admin')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static GET_registerForm(req, res) {
        res.render('adminPages/registerForm')
    }

    static POST_newAdmin(req, res) {
        Admin.create(req.body)
            .then(newAdmin => {
                res.send(newAdmin)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
        // res.render('adminPages/registerForm')
    }

    static GET_logout(req, res) {
        if (req.session.trusteeUsername) { 
            const errorMsg = 'weh kan lu udah login sebagai kurator?!'
            return res.redirect(`/trustee?error=${errorMsg}`)
        }

        req.session.destroy(err => {
            if (err) return res.send(err)
            res.redirect('/')
        })
    }

}

module.exports = AdminController