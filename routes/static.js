const express = require('express')
const router = express.Router()
const isLoggedMiddleware = require('../middlewares/isLogged')
const { isLogged } = require('../helpers')

// const Product = require('../models/Product')

// Public routes
router.get('/', (req, res) => {
  res.render('public/index', {
    isLogged: isLogged(req)
  })
})

// Public routes
router.get('/catalog', (req, res) => res.render('public/catalog'))
router.get('/card', (req, res) => res.render('public/card'))
router.get('/basket', (req, res) => res.render('public/basket'))
router.get('/company', (req, res) => res.render('public/company'))

// Admin routes
router.get('/admin', isLoggedMiddleware, (req, res) => res.render('admin/index'))

module.exports = router
