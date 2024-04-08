"use strict";

var mongoose = require('mongoose');

module.exports.connect = function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGO_URL));

        case 3:
          console.log("Kết nối Database thành công!");
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log("Kết nối Database thất bại!");
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};
//# sourceMappingURL=database.dev.js.map
