const express = require('express')
const router = express.Router()
const User = require('../models/User')

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/register', (req, res) => res.render('public/register'))

router.post('/register', async (req, res) => {
  const user = new User()

  // Save all fields
  Object.keys(req.body).map(key => user[key] = req.body[key])

  // Hashing password
  const salt = await bcrypt.genSalt(saltRounds)
  user.password = await bcrypt.hash(req.body.password, salt)

  // User save
  user.save(err => {
    if (err) throw err
    res.redirect('/login')
  })
})

module.exports = router
