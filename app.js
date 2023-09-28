const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const { mainRoutes } = require('./routes')

const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(process.cwd(), 'public')))
app.use(session({
    secret: 'tikus got',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
    }
}))


//middleware!
app.use((req, res, next) => {
    console.log(req.session)
    next()
})

app.use('/', mainRoutes)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}, url: http://localhost:${PORT}`)
})