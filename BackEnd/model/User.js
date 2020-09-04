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
    type: String,
    // default: 'true',
  },
  role: {
    type: String,
    required: true,
  },

  ratings: {
    thumbsUp: {
      type: Number,
      default: 0,
    },
    thumbsDown: {
      type: Number,
      default: 0,
    },

    comments: [],
  },


  cart: {
    items: [
      {
        farmer_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
        },
        prod_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
        },
        product_name: {
          type: String,
          required: true,
        },
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
