"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../../controllers/client/cart.controller");

router.post("/add/:productId", controller.addPost);
module.exports = router;
//# sourceMappingURL=cart.route.dev.js.map
