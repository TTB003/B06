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