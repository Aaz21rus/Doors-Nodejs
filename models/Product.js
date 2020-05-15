const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Product', new Schema({
  title: String,
  vendorCode: String,
  price: Number,
  priceAll: Number,
  // dimensions: [ String ],
  // color: [ String ],
  manufacturer: String,
  material: String,
  appearance: String,
  glass: String,
  thickness: Number,
  countInPackage: Number
}))
