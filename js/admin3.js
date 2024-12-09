// Dữ liệu ví dụ về khách hàng
const users = [
    {
        name: "Nguyễn Văn Tèo ",
        username: "teoem",
        email: "teoem@gmail.com",
        phone: "0123456789",
        address: "Hà Nội, Việt Nam",
        password: "Test@123",
        status: "Active"
    },
    {
        name: "Nguyễn Văn Tèo Anh",
        username: "teoanh",
        email: "teoanh@gmail.com",
        phone: "0987654321",
        address: "TP. Hồ Chí Minh, Việt Nam",
        password: "Test@123",
        status: "Active"
    },
    {
        name: "Trần Thanh Bình",
        username: "user3",
        email: "binhdz@gmail.com",
        phone: "0912345678",
        address: "Đà Nẵng, Việt Nam",
        password: "Test@123",
        status: "Active"
    },
    {
        name: "Lê Thị Khải",
        username: "khair",
        email: "Khair@gmail.com",
        phone: "0945678901",
        address: "Hải Phòng, Việt Nam",
        password: "Test@123",
        status: "Active"
    },
    {
        name: "Vũ Minh An",
        username: "an2005",
        email: "Annn@gmail.com",
        phone: "0901234567",
        address: "Cần Thơ, Việt Nam",
        password: "Test@123",
        status: "Active"
    }
];

// Kiểm tra xem đã có dữ liệu người dùng trong localStorage chưa
const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
if (storedUsers.length === 0) {
    localStorage.setItem('users', JSON.stringify(users));
}



// Kiểm tra xem giỏ hàng đã có trong localStorage chưa
const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
if (storedCart.length === 0) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Dữ liệu ví dụ về lịch sử thanh toán
const paymentHistory = [
    {
        username: "teoem",
        name: "Nguyễn Văn tèo",
        email: "teoem@gmail.com",
        date: new Date().toISOString(),
        products: "Candy Date, Em Bé Xinh",
        totalAmount: 449000,
        status: "paid"
    },
    {
        username: "teoanh",
        name: "Nguyễn Văn Tèo Anh",
        email: "teoanh@gmail.com",
        date: new Date().toISOString(),
        products: "Điều Ước",
        totalAmount: 450000,
        status: "paid"
    },
    {
        username: "bình",
        name: "Trần Thanh Bình",
        email: "binhdz@gmail.com",
        date: new Date().toISOString(),
        products: "Đông Đầy Hạnh Phúc",
        totalAmount: 370000,
        status: "paid"
    },
    {
        username: "khair",
        name: "Lê Thị Khải",
        email: "khair@gmail.com",
        date: new Date().toISOString(),
        products: "Angel, Hẹn Hò",
        totalAmount: 869000,
        status: "paid"
    },
    {
        username: "an2005",
        name: "Vũ Minh An",
        email: "Annn@gmail.com",
        date: new Date().toISOString(),
        products: "Dating, Happy For You",
        totalAmount: 649000,
        status: "paid"
    }
];

// Kiểm tra xem đã có lịch sử thanh toán trong localStorage chưa
const storedPaymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
if (storedPaymentHistory.length === 0) {
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
}

// Hàm hiển thị danh sách đơn hàng
function displayOrders() {
    const orders = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    const orderTableBody = document.getElementById("orderTableBody");

    orderTableBody.innerHTML = ""; // Xóa dữ liệu cũ

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    orders.forEach((order, index) => {
        const row = document.createElement("tr");

        // Tìm kiếm địa chỉ của khách hàng dựa trên username
        const user = users.find(user => user.username === order.username);
        const userAddress = user ? user.address : "Không có địa chỉ"; // Nếu không tìm thấy thì hiển thị "Không có địa chỉ"

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
        let orderDetails = `Thông tin chi tiết đơn hàng
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
        displayOrders();
    }
}

// Hiển thị danh sách đơn hàng khi tải trang
document.addEventListener("DOMContentLoaded", function () {
    displayOrders();
});
