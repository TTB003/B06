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
