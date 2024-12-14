// Hàm hiển thị thông báo
function showNotification(message, type) {
    const notificationContainer = document.getElementById('notification-container');

    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.innerHTML = `
        <span>${message}</span>
        <span class="close">&times;</span>
    `;

    notificationContainer.appendChild(notification);

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('disappear');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 3000);

    // Thêm sự kiện đóng khi nhấp vào nút close
    notification.querySelector('.close').addEventListener('click', () => {
        notification.classList.remove('show');
        notification.classList.add('disappear');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    });
}

function getToken() {
    return localStorage.getItem('token');
}

document.addEventListener('DOMContentLoaded', function () {
    const accessToken = getToken();
    // Hàm để fetch dữ liệu thống kê
    async function fetchStatistics() {
        try {
            // Gọi API để lấy tổng số hoá đơn
            const countResponse = await axios.get('http://localhost:8080/api/v1/orders/count', {
                headers: {
                    'Content-Type': 'application/json',
                    // Thêm Authorization header nếu cần
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const countOrders = countResponse.data;
            document.getElementById('countOrders').textContent = countOrders;
            const countUserResponse = await axios.get('http://localhost:8080/api/v1/users/count', {
                headers: {
                    'Content-Type': 'application/json',
                    // Thêm Authorization header nếu cần
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const countUserOrders = countUserResponse.data;
            document.getElementById('countCustomers').textContent = countUserOrders;

            const countProductResponse = await axios.get('http://localhost:8080/api/v1/product/count', {
                headers: {
                    'Content-Type': 'application/json',
                    // Thêm Authorization header nếu cần
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const countProductOrders = countProductResponse.data;
            document.getElementById('countProducts').textContent = countProductOrders;


            // Gọi API để lấy thống kê doanh thu
            const statisticsResponse = await axios.get('http://localhost:8080/api/v1/orders/statistics', {
                params: {
                    // Thêm tham số nếu cần, ví dụ: month, year
                    // month: '09',
                    // year: '2023'
                },
                headers: {
                    'Content-Type': 'application/json',
                    // Thêm Authorization header nếu cần
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const statistics = statisticsResponse.data;
            document.getElementById('totalRevenue').textContent = formatCurrency(statistics.totalPrice);
            document.getElementById('averageOrderValue').textContent = formatCurrency(statistics.totalPrice / (statistics.totalQuantity || 1));

        } catch (error) {
            console.error(error);
            if (error.response) {
                console.log(`Error ${error.response.status}: ${error.response.data}`, 'error');
            }
        }
    }

    // Hàm để định dạng số thành tiền tệ VND
    function formatCurrency(value) {
        if (value === null || value === undefined) return '0 VND';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    }

    // Gọi hàm fetchStatistics khi trang được tải
    fetchStatistics();
});