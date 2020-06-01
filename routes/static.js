const express = require('express')
const router = express.Router()
const isLogged = require('../middlewares/isLogged')

const Product = require('../models/Product')
const User = require('../models/User')

// Public routes
router.get('/', (req, res) => {
  Product.find({ title: 'asdf' }, (err, docs) => {
    if (err) throw err
    res.render('public/index', { tempSrc: '/storage/products/' + docs[0].image })
  })
})

router.get('/catalog', (req, res) => res.render('public/catalog'))
router.get('/card', (req, res) => res.render('public/card'))
router.get('/basket', (req, res) => res.render('public/basket'))
router.get('/company', (req, res) => res.render('public/company'))

router.get('/register', (req, res) => res.render('public/register'))
router.post('/register', (req, res) => {
  const user = new User()

  Object.keys(req.body).map(key => user[key] = req.body[key])

  user.save(err => {
    if (err) throw err
    res.redirect('/login')
  })
})

router.get('/login', (req, res) => res.render('public/login'))
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err
// debugger
    if (!user) {
      res.redirect('/login')
    } else {
      if (!res.session) {
        res.redirect('/login')
      } else {
        if (user.password === req.body.password) {
          res.session.email = req.body.email
          res.redirect('/admin')
        } else {
          res.redirect('/login')
        }
      }
    }
  })
})

// Admin routes
router.get('/admin', isLogged, (req, res) => res.render('admin/index'))

module.exports = router
