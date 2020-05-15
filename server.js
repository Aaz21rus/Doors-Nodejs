const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')



const mongoose = require('mongoose')


const { dbUrl, dbName } = require('./consts')
mongoose.connect(`${dbUrl}/${dbName}`, { useNewUrlParser: true })
const db = mongoose.connection



app.set('view engine', 'pug')
app.use(bodyParser())
app.use(express.static('public'))

app.use('/', require('./routes/static'))
app.use('/api', require('./routes/api'))

app.listen(4000, () => console.log(`Example app listening at http://localhost:4000`))
