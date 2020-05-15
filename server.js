const express = require('express')
const app = express()



const mongoose = require('mongoose')
const User = require('./models/User')

const { dbUrl, dbName } = require('./consts')
mongoose.connect(`${dbUrl}/${dbName}`, { useNewUrlParser: true })
const db = mongoose.connection

db.once('open', function() {
  const user = new User()

  user.name = 'Vasya'
  user.email = 'vasya@mail.ru'
  user.password = 'vasya'

  user.save()
})



app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => res.render('pages/index'))
app.get('/catalog', (req, res) => res.render('pages/catalog'))
app.get('/card', (req, res) => res.render('pages/card'))
app.get('/basket', (req, res) => res.render('pages/basket'))
app.get('/company', (req, res) => res.render('pages/company'))

app.listen(4000, () => console.log(`Example app listening at http://localhost:4000`))
