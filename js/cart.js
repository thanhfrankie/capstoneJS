var cart = [];
console.log(cart);
function CartItem(
    cartName,
    quantity,
    botSoLuong,
    themSoLuong,
    cartPrice,
    cartCalPrice
  ) {
    this.cartName = cartName;
    this.quantity = quantity;
    this.botSoLuong = function () {
      quantity = quantity - 1;
      return quantity;
    };
    this.themSoLuong = function () {
      quantity = quantity + 1;
      return quantity;
    };
    this.cartPrice = cartPrice;
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
  
  function renderCart(cartArr) {
    var contentHTML = "";
    cartArr.reverse().forEach(function (item, index) {
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
         
          <td>
          <button class="btn btn-danger" onclick='deleteProduct(${
            item.id
          })'>Delete</button>
          <button class="btn btn-warning" onclick='editProduct(${
            item.id
          })'>Edit</button>
          </td>
          </tr>
          `;
      contentHTML += trString;
    });
    document.getElementById("tblDanhSachGioHang").innerHTML = contentHTML;
    // document.getElementById("tblDanhSachGioHang").innerHTML = contentHTML;
  }
  renderCart(cart);