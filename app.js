const express = require('express')
const path = require("path")
var bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}))

const routes = require('./routes/main')
app.use('/', routes)




//Listening to 3000
app.listen(3000, err => {
    if (err) throw err
    console.log("Listening on 3000")
})