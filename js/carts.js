let cartItems = [];

function getCartFromLocalStorage() {
    const cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
        cartItems = JSON.parse(cartFromStorage);
        renderCartItems();
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    saveCartToLocalStorage();
    renderCartItems();
}

function decreaseQuantity(productId) {
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        saveCartToLocalStorage();
        renderCartItems();
    }
}

function increaseQuantity(productId) {
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
        saveCartToLocalStorage();
        renderCartItems();
    }
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    renderCartItems();
}

function calculateTotalPrice() {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += item.quantity * item.price;
    });
    return totalPrice;
}

function renderCartItems() {
    const cartTableBody = document.getElementById('tblDanhSachGioHang');
    cartTableBody.innerHTML = '';

    cartItems.forEach((item, index) => {
        const row = `<tr>
                        <td>${index + 1}</td>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${item.quantity * item.price}</td>
                        <td>
                            <button class="btn btn-sm btn-info" onclick="decreaseQuantity('${item.id}')">-</button>
                            <button class="btn btn-sm btn-info" onclick="increaseQuantity('${item.id}')">+</button>
                            <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.id}')">Xóa</button>
                        </td>
                    </tr>`;
        cartTableBody.innerHTML += row;
    });

    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.innerText = `Tổng giá phải trả: ${calculateTotalPrice()} VNĐ`;
}

getCartFromLocalStorage();
