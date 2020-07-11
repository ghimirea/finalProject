const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  Product: [
    {
      type: {
        type: String,
      },
      product_name: {
        type: String,
        required: true,
      },
      quantity_in_lb: {
        type: Number,
        required: true,
      },
      price_per_lb: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Product', ProductSchema);
