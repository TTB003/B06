// Hàm mở popup
function openPopup() {
    document.getElementById('adminPopup').style.display = 'flex';
}

// Hàm đóng popup
function closePopup() {
    document.getElementById('adminPopup').style.display = 'none';
}

// Hàm đăng xuất
function logout() {
    alert("Đã đăng xuất!");
    window.location.href = '../admin/admin.html'; // Chuyển đến trang đăng nhập
}





// Function to load users from localStorage and display them in the table
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status}</td>
            <td>
                <button class="btn-primary" onclick="toggleUserStatus(${index})">${user.status === 'Active' ? 'Khóa' : 'Mở khóa'}</button>
                <button class="btn-primary" onclick="showAddUserPopup(${index})">Chỉnh Sửa</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}




// Function to toggle (lock/unlock) a user status
function showAddUserPopup(index = null) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isEditing = index !== null;
    const popup = document.getElementById('userPopup');
    const form = document.getElementById('userForm');

    if (isEditing) {
        const user = users[index];
        document.getElementById('popupTitle').innerText = 'Chỉnh Sửa Người Dùng';
        form.username.value = user.username;
        form.name.value = user.name;
        form.email.value = user.email;
        form.password.value = '';
        form.confirmPassword.value = '';
        form.username.disabled = true; // Không cho phép sửa tên đăng nhập
    } else {
        document.getElementById('popupTitle').innerText = 'Thêm Người Dùng';
        form.reset();
        form.username.disabled = false; // Cho phép nhập tên đăng nhập
    }

    popup.style.display = 'block';

    form.onsubmit = function (event) {
        event.preventDefault(); // Ngăn form submit thông thường
        saveUser(index);
    };
}

function closeUserPopup() {
    document.getElementById('userPopup').style.display = 'none';
}

function saveUser(index = null) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const form = document.getElementById('userForm');

    const username = form.username.value.trim();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!username || !name || !email || !password || !confirmPassword) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    const nameRegex = /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$/;
    if (!nameRegex.test(name)) {
        alert('Họ và tên không hợp lệ. Vui lòng không chứa số hoặc ký tự đặc biệt.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email không hợp lệ!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp!');
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 ký tự đặc biệt và 1 chữ cái in hoa.');
        return;
    }

    if (index === null) {
        if (users.some(user => user.username === username)) {
            alert('Tên đăng nhập đã tồn tại!');
            return;
        }
        if (users.some(user => user.email === email)) {
            alert('Email đã tồn tại!');
            return;
        }
        users.push({ username, name, email, password, status: 'Active' });
    } else {
        const user = users[index];
        if (user.email !== email && users.some(user => user.email === email)) {
            alert('Email đã tồn tại!');
            return;
        }
        users[index] = { ...user, name, email, password };
    }

    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
    closeUserPopup();
}

function toggleUserStatus(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];

    user.status = user.status === 'Active' ? 'Locked' : 'Active';
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status}</td>
            <td>
                <button onclick="showAddUserPopup(${index})">Chỉnh sửa</button>
                <button onclick="toggleUserStatus(${index})">
                    ${user.status === 'Active' ? 'Khóa' : 'Mở khóa'}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addSampleUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const sampleUsers = [
        { username: 'phong2005', name: 'Nguyễn Văn Tèo', email: 'teoem@gmail.com', password: 'Password1!', status: 'Active' },
        { username: 'khair2005', name: 'Trần Thị khải', email: 'khair2005@gmail.com', password: 'Password2!', status: 'Active' },
        { username: 'binhdzvaio', name: 'Trần Thanh Bình', email: 'binhdzvaio@gmail.com', password: 'Password3!', status: 'Active' },
        { username: 'an2005', name: 'Phạm Minh An', email: 'an2005@gmail.com', password: 'Password4!', status: 'Active' },
    ];

    sampleUsers.forEach(user => {
        if (!users.some(existingUser => existingUser.username === user.username)) {
            users.push(user);
        }
    });

    localStorage.setItem('users', JSON.stringify(users));
    loadUsers(); // Cập nhật lại bảng sau khi thêm người dùng
}

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();

    // Button for adding a new user
    const addButton = document.getElementById('addUserButton');
    addButton.addEventListener('click', () => {
        showAddUserPopup();
    });

    // Optional: Uncomment the following line to automatically add sample users when the page loads.
    // addSampleUsers();
});














