const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FarmerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  Order: {
    product: [],
    quantity: {
      type: Number,
    },
    Status: {
      type: String,
    },
    Date: {
      type: Date,
      default: Date.now,
    },
  },
  Active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Farmer', FarmerSchema);
