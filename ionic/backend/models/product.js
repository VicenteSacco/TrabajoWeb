const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  unidades: {
    type: Number,
    required: true
  },
  features: [{
    type: String
  }],
  image: {
    type: String,
    required: true
  },
  price2: {
    type: Number,
    default: 0
  }
}, {
  collection: 'productos'
});

const Product = mongoose.model('productos', productSchema);

module.exports = Product;