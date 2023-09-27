const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => res.render('homePage'))

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}, url: http://localhost:${PORT}`)
})