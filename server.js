const express = require('express')
const os = require('os')
const app = express()
const router = express.Router()
const session = require('express-session')
const bodyParser = require('body-parser')
const formData = require('express-form-data')
const isLogged = require('./middlewares/isLogged')


// DB

const mongoose = require('mongoose')

const { dbUrl, dbName } = require('./consts')
mongoose.connect(`${dbUrl}/${dbName}`, { useNewUrlParser: true })
const db = mongoose.connection


// View Engine

app.set('view engine', 'pug')


// Middlware

app.use(bodyParser())
app.use(formData.parse({ uploadDir: os.tmpdir(), autoClean: true }))
app.use(express.static('public'))
app.use(session({ secret: 'our_secret', resave: false, saveUninitialized: true }))

// Check login status middleware


// Routes

app.use('/', require('./routes/static'))
app.use('/api', isLogged, require('./routes/api'))


// Listen

app.listen(4000, () => console.log(`Example app listening at http://localhost:4000`))