//
// Hàm để lưu sản phẩm vào localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Hàm để tải sản phẩm từ localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = ''; // Xóa bảng cũ

    products.forEach((product, index) => {
        const row = document.createElement('tr');

        const cellGiftFor = document.createElement('td');
        const cellName = document.createElement('td');
        const cellPrice = document.createElement('td');
        const cellImage = document.createElement('td');
        const cellActions = document.createElement('td');

        cellGiftFor.textContent = product.giftFor;
        cellName.textContent = product.name;
        cellPrice.textContent = product.price;  // Đã định dạng sẵn
        cellImage.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">`;

        cellActions.innerHTML = `
            <button class="btn-primary" onclick="openEditModal(${index})">Chỉnh Sửa</button>
            <button class="btn-primary" onclick="deleteProduct(${index})">Xóa</button>
        `;

        row.appendChild(cellGiftFor);
        row.appendChild(cellName);
        row.appendChild(cellPrice);
        row.appendChild(cellImage);
        row.appendChild(cellActions);

        productTableBody.appendChild(row);
    });
}

// Hàm định dạng giá
function formatPrice(price) {
    return parseFloat(price).toLocaleString('en-US') + ' VND';
}

// Hàm để thêm hoặc cập nhật sản phẩm
function saveProductToLocalStorage(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const formattedPrice = formatPrice(price);  // Định dạng giá
    const image = document.getElementById('productImage').files[0]
        ? URL.createObjectURL(document.getElementById('productImage').files[0])
        : '';
    const giftFor = document.getElementById('category').value;
    const productId = document.getElementById('productId').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (productId) {
        // Cập nhật sản phẩm hiện tại
        const index = parseInt(productId);
        products[index] = { id: index, name, price: formattedPrice, image, giftFor };
    } else {
        // Thêm sản phẩm mới
        const newProduct = { id: products.length, name, price: formattedPrice, image, giftFor };
        products.push(newProduct);
    }

    saveProducts(products);
    loadProducts();
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = ''; // Reset form
}

// Hàm mở modal để chỉnh sửa sản phẩm
function openEditModal(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];

    if (product) {
        document.getElementById('modalProductId').value = index;
        document.getElementById('modalProductName').value = product.name;
        document.getElementById('modalProductPrice').value = product.price.replace(/[^0-9]/g, '');  // Loại bỏ ký tự không phải là số
        document.getElementById('modalCategory').value = product.giftFor;
        document.getElementById('modalProductImage').setAttribute('data-image', product.image);

        document.getElementById('modalOverlay').classList.add('open');
        document.getElementById('editProductModal').classList.add('open');
    }
}

// Hàm đóng modal
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.getElementById('editProductModal').classList.remove('open');
}

// Hàm lưu sản phẩm đã chỉnh sửa vào localStorage
function saveProductEditToLocalStorage(event) {
    event.preventDefault();

    const name = document.getElementById('modalProductName').value;
    const price = document.getElementById('modalProductPrice').value;
    const formattedPrice = formatPrice(price);  // Định dạng giá
    const image = document.getElementById('modalProductImage').files[0]
        ? URL.createObjectURL(document.getElementById('modalProductImage').files[0])
        : document.getElementById('modalProductImage').getAttribute('data-image');
    const giftFor = document.getElementById('modalCategory').value;
    const productId = document.getElementById('modalProductId').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];

    const index = parseInt(productId);
    products[index] = { id: index, name, price: formattedPrice, image, giftFor };

    saveProducts(products);
    loadProducts();
    closeModal();
}

// Hàm để xóa sản phẩm
function deleteProduct(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1); // Xóa sản phẩm tại chỉ số index
        saveProducts(products);
        loadProducts();
    }
}

