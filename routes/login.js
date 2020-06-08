const express = require('express')
const router = express.Router()
const User = require('../models/User')

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/login', (req, res) => {
  if (!req.session.email) {
    res.render('public/login')
  } else {
    res.redirect('/admin')
  }
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) throw err

    if (!user) return res.redirect('/login')

    if (!req.session) {
      res.redirect('/login')
    } else {
      const isValid = await bcrypt.compare(req.body.password, user.password)

      if (isValid) {
        req.session.email = req.body.email
        res.redirect('/admin')
      } else {
        res.redirect('/login')
      }
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  return res.redirect('/')
})

module.exports = router
