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
  var reverseProductArr = productArr.reverse();
  reverseProductArr.forEach(function (item, index) {
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
        </td>
        </tr>
        `;
    contentHTML += trString;
  });
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
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
      console.log("🥶 - data:", res.data)
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
      // gọi lại api lấy danh sách api khi lấy thành công
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
  var moTaSp = document.getElementById("moTaSp").value;
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
    url: `https://65a5f6af74cf4207b4ef0eda.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      var productEdit = res.data;
      console.log("🥶 - productEdit:", productEdit);
      document.getElementById("TenSP").value = productEdit.name;
      document.getElementById("HinhSP").value = productEdit.img;
      document.getElementById("GiaSP").value = productEdit.price;
      document.getElementById("moTaSp").value = productEdit.desc;
      $("#myModal").modal("show");
      // $("#TenSP", this).focus();
      $("#myModal").on("shown.bs.modal", function () {
        $("#TenSP").trigger("focus");
      });
      // focus vào input đầu tiên

      document.getElementById("TenSP").focus();
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
  var moTaSp = document.getElementById("moTaSp").value;
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
      console.log(res)
      $("#myModal").modal("hide");
    })
    .catch(function (err) {
      console.log(err);
    });
}