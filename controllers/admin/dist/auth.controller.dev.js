"use strict";

var md5 = require("md5");

var Account = require("../../models/account.model");

var systemConfig = require("../../config/system"); // [GET] /admin/auth/login


module.exports.login = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("admin/pages/auth/login", {
            pageTitle: "Đăng nhập"
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}; // [POST] /admin/auth/login


module.exports.loginPost = function _callee2(req, res) {
  var email, password, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body.email;
          password = req.body.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Account.findOne({
            email: email,
            deleted: false
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          req.flash("error", "Email không tồn tại!");
          res.redirect("back");
          return _context2.abrupt("return");

        case 9:
          if (!(md5(password) != user.password)) {
            _context2.next = 13;
            break;
          }

          req.flash("error", "Sai mật khẩu!");
          res.redirect("back");
          return _context2.abrupt("return");

        case 13:
          if (!(user.status != "active")) {
            _context2.next = 17;
            break;
          }

          req.flash("error", "Tài khoản đang bị khóa!");
          res.redirect("back");
          return _context2.abrupt("return");

        case 17:
          res.cookie("token", user.token);
          res.redirect("/".concat(systemConfig.prefixAdmin, "/dashboard"));

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // [GET] /admin/auth/logout


module.exports.logout = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.clearCookie("token");
          res.redirect("/".concat(systemConfig.prefixAdmin, "/auth/login"));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};
//# sourceMappingURL=auth.controller.dev.js.map
