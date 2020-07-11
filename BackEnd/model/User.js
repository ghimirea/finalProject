const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  Active: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    required: true,
  },
  cart: {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },
    items: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        price_per_lb: {
          type: Number,
        },
      },
    ],
    totalPrice: [
      {
        price: { type: Number, default: 0 },
      },
    ],
  },
});

module.exports = mongoose.model('User', UserSchema);
