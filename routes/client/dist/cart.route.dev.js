"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../../controllers/client/cart.controller");

router.get("/", controller.index);
router.post("/add/:productId", controller.addPost);
router.get("/delete/:productId", controller.deleteItem);
router.get("/update/:productId/:quantity", controller.updateItem);
module.exports = router;
//# sourceMappingURL=cart.route.dev.js.map
