const express = require('express')
const os = require('os')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const formData = require('express-form-data')
const isLogged = require('./middlewares/isLogged')
require('dotenv').config()


// DB
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
const mongooseDB = mongoose.connection

// View Engine
app.set('view engine', 'pug')

// Middlware
app.use(bodyParser())
app.use(formData.parse({ uploadDir: os.tmpdir(), autoClean: true }))
app.use(express.static('public'))
app.use(session({
  secret: 'our_secret',
  store: new MongoStore({ mongooseConnection: mongooseDB }),
  resave: false,
  saveUninitialized: true
}))

// Routes
app.use('/', require('./routes/static'))
app.use('/', require('./routes/login'))
app.use('/', require('./routes/register'))
app.use('/api', isLogged, require('./routes/api'))

// Listen
app.listen(4000, () => console.log(`Example app listening at http://localhost:4000`))
