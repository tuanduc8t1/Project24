"use strict";

var Cart = require("../../models/cart.model");

var Product = require("../../models/product.model"); // [GET] /cart/


module.exports.index = function _callee(req, res) {
  var cart, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, infoProduct;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Cart.findOne({
            _id: req.cookies.cartId
          }));

        case 2:
          cart = _context.sent;
          cart.totalPrice = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 7;
          _iterator = cart.products[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 21;
            break;
          }

          item = _step.value;
          _context.next = 13;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: item.product_id
          }).select("thumbnail title price discountPercentage stock slug"));

        case 13:
          infoProduct = _context.sent;
          infoProduct.priceNew = (infoProduct.price * (100 - infoProduct.discountPercentage) / 100).toFixed(0);
          infoProduct.totalPrice = infoProduct.priceNew * item.quantity;
          cart.totalPrice += infoProduct.totalPrice;
          item.infoProduct = infoProduct;

        case 18:
          _iteratorNormalCompletion = true;
          _context.next = 9;
          break;

        case 21:
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 27:
          _context.prev = 27;
          _context.prev = 28;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 30:
          _context.prev = 30;

          if (!_didIteratorError) {
            _context.next = 33;
            break;
          }

          throw _iteratorError;

        case 33:
          return _context.finish(30);

        case 34:
          return _context.finish(27);

        case 35:
          res.render("client/pages/cart/index", {
            pageTitle: "Giỏ hàng",
            cartDetail: cart
          });

        case 36:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 23, 27, 35], [28,, 30, 34]]);
}; // [POST] /cart/add/:productId


module.exports.addPost = function _callee2(req, res) {
  var productId, quantity, cartId, cart, existProductInCart, quantityUpdate, objectCart;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          productId = req.params.productId;
          quantity = parseInt(req.body.quantity);
          cartId = req.cookies.cartId;
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Cart.findOne({
            _id: cartId
          }));

        case 6:
          cart = _context2.sent;
          existProductInCart = cart.products.find(function (item) {
            return item.product_id == productId;
          });

          if (!existProductInCart) {
            _context2.next = 14;
            break;
          }

          quantityUpdate = existProductInCart.quantity + quantity;
          _context2.next = 12;
          return regeneratorRuntime.awrap(Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
          }, {
            $set: {
              "products.$.quantity": quantityUpdate
            }
          }));

        case 12:
          _context2.next = 17;
          break;

        case 14:
          objectCart = {
            product_id: productId,
            quantity: quantity
          };
          _context2.next = 17;
          return regeneratorRuntime.awrap(Cart.updateOne({
            _id: cartId
          }, {
            $push: {
              products: objectCart
            }
          }));

        case 17:
          req.flash("success", "Đã thêm sản phẩm vào giỏ hàng.");
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](3);
          req.flash("error", "Thêm sản phẩm vào giỏ hàng không thành công!");

        case 23:
          res.redirect("back");

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 20]]);
}; // [GET] /cart/delete/:productId


module.exports.deleteItem = function _callee3(req, res) {
  var productId, cartId;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          productId = req.params.productId;
          cartId = req.cookies.cartId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Cart.updateOne({
            _id: cartId
          }, {
            $pull: {
              products: {
                product_id: productId
              }
            }
          }));

        case 4:
          req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng!");
          res.redirect("back");

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // [GET] /cart/update/:productId/:quantity


module.exports.updateItem = function _callee4(req, res) {
  var productId, quantity, cartId;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          productId = req.params.productId;
          quantity = parseInt(req.params.quantity);
          cartId = req.cookies.cartId;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
          }, {
            $set: {
              "products.$.quantity": quantity
            }
          }));

        case 5:
          req.flash("success", "Cập nhật sản phẩm thành công!");
          res.redirect("back");

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};
//# sourceMappingURL=cart.controller.dev.js.map
