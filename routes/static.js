const express = require('express')
const router = express.Router()

// Public routes
router.get('/', (req, res) => res.render('pages/index'))
router.get('/catalog', (req, res) => res.render('pages/catalog'))
router.get('/card', (req, res) => res.render('pages/card'))
router.get('/basket', (req, res) => res.render('pages/basket'))
router.get('/company', (req, res) => res.render('pages/company'))

// Admin routes
router.get('/admin', (req, res) => res.render('admin/index'))

module.exports = router
