const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

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

// Admin routes
router.get('/admin', (req, res) => res.render('admin/index'))

module.exports = router
