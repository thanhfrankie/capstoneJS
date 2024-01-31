var cart = [];
var idEdited = null;

function turnOnLoading() {
  document.getElementById("loading").style.display = "block";
}

function turnOffLoading() {
  document.getElementById("loading").style.display = "none";
}

function renderListProduct(productArr) {
  var contentHTML = "";
  productArr.reverse().forEach((item, index) => {
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
}

async function fetchListProduct() {
  turnOnLoading();
  try {
    const res = await axios.get(
      "https://65a5f6af74cf4207b4ef0eda.mockapi.io/product"
    );
    turnOffLoading();
    renderListProduct(res.data);
    console.log("🥶 - data:", res.data);
  } catch (err) {
    turnOffLoading();
    console.log(err);
  }
}

async function deleteProduct(id) {
  turnOnLoading();
  try {
    await axios.delete(
      `https://65a5f6af74cf4207b4ef0eda.mockapi.io/product/${id}`
    );
    fetchListProduct();
  } catch (err) {
    turnOffLoading();
    console.log(err);
  }
}

function createProduct() {
  var tenSp = document.getElementById("TenSP").value;
  var giaSp = document.getElementById("GiaSP").value;
  var hinhSp = document.getElementById("HinhSP").value;
  var moTaSp = document.getElementById("motaSp").value;

  if (!tenSp || !giaSp || !hinhSp || !moTaSp) {
    alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
    return;
  }

  var product = {
    name: tenSp,
    img: hinhSp,
    price: giaSp,
    desc: moTaSp,
  };

  axios
    .post("https://65a5f6af74cf4207b4ef0eda.mockapi.io/product", product)
    .then((res) => {
      console.log(res);
      $("#myModal").modal("hide");
      fetchListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
}

async function editProduct(id) {
  idEdited = id;
  try {
    const res = await axios.get(
      `https://65a5f6af74cf4207b4ef0eda.mockapi.io/product/${idEdited}`
    );
    var productEdit = res.data;
    console.log(productEdit);

    document.getElementById("TenSP").value = productEdit.name;
    document.getElementById("HinhSP").value = productEdit.img;
    document.getElementById("GiaSP").value = productEdit.price;
    document.getElementById("motaSp").value = productEdit.desc;

    $("#myModal").modal("show");

    $("#myModal").on("shown.bs.modal", function () {
      $("#TenSP").trigger("focus");
    });
  } catch (err) {
    console.log(err);
  }
}

async function updateProduct() {
  var tenSp = document.getElementById("TenSP").value;
  var giaSp = document.getElementById("GiaSP").value;
  var hinhSp = document.getElementById("HinhSP").value;
  var moTaSp = document.getElementById("motaSp").value;

  if (!tenSp || !giaSp || !hinhSp || !moTaSp) {
    alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
    return;
  }

  var product = {
    name: tenSp,
    img: hinhSp,
    price: giaSp,
    desc: moTaSp,
  };

  try {
    await axios.put(
      `https://65a5f6af74cf4207b4ef0eda.mockapi.io/product/${idEdited}`,
      product
    );
    fetchListProduct();
    $("#myModal").modal("hide");
  } catch (err) {
    console.log(err);
  }
}

async function addToCart(id) {
  try {
    const res = await axios.get(
      `https://65a5f6af74cf4207b4ef0eda.mockapi.io/product/${id}`
    );
    var detailItem = res.data;
    var cartItem = {
      id: detailItem.id,
      cartName: detailItem.name,
      quantity: 1,
      cartPrice: detailItem.price,
      cartCalPrice: function () {
        return this.quantity * this.cartPrice;
      },
    };

    var existingItem = cart.find((item) => item.id === cartItem.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (err) {
    console.log(err);
  }
}

function search() {
  axios
    .get("https://65a5f6af74cf4207b4ef0eda.mockapi.io/product")
    .then((res) => {
      var searchInput = document
        .getElementById("search")
        .value.trim()
        .toLowerCase();
      var filterProducts = res.data.filter((item) =>
        item.name.toLowerCase().includes(searchInput)
      );
      renderListProduct(filterProducts);
    })
    .catch((err) => {
      console.log(err);
    });
}
document.addEventListener("DOMContentLoaded", fetchListProduct);
