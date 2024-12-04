const data = [
    { name: "Điều Ước", url: "page/product/me/dieu-uoc.html" }, 
    { name: "Hương Ngày Nắng", url: "page/product/ban/huong-ngay-nang.html" },
    { name: "My Princess", url: "page/product/ny/my-princess.html" },
    { name: "Peony", url: "page/product/sang/peony.html" },
    { name: "Simple", url: "page/product/re/simple.html" }
];

// Thêm sự kiện lắng nghe Enter
document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn hành vi mặc định
        const keyword = event.target.value.trim().toLowerCase();
        const notification = document.getElementById("notification");

        // Tìm kiếm sản phẩm
        const foundProduct = data.find(item =>
            item.name.toLowerCase().includes(keyword)
        );

        if (foundProduct) {
            // Chuyển hướng đến sản phẩm
            window.location.href = foundProduct.url;
        } else {
            // Hiển thị thông báo lỗi
            notification.style.display = "block"; // Đảm bảo hiển thị
            notification.classList.add("active");

            // Tự động ẩn thông báo sau 3 giây
            setTimeout(() => {
                notification.classList.remove("active");
                setTimeout(() => {
                    notification.style.display = "none";
                }, 500); // Chờ hiệu ứng kết thúc
            }, 3000);
        }
    }
});
