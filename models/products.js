const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
    default: "0",
  },
  imageURL: {
    type: String,
    required: false,
    default: "",
  },
  fileName: {
    type: String,
    required: false,
    default: "",
  },
  pathStorage: {
    type: String,
    required: false,
    default: "",
  }
});

module.exports = mongoose.model('product', userSchema);
