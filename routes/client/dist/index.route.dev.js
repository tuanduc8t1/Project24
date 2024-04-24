"use strict";

var homeRoutes = require("./home.route");

var productRoutes = require("./product.route");

var searchRoutes = require("./search.route");

var cartRoutes = require("./cart.route");

var categoryMiddleware = require("../../middlewares/client/category.middleware");

var cartMiddleware = require("../../middlewares/client/cart.middleware");

module.exports = function (app) {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cart);
  app.use("/", homeRoutes);
  app.use("/products", productRoutes);
  app.use("/search", searchRoutes);
  app.use("/cart", cartRoutes);
};
//# sourceMappingURL=index.route.dev.js.map
