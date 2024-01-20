console.log("hello");
function renderListProduct(productArr) {
  var content = "";
  productArr.forEach(function (data, index) {
    var trString = `<tr>
        <td>${index + 1}</td> 
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td><img src="${data.img}" width=200 alt=""></td>
        <td>${data.desc}</td>
       <td>
       <button type="button" onclick=" deleteProduct(${
         data.id
       })" class="btn btn-danger">
        Xóa
        </button>
        <button type="button" onclick=" editProduct(${
          data.id
        })" class="btn btn-success">
         Edit
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
