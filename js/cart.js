var cart = [];
console.log(cart);

function CartItem(
  id,
  cartName,
  quantity,
  botSoLuong,
  themSoLuong,
  cartPrice,
  cartCalPrice
) {
  this.id = id;
  this.cartName = cartName;
  this.quantity = quantity;
  this.cartPrice = cartPrice;
  this.botSoLuong = function () {
    quantity = quantity - 1;
    return quantity;
  };
  this.themSoLuong = function () {
    quantity = quantity + 1;
    return quantity;
  };
  this.cartCalPrice = function () {
    var finalPrice = quantity * cartPrice;
    return finalPrice;
  };
}
function layDuLieuLocal() {
  var dataJson = localStorage.getItem("cart");
  var cartList = JSON.parse(dataJson) || [];
  for (var i = 0; i < cartList.length; i++) {
    var data = cartList[i];
    var item = new CartItem(
      data.id,
      data.cartName,
      data.quantity,
      "",
      "",
      data.cartPrice,
      data.cartCalPrice
    );
    cart.push(item);
  }
  console.log(cart);
}
layDuLieuLocal(); //hieern thi danh sach gior hang
function renderCart(cartArr) {
  var contentHTML = "";
  cartArr.reverse().forEach(function (item, index) {
    console.log(item, "item");
    var trString = `
          <tr>
          <td>${index + 1}</td>
          <td>${item.cartName}</td>
          <td>
          <button onclick='botSoLuong(${item.id})'>-</button>
          ${item.quantity}
          <button onclick='themSoLuong(${item.id})'>+</button>
          </td>
          <td>${item.price}</td>
          <td>${item.cartCalPrice()}</td>
          <td>
          <button class="btn btn-danger" onclick='removeFromCart(${
            item.id
          })'>Delete</button>
          </td>
          </tr>
          `;
    contentHTML += trString;
  });
  document.getElementById("tblDanhSachGioHang").innerHTML = contentHTML;
}
renderCart(cart);

function deleteCartProduct(id) {
  var index;
  console.log(id);
  // layDuLieuLocal()
  var cartList = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  // var cartList = JSON.parse(localStorage.getItem("cart"));
  for (var i = 0; i < cartList.length; i++) {
    console.log(i);
    if (cartList[i].id == id) {
      console.log(i);
      index = i;
      console.log("🥶 - index:", index);
    }
  }
  console.log("🥶 - index:", index);
  cartList.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartList));
  //lay tu local => duyet => tao object CartItem
  // mang CartItem => truyen vao render
  //json & Class
  renderCart(cartList);
}
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    rendercart();
}
function timKiem() {
  console.log("first");
  var filterData = [];
  var cartList = JSON.parse(localStorage.getItem("cart"));
  console.log("🥶 - cartList:", cartList)
  var searchInput = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();
    console.log("🥶 - cart:", cart)
  filterData = cartList.filter((item) => {
    return item.id.toLowerCase().includes(searchInput);
  });
  console.log(filterData);
  renderCart(filterData);
}
