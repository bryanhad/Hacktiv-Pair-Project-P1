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

app.get('/details', Controller.GET_detailsPage)

app.get('/details-trustee', Controller.GET_trusteeDetailsPage)

app.get('/details-trustee/form-addCreditor', Controller.GET_formAddCreditor)

app.post('/details-trustee/form-addCreditor', Controller.POST_formAddCreditor)

app.get('/details-trustee/:id/creditors/:creditorId/edit', Controller.GET_editFormCreditor)

app.post('/details-trustee/:id/creditors/:creditorId/edit', Controller.POST_editFormCreditor)

app.get('/details-trustee/:id/creditors/:creditorsId/delete', Controller.deleteCreditor)


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