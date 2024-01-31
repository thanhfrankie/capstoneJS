var cart = [];

function turnOnLoading() {
  document.getElementById("loading").style.display = "block";
}

function turnOffLoading() {
  document.getElementById("loading").style.display = "none";
}

function renderCart() {
  var contentHTML = "";
  var totalPayment = 0;

  cart.forEach(function (item, index) {
    var totalPrice = item.quantity * item.cartPrice;
    totalPayment += totalPrice;

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
          <td>${totalPrice}</td>
          <td>
            <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
            <button class="btn btn-success" onclick="checkoutSingleItem(${index})">Thanh toán</button>
          </td>
        </tr>
    `;
    contentHTML += trString;
  });
  document.getElementById("tblDanhSachGioHang").innerHTML = contentHTML;
  document.getElementById("totalPrice").innerHTML = totalPayment;
}

function updateCartCount() {
  var cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").innerText = cartCount;
}

// function addToCart(id) {
//   axios
//     .get(`https://65a5f6af74cf4207b4ef0eda.mockapi.io/product/${id}`)
//     .then(function (res) {
//       var detailItem = res.data;
//       var cartItem = {
//         id: detailItem.id,
//         cartName: detailItem.name,
//         quantity: 1,
//         cartPrice: detailItem.price,
//       };

//       var existingItemIndex = cart.findIndex(
//         (item) => item.id === cartItem.id
//       );

//       if (existingItemIndex !== -1) {
//         cart[existingItemIndex].quantity += 1;
//       } else {
//         cart.push(cartItem);
//       }

//       localStorage.setItem("cart", JSON.stringify(cart));
//       updateCartCount();
//       renderCart();
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

}

function checkoutSingleItem(index) {
  var item = cart[index];
  var totalPrice = item.quantity * item.cartPrice;
  alert(`Thanh toán thành công cho ${item.cartName} với tổng giá ${totalPrice}`);
  removeFromCart(index);
  location.reload()
}

// function checkout() {
//   var totalPayment = cart.reduce((total, item) => total + item.quantity * item.cartPrice, 0);
  
//   if (totalPayment === 0) {
//     alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
//     return;
//   }


//   cart = [];
//   localStorage.setItem("cart", JSON.stringify(cart));
//   updateCartCount();
//   renderCart();
//   alert(`Thanh toán thành công cho toàn bộ giỏ hàng với tổng giá ${totalPayment}`);
// }

// Load giỏ hàng từ LocalStorage khi trang được tải
window.onload = function () {
  var storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    renderCart();
    updateCartCount();
  }
};
function search() {
  var searchInput = document.getElementById("search").value.trim().toLowerCase();
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  var filteredItems = cartItems.filter(function (item) {
    return item.cartName.toLowerCase().includes(searchInput);
  });

  renderCart(filteredItems);
}