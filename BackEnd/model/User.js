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
    items: [
      {
        user_id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        product_id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
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