// Chạy hàm khi trang được tải
window.onload = function() {
    
    loadProducts();

    // Lắng nghe sự kiện submit form
    document.getElementById('productForm').addEventListener('submit', saveProductToLocalStorage);
    document.getElementById('editProductForm').addEventListener('submit', saveProductEditToLocalStorage);
};








// Hàm hiển thị danh sách đơn hàng
function displayOrders() {
    const orders = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    const orderTableBody = document.getElementById("orderTableBody");

    orderTableBody.innerHTML = ""; // Xóa dữ liệu cũ

    // Lấy thông tin người dùng từ localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    // Kiểm tra xem có địa chỉ người dùng không
    const userAddress = userInfo.address || "Không có địa chỉ";

    orders.forEach((order, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${order.name || order.username}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${userAddress}</td> <!-- Hiển thị địa chỉ của khách hàng -->
            <td>${order.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}</td>
            <td>
                <button class="btn-primary" onclick="viewOrderDetails(${index})">Thông tin chi tiết đơn hàng</button>
            </td>
        `;
        orderTableBody.appendChild(row);
    });
}


// Hàm xem chi tiết đơn hàng
function viewOrderDetails(index) {
    const orders = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    const order = orders[index];
    
    if (order) {
        // Hiển thị thông tin chi tiết đơn hàng trong một cửa sổ hoặc phần nội dung mới
        let orderDetails = `
            Thông tin chi tiết đơn hàng
            Tên khách hàng: ${order.name || order.username}
            Email: ${order.email || "Không có email"}
            
            Ngày thanh toán: ${new Date(order.date).toLocaleString()}
            Sản phẩm: ${order.products.split(", ").join(", ")}
            Tổng tiền: ${order.totalAmount.toLocaleString()} VND
            Trạng thái: ${order.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
        `;
        alert(orderDetails);  // Hoặc bạn có thể hiển thị trong một modal hoặc phần riêng
    } else {
        alert("Không tìm thấy đơn hàng.");
    }
}

// Hàm xử lý thanh toán
function payAll() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
        alert("Vui lòng đăng nhập để thực hiện thanh toán.");
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng trống. Vui lòng thêm sản phẩm!");
        return;
    }

    if (confirm("Bạn có chắc chắn muốn thanh toán?")) {
        // Lấy lịch sử thanh toán từ localStorage
        let paymentHistory = JSON.parse(localStorage.getItem("paymentHistory")) || [];

        // Thêm thông tin thanh toán vào lịch sử
        const customerHistory = {
            username: userInfo.username, // Tên tài khoản khách hàng
            name: userInfo.name, // Tên đầy đủ của khách hàng (nếu có)
            email: userInfo.email, // Email khách hàng (nếu có)
            date: new Date().toISOString(),
            products: cart.map(item => item.name).join(", "),
            totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            status: "paid" // Trạng thái của đơn hàng là "paid"
        };

        paymentHistory.push(customerHistory);
        localStorage.setItem("paymentHistory", JSON.stringify(paymentHistory));

        // Xóa giỏ hàng sau khi thanh toán
        localStorage.removeItem("cart");

        alert("Thanh toán thành công!");

        // Hiển thị lại giỏ hàng và lịch sử thanh toán
        displayCart();
        displayPaymentHistory();
        displayOrders();  // Hiển thị lại danh sách đơn hàng sau khi thanh toán
    }
}

// Hiển thị danh sách đơn hàng khi tải trang
document.addEventListener("DOMContentLoaded", function () {
    displayOrders();
});









//
function generateStatistics() {
    const startDate = new Date(document.getElementById("statsStartDate").value);
    const endDate = new Date(document.getElementById("statsEndDate").value);
    
    // Giả sử dữ liệu mặt hàng và khách hàng là mảng các đối tượng với ngày giao dịch
    const products = [
        { name: 'Hương Ngày Nắng', soldQuantity: 20, totalRevenue: 8500000, soldDate: '2024-11-20' },
        { name: 'Aurora', soldQuantity: 30, totalRevenue: 14970000, soldDate: '2024-11-25' },
        { name: 'Nàng Thơ', soldQuantity: 25, totalRevenue: 6225000, soldDate: '2024-11-20' },
        { name: 'Peony', soldQuantity: 15, totalRevenue: 8985000, soldDate: '2024-11-25' },
        { name: 'Em Bé Xinh', soldQuantity: 48, totalRevenue: 7200000, soldDate: '2024-11-20' },
        { name: 'Your Day', soldQuantity: 27, totalRevenue: 9450000, soldDate: '2024-11-25' },
        { name: 'Dating', soldQuantity: 33, totalRevenue: 9867000, soldDate: '2024-11-20' },
        { name: 'Thanh Nhã', soldQuantity: 13, totalRevenue: 10387000, soldDate: '2024-11-25' },
        { name: 'Thướt Tha', soldQuantity: 28, totalRevenue: 8372000, soldDate: '2024-12-01' }
    ];

    const customers = [
        { name: 'Trần Thanh Bình', totalSpent: 3644000, transactionDate: '2024-11-18' },
        { name: 'Phạm Minh An', totalSpent: 6995000, transactionDate: '2024-11-22' },
        { name: 'Nguyễn Văn Tèo Em', totalSpent: 9811000, transactionDate: '2024-12-02' },
        { name: 'Nguyễn Văn Tèo Anh', totalSpent: 7735000, transactionDate: '2024-11-26' },
        { name: 'Nguyễn Văn Tèo Phong', totalSpent: 7366000, transactionDate: '2024-12-03' },
        { name: 'Trần Thị khải', totalSpent: 8476000, transactionDate: '2024-12-01' },
        { name: 'Tưởng Thanh Bình', totalSpent: 9514000, transactionDate: '2024-12-07' },
        { name: 'Nguyễn Minh Anh', totalSpent: 2960000, transactionDate: '2024-12-02' }
    ];

    // Lọc các mặt hàng và khách hàng trong khoảng thời gian chọn
    const filteredProducts = products.filter(product => {
        const productDate = new Date(product.soldDate);
        return productDate >= startDate && productDate <= endDate;
    });

    const filteredCustomers = customers.filter(customer => {
        const customerDate = new Date(customer.transactionDate);
        return customerDate >= startDate && customerDate <= endDate;
    });

    // Tính tổng thu của tất cả mặt hàng
    const totalRevenue = filteredProducts.reduce((sum, product) => sum + product.totalRevenue, 0);

    // Sắp xếp khách hàng theo doanh thu
    filteredCustomers.sort((a, b) => b.totalSpent - a.totalSpent);

    // Hàm định dạng tiền tệ (VND)
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN') + ' VND';
    }

    let statisticsHTML = `
        <h3>Thống kê Mặt Hàng</h3>
        <table>
            <tr>
                <th>Mặt Hàng</th>
                <th>Số Lượng Bán</th>
                <th>Tổng Tiền Thu</th>
            </tr>
    `;

    filteredProducts.forEach(product => {
        statisticsHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.soldQuantity}</td>
                <td>${formatCurrency(product.totalRevenue)}</td>
            </tr>
        `;
    });

    statisticsHTML += `
        </table>
        <h4>Tổng Thu: ${formatCurrency(totalRevenue)}</h4>
        <h4>Mặt Hàng Bán Chạy Nhất: ${filteredProducts.reduce((max, product) => product.soldQuantity > max.soldQuantity ? product : max).name}</h4>
        <h4>Mặt Hàng Bán Ít Nhất: ${filteredProducts.reduce((min, product) => product.soldQuantity < min.soldQuantity ? product : min).name}</h4>
    `;

    statisticsHTML += `
        <h3>Top 5 Khách Hàng Phát Sinh Doanh Thu</h3>
        <ul>
    `;

    filteredCustomers.slice(0, 5).forEach(customer => {
        statisticsHTML += `<li>${customer.name}: ${formatCurrency(customer.totalSpent)}</li>`;
    });

    statisticsHTML += `
        </ul>
    `;

    document.getElementById("statisticsResult").innerHTML = statisticsHTML;
}
