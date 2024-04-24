"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Product = require("../../models/product.model");

var ProductCategory = require("../../models/product-category.model"); // [GET] /products/


module.exports.index = function _callee(req, res) {
  var products, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Product.find({
            status: "active",
            deleted: false
          }).sort({
            position: "desc"
          }));

        case 2:
          products = _context.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 6;

          for (_iterator = products[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            item = _step.value;
            item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
          }

          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](6);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 14:
          _context.prev = 14;
          _context.prev = 15;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 17:
          _context.prev = 17;

          if (!_didIteratorError) {
            _context.next = 20;
            break;
          }

          throw _iteratorError;

        case 20:
          return _context.finish(17);

        case 21:
          return _context.finish(14);

        case 22:
          res.render("client/pages/products/index", {
            pageTitle: "Danh sách sản phẩm",
            products: products
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 10, 14, 22], [15,, 17, 21]]);
}; // [GET] /products/:slugCategory


module.exports.category = function _callee2(req, res) {
  var slugCategory, category, getSubCategory, listSubCategory, listIdSubCategory, products, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item;

  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          slugCategory = req.params.slugCategory;
          _context3.next = 3;
          return regeneratorRuntime.awrap(ProductCategory.findOne({
            slug: slugCategory,
            deleted: false,
            status: "active"
          }));

        case 3:
          category = _context3.sent;

          getSubCategory = function getSubCategory(parent_id) {
            var allSubs, listSub, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, sub, childs;

            return regeneratorRuntime.async(function getSubCategory$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    allSubs = [];
                    _context2.next = 3;
                    return regeneratorRuntime.awrap(ProductCategory.find({
                      parent_id: parent_id,
                      deleted: false,
                      status: "active"
                    }).select("id title"));

                  case 3:
                    listSub = _context2.sent;
                    allSubs = _toConsumableArray(listSub);
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context2.prev = 8;
                    _iterator2 = listSub[Symbol.iterator]();

                  case 10:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                      _context2.next = 19;
                      break;
                    }

                    sub = _step2.value;
                    _context2.next = 14;
                    return regeneratorRuntime.awrap(getSubCategory(sub.id));

                  case 14:
                    childs = _context2.sent;
                    allSubs = allSubs.concat(childs);

                  case 16:
                    _iteratorNormalCompletion2 = true;
                    _context2.next = 10;
                    break;

                  case 19:
                    _context2.next = 25;
                    break;

                  case 21:
                    _context2.prev = 21;
                    _context2.t0 = _context2["catch"](8);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context2.t0;

                  case 25:
                    _context2.prev = 25;
                    _context2.prev = 26;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }

                  case 28:
                    _context2.prev = 28;

                    if (!_didIteratorError2) {
                      _context2.next = 31;
                      break;
                    }

                    throw _iteratorError2;

                  case 31:
                    return _context2.finish(28);

                  case 32:
                    return _context2.finish(25);

                  case 33:
                    return _context2.abrupt("return", allSubs);

                  case 34:
                  case "end":
                    return _context2.stop();
                }
              }
            }, null, null, [[8, 21, 25, 33], [26,, 28, 32]]);
          };

          _context3.next = 7;
          return regeneratorRuntime.awrap(getSubCategory(category.id));

        case 7:
          listSubCategory = _context3.sent;
          listIdSubCategory = listSubCategory.map(function (item) {
            return item.id;
          });
          _context3.next = 11;
          return regeneratorRuntime.awrap(Product.find({
            product_category_id: {
              $in: [category.id].concat(_toConsumableArray(listIdSubCategory))
            },
            deleted: false,
            status: "active"
          }).sort({
            position: "desc"
          }));

        case 11:
          products = _context3.sent;
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context3.prev = 15;

          for (_iterator3 = products[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            item = _step3.value;
            item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
          }

          _context3.next = 23;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](15);
          _didIteratorError3 = true;
          _iteratorError3 = _context3.t0;

        case 23:
          _context3.prev = 23;
          _context3.prev = 24;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 26:
          _context3.prev = 26;

          if (!_didIteratorError3) {
            _context3.next = 29;
            break;
          }

          throw _iteratorError3;

        case 29:
          return _context3.finish(26);

        case 30:
          return _context3.finish(23);

        case 31:
          res.render("client/pages/products/index", {
            pageTitle: category.title,
            products: products
          });

        case 32:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[15, 19, 23, 31], [24,, 26, 30]]);
}; // [GET] /products/detail/:slug


module.exports.detail = function _callee3(req, res) {
  var slug, product, category;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          slug = req.params.slug;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            slug: slug,
            deleted: false,
            status: "active"
          }));

        case 3:
          product = _context4.sent;

          if (!product) {
            _context4.next = 13;
            break;
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(ProductCategory.findOne({
            _id: product.product_category_id,
            deleted: false,
            status: "active"
          }));

        case 7:
          category = _context4.sent;
          product.category = category;
          product.priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
          res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
          });
          _context4.next = 14;
          break;

        case 13:
          res.redirect("/");

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
};
//# sourceMappingURL=product.controller.dev.js.map
