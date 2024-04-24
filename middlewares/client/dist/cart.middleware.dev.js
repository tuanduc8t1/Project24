"use strict";

var Cart = require("../../models/cart.model");

module.exports.cart = function _callee(req, res, next) {
  var cart, _cart;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.cookies.cartId) {
            _context.next = 7;
            break;
          }

          cart = new Cart();
          _context.next = 4;
          return regeneratorRuntime.awrap(cart.save());

        case 4:
          res.cookie("cartId", cart.id);
          _context.next = 11;
          break;

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(Cart.findOne({
            _id: req.cookies.cartId
          }));

        case 9:
          _cart = _context.sent;
          res.locals.miniCart = _cart;

        case 11:
          next();

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};
//# sourceMappingURL=cart.middleware.dev.js.map
