var cart = [];

function turnOnLoading() {
  document.getElementById("loading").style.display = "block";
}

function turnOffLoading() {
  document.getElementById("loading").style.display = "none";
}

function renderCart(items) {
  var contentHTML = "";
  // var totalPayment = 0;

  items.forEach(function (item, index) {
    var totalPrice = item.quantity * item.cartPrice;
    // totalPayment += totalPrice;

    var trString = `
        <tr>
          <td>${index + 1}</td>
          <td>${item.cartName}</td>
          <td>
            <button class="btn btn-warning" onclick="decreaseQuantity(${index})">-</button>
            ${item.quantity}
            <button class="btn btn-primary" onclick="increaseQuantity(${index})">+</button>
          </td>
          <td>${item.cartPrice}</td>
          <td> ${totalPrice}</td>
          <td>
            <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
            <button class="btn btn-success" onclick="checkoutSingleItem(${index})">Thanh toán</button>
          </td>
        </tr>
    `;
    contentHTML += trString;
  });
  document.getElementById("tblDanhSachGioHang").innerHTML = contentHTML;

}

// function updateCartCount() {
//   var cartCount = cart.reduce((total, item) => total + item.quantity, 0);
//   document.getElementById("cartCount").innerHTML = cartCount;
// }

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(cart);
  }
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(cart);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  // updateCartCount();
}

function checkoutSingleItem(index) {
  var item = cart[index];
  var totalPrice = item.quantity * item.cartPrice;
  alert(
    `Thanh toán thành công cho ${item.cartName} với tổng giá ${totalPrice}`
  );
  removeFromCart(index);
}

window.onload = function () {
  var storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    renderCart(cart);
    // updateCartCount();
  }
};
function searchCart() {
  var searchInput = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  var filteredItems = cartItems.filter(function (item) {
    return item.cartName.toLowerCase().includes(searchInput);
  });
  console.log("first")
  renderCart(filteredItems);
}
