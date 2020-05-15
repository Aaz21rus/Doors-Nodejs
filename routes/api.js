const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.post('/product/add', (req, res) => {
  const product = new Product()

  Object.keys(req.body).map(key => {
    product[key] = req.body[key]
  })

  product.save(function(err) {
    res.send(200)
  })
})

module.exports = router
