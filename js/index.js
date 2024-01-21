console.log("hello");
var idEdited = null;
function renderListProduct(productArr) {
  var content = "";
  var reverseProductArr = productArr.reverse();
  reverseProductArr.forEach(function (data, index) {
    var trString = `<tr>
        <td>${index + 1}</td> 
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td><img src="${data.img}" width=200 alt="hinh bi loi"></td>
        <td>${data.desc}</td>
       <td>
       <button type="button" onclick=" deleteProduct('${
         data.id
       }')" class="btn btn-danger">
        Xóa
        </button>
        <button type="button" onclick=" editProduct('${
          data.id
        }')" class="btn btn-warning">
         edit
         </button>
       </td>
        </tr>`;
    content += trString;
    document.getElementById("tblDanhSachSP").innerHTML = content;
  });
}
function fetchListProducts() {
  axios({
    url: "https://65a5f6b474cf4207b4ef0eee.mockapi.io/products",
    method: "GET",
  })
    .then(function (res) {
      console.log("first", res.data);
      renderListProduct(res.data);
    })
    .catch(function (err) {
      console.log("first", err);
    });
}
fetchListProducts();

function deleteProduct(id) {
  axios({
    url: `https://65a5f6b474cf4207b4ef0eee.mockapi.io/products/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      console.log(res.data);
      fetchListProducts();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function creatProduct() {
  var tenSP = document.getElementById("TenSP").value;
  var giaSP = document.getElementById("GiaSP").value;
  var hinhSP = document.getElementById("HinhSP").value;
  var motaSp = document.getElementById("motaSp").value;
  var products = {
    name: tenSP,
    price: giaSP,
    img: hinhSP,
    desc: motaSp,
  };
  console.log("🚀 ~ creatProduct ~ product:", products);
  axios({
    url: "https://65a5f6b474cf4207b4ef0eee.mockapi.io/products",
    method: "POST",
    data: products,
  })
    .then(function (res) {
      console.log(res);
      fetchListProducts();
      $("#myModal").modal("hide");
    })
    .catch(function (err) {
      console.log(err);
    });
}
function editProduct(id) {
  idEdited = id;
  axios({
    url: `https://65a5f6b474cf4207b4ef0eee.mockapi.io/products/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log(res);

      var productEdit = res.data;
      document.getElementById("TenSP").value = productEdit.name;
      document.getElementById("GiaSP").value = productEdit.price;
      document.getElementById("HinhSP").value = productEdit.img;
      document.getElementById("motaSp").value = productEdit.desc;
      $("#myModal").modal("show");
    })
    .catch(function (err) {
      console.log(err);
    });

  console.log("🚀 ~ editProduct ~ id:", id);
}
function updateProduct(id) {
  var tenSP = document.getElementById("TenSP").value;
  var giaSP = document.getElementById("GiaSP").value;
  var hinhSP = document.getElementById("HinhSP").value;
  var motaSp = document.getElementById("motaSp").value;
  var products = {
    name: tenSP,
    price: giaSP,
    img: hinhSP,
    desc: motaSp,
  };
  axios({
    url: `https://65a5f6b474cf4207b4ef0eee.mockapi.io/products/${idEdited}`,
    method: "PUT",
    data: products,
  })
    .then(function (res) {
      console.log(res);
      fetchListProducts();
      $("#myModal").modal("hide");
    })
    .catch(function (err) {
      console.log(err);
    });
}
