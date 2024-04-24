"use strict";

var mongoose = require("mongoose");

var cartSchema = new mongoose.Schema({
  products: [{
    product_id: String,
    quantity: Number
  }]
}, {
  timestamps: true
});
var Cart = mongoose.model("Cart", cartSchema, "carts");
module.exports = Cart;
//# sourceMappingURL=cart.model.dev.js.map
