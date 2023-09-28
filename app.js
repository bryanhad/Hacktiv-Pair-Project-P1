const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')
const Controller = require('./controllers/controller')
const TrusteeController = require('./controllers/TrusteeController')
const AdminController = require('./controllers/adminController')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(process.cwd(), 'public')));


app.get('/', Controller.GET_homePage)

app.route('/login')
    .get(TrusteeController.GET_loginForm)

app.route('/login-admin')
    .get(AdminController.GET_loginForm)
    .post(AdminController.POST_loginForm)

app.get('/admin', AdminController.GET_homePage)

app.route('/admin/add-trustee')
    .get(TrusteeController.GET_registerForm)
    .post()


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}, url: http://localhost:${PORT}`)
})