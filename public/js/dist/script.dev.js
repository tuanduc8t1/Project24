"use strict";

// show-alert
var showAlert = document.querySelector("[show-alert]");

if (showAlert) {
  var time = showAlert.getAttribute("data-time");
  time = parseInt(time); // Sau time giây sẽ đóng thông báo

  setTimeout(function () {
    showAlert.classList.add("alert-hidden");
  }, time); // Khi click vào nút close-alert sẽ đóng luôn

  var closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", function () {
    showAlert.classList.add("alert-hidden");
  });
} // End show-alert
// Update Cart


var tableCart = document.querySelector("[table-cart]");

if (tableCart) {
  var listInputQuantity = tableCart.querySelectorAll("input[name='quantity']");
  listInputQuantity.forEach(function (input) {
    input.addEventListener("change", function () {
      var quantity = input.value;
      var productId = input.getAttribute("item-id");
      window.location.href = "/cart/update/".concat(productId, "/").concat(quantity);
    });
  });
} // End Update Cart
//# sourceMappingURL=script.dev.js.map
