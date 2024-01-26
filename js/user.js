var idEdited = null;
// bật loading
function turnOnLoading() {
  document.getElementById("loading").style.display = "block";
}
// ẩn loading
function turnOffLoading() {
  document.getElementById("loading").style.display = "none";
}
function renderListProduct(productArr) {
  var contentHTML = "";
  productArr.reverse().forEach(function (item, index) {
    var trString = `
        <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><img src="${item.img}" style="width: 100px"/></td>
        <td>${item.desc}</td>
        <td>
        <button class="btn btn-danger" onclick='deleteProduct(${
          item.id
        })'>Delete</button>
        <button class="btn btn-warning" onclick='editProduct(${
          item.id
        })'>Edit</button>
        <button class="btn btn-primary" onclick='addToCart(${
          item.id
        })'>Add to Cart</button>
        </td>
        </tr>
        `;
    contentHTML += trString;
  });
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
  // document.getElementById("tblDanhSachGioHang").innerHTML = contentHTML;
}
function fetchListProduct() {
  turnOnLoading();
  axios
    .get("https://65a5f6af74cf4207b4ef0eda.mockapi.io/product", {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
    .then(function (res) {
      turnOffLoading();
      renderListProduct(res.data);
      console.log("🥶 - data:", res.data);
    })
    .catch(function (err) {
      turnOffLoading();
    });
}
fetchListProduct();
function deleteProduct(id) {
  turnOnLoading();
  axios({
    url: `https://65a5f6af74cf4207b4ef0eda.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      console.log("res", res);
      fetchListProduct();
    })
    .catch(function (err) {
      turnOffLoading();
    });
}
function createProduct() {
  var tenSp = document.getElementById("TenSP").value;
  var giaSp = document.getElementById("GiaSP").value;
  var hinhSp = document.getElementById("HinhSP").value;
  var moTaSp = document.getElementById("motaSp").value;
  var product = {
    name: tenSp,
    img: hinhSp,
    price: giaSp,
    desc: moTaSp,
  };
  console.log("🥶 - product:", product);
  axios({
    url: "https://65a5f6af74cf4207b4ef0eda.mockapi.io/product",
    method: "POST",
    data: product,
  })
    .then(function (res) {
      console.log(res);
      $("#myModal").modal("hide");
      fetchListProduct();
    })
    .catch(function (err) {
      console.log(err);
    });
}
function editProduct(id) {
  idEdited = id;
  axios({
    url: `https://65a5f6af74cf4207b4ef0eda.mockapi.io/product/${idEdited}`,
    method: "GET",
  })
    .then(function (res) {
      var productEdit = res.data;
      console.log(productEdit);
      document.getElementById("TenSP").value = productEdit.name;
      document.getElementById("HinhSP").value = productEdit.img;
      document.getElementById("GiaSP").value = productEdit.price;
      document.getElementById("motaSp").value = productEdit.desc;
      $("#myModal").modal("show");
      // focus vào input đầu tiên
      $("#myModal").on("shown.bs.modal", function () {
        $("#TenSP").trigger("focus");
      });
      // $("#TenSP", this).focus();

      // document.getElementById("TenSP").focus();
    })
    .catch(function (err) {
      console.log(err);
    });
}
function updateProduct() {
  var tenSp = document.getElementById("TenSP").value;
  console.log("🥶 - tenSp:", tenSp);
  var giaSp = document.getElementById("GiaSP").value;
  console.log("🥶 - giaSp:", giaSp);
  var hinhSp = document.getElementById("HinhSP").value;
  console.log("🥶 - hinhSp:", hinhSp);
  var moTaSp = document.getElementById("motaSp").value;
  console.log("🥶 - moTaSp:", moTaSp);
  var product = {
    name: tenSp,
    img: hinhSp,
    price: giaSp,
    desc: moTaSp,
  };
  console.log("🥶 - product:", product);
  axios({
    url: `https://65a5f6af74cf4207b4ef0eda.mockapi.io/product/${idEdited}`,
    method: "PUT",
    data: product,
  })
    .then(function (res) {
      fetchListProduct();
      console.log(res);
      $("#myModal").modal("hide");
    })
    .catch(function (err) {
      console.log(err);
    });
}
function addToCart(id) {
  console.log("ok");
  axios({
    url: `https://65a5f6af74cf4207b4ef0eda.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      var detailItem = res.data;
      var cartItem = {
        cartName: detailItem.name,
        quantity: 1,
        cartPrice: detailItem.price,
        cartCalPrice: function () {
          var finalPrice = this.quantity * this.cartPrice;
          return finalPrice;
        },
      };
      console.log("🥶 - cartItem:", cartItem);
      cart.push(cartItem);
      console.log("🥶 - cart:", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    })
    .catch((err) => {
      console.log(err);
    });
}
function search() {
  axios({
    url: "https://65a5f6af74cf4207b4ef0eda.mockapi.io/product",
    method: "GET",
  })
    .then((res) => {
      var searchInput = document
        .getElementById("search")
        .value.trim()
        .toLowerCase();
      console.log(res);
      var filterProducts = res.data.filter((item) =>
        item.name.toLowerCase().includes(searchInput)
      );
      renderListProduct(filterProducts);
    })
    .catch((err) => {
      console.log(err);
    });
}
