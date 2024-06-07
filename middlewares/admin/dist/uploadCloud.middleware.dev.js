"use strict";

var cloudinary = require('cloudinary').v2;

var streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.uploadSingle = function (req, res, next) {
  if (req.file) {
    var upload = function upload(req) {
      var result;
      return regeneratorRuntime.async(function upload$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(streamUpload(req));

            case 2:
              result = _context.sent;
              req.body[req.file.fieldname] = result.url;
              next();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    var streamUpload = function streamUpload(req) {
      return new Promise(function (resolve, reject) {
        var stream = cloudinary.uploader.upload_stream(function (error, result) {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    upload(req);
  } else {
    next();
  }
};
//# sourceMappingURL=uploadCloud.middleware.dev.js.map
