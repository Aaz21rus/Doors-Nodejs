const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/login', (req, res) => {
  if (!req.session.email) {
    res.render('public/login')
  } else {
    res.redirect('/admin')
  }
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err

    if (!user) return res.redirect('/login')

    if (!req.session) {
      res.redirect('/login')
    } else {
      if (user.password === req.body.password) {
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
