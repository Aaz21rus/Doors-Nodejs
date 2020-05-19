const express = require('express')
const os = require('os')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const formData = require('express-form-data')



const mongoose = require('mongoose')


const { dbUrl, dbName } = require('./consts')
mongoose.connect(`${dbUrl}/${dbName}`, { useNewUrlParser: true })
const db = mongoose.connection



app.set('view engine', 'pug')

app.use(bodyParser())
app.use(formData.parse({
  uploadDir: os.tmpdir(),
  autoClean: true
}))

app.use(express.static('public'))

app.use('/', require('./routes/static'))
app.use('/api', require('./routes/api'))

app.listen(4000, () => console.log(`Example app listening at http://localhost:4000`))
