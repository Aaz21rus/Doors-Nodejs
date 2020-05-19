const fs = require('fs')
const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.post('/product/add', (req, res) => {
  const product = new Product()

  Object.keys(req.body).map(key => {
    if (key !== 'image') {
      product[key] = req.body[key]
    }
  })

  const imageName = 'product_' + (new Date()).getTime() + '.' + req.body.imageExt

  // Save file to disk
  if (req.body.imageData && req.body.imageExt) {
    fs.writeFile(
      'storage/products/' + imageName,
      req.body.imageData,
      'binary',
      err => {
        if (err) throw err;
        console.log('The file has been saved!');
      }
    )
  }

  product['image'] = imageName

  product.save(function(err) {
    res.send(200)
  })
})

module.exports = router
