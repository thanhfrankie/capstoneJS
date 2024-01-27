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
    this.quantity = this.quantity - 1;
    return this.quantity;
  };
  this.themSoLuong = function () {
    this.quantity = this.quantity + 1;
    return this.quantity;
  };
  this.cartCalPrice = function () {
    var finalPrice = this.quantity * this.cartPrice;
    return finalPrice;
  };
}
function layDuLieuLocal() {
  var cartList = JSON.parse(localStorage.getItem("cart"));
  console.log("🥶 - cartList:", cartList);
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
  return cart;
}
layDuLieuLocal();
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
          <button class="btn btn-danger" onclick='deleteCartProduct(${
            item.id
          })'>Delete</button>
          </td>
          </tr>
          `;
    contentHTML += trString;
  });
  document.getElementById("tblDanhSachGioHang").innerHTML = contentHTML;
  // document.getElementById("tblDanhSachGioHang").innerHTML = contentHTML;
}
renderCart(cart); 

function deleteCartProduct(id) {
  var index;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      index = i;
    }
  }
  console.log("🥶 - index:", index)
  cart.splice(index, 1);
  renderCart(cart);
}
function timKiem() {
  console.log("first");
  var filterData = [];
  var searchInput = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();
  filterData = cart.filter((item) => {
    return item.id.toLowerCase().includes(searchInput);
  });
  console.log(filterData);
  renderCart(filterData);
}
