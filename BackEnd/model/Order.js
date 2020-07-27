const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // Order: {
    farmer_id: {
      type: String,
    },
    products: [Object],
    total_price: {
      type: Number,
    },
    status: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // },
  }
);

module.exports = mongoose.model('Order', OrderSchema);
