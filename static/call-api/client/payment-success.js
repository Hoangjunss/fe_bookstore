// payment-success.js

function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification-container');

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;

    notificationContainer.appendChild(notification);

    // Cho phép CSS animate
    setTimeout(() => {
        notification.classList.add('show');
    }, 100); // Delay nhỏ để cho phép DOM cập nhật

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
        // Xóa phần tử sau khi animation kết thúc
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);

    // Thêm sự kiện đóng khi nhấp vào nút close
    notification.querySelector('.close-btn').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    });
}
// Function to parse URL parameters
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;
    while ((m = regex.exec(queryString))) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
}

// Function to update the payment result card
function updatePaymentResultCard(isSuccess, orderId) {
    const paymentResultDiv = document.getElementById('paymentResult');

    if (isSuccess) {
        paymentResultDiv.className = 'payment-result-card success';
        paymentResultDiv.innerHTML = `
            <div class="icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Thanh Toán Thành Công!</h2>
            <p>Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi. Đơn hàng của bạn đã được xử lý thành công.</p>
            <a href="http://localhost:8000/php/client/order-details.php?id=${orderId}" class="btn-custom">Xem Đơn Hàng</a>
        `;
    } else {
        paymentResultDiv.className = 'payment-result-card error';
        paymentResultDiv.innerHTML = `
            <div class="icon">
                <i class="fas fa-times-circle"></i>
            </div>
            <h2>Thanh Toán Thất Bại</h2>
            <p>Rất tiếc, quá trình thanh toán của bạn không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
            <a href="cart.php" class="btn-custom">Đặt Lại</a>
        `;
    }
}

// Function to handle the payment result
async function handlePaymentResult() {

    const token = localStorage.getItem('token');
    if (!token) {
        showNotification('Bạn chưa đăng nhập. Vui lòng đăng nhập để đặt hàng.', 'error');
        return;
    }

    const params = getUrlParams();
    const responseCode = params['vnp_ResponseCode'];
    const contractId = params['contractId'];

    if (!responseCode || !contractId) {
        showNotification('Thông tin thanh toán không hợp lệ.', 'error');
        updatePaymentResultCard(false, contractId || '');
        return;
    }

    // Determine if payment was successful
    const isSuccess = responseCode === '00';

    // Retrieve order data from sessionStorage
    const ordersCreateDTO = JSON.parse(sessionStorage.getItem('ordersCreateDTO'));

    if (ordersCreateDTO ==null) {
        showNotification('Không tìm thấy thông tin đơn hàng.', 'error');
        updatePaymentResultCard(false, contractId || '');
        return;
    }

    // Define payment and order status based on success
    const paymentStatus = isSuccess ? 'SUCCESS' : 'FAILED';
    const orderStatus = isSuccess ? 'COMPLETED' : 'FAILED';

    console.log(ordersCreateDTO);


    // Show notification
    if (isSuccess) {
        showNotification('Thanh toán thành công! Đơn hàng của bạn đã được cập nhật.', 'success');
    } else {
        showNotification('Thanh toán thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.', 'error');
    }

    // Call backend API to update order status
    try {
        const response = await fetch('http://localhost:8080/api/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(ordersCreateDTO)
        });

        if (response.ok) {
            const updatedOrder = await response.json();
            console.log('Đơn hàng đã được cập nhật:', updatedOrder);
            if (isSuccess) {
                updatePaymentResultCard(isSuccess, updatedOrder.id);
            }
        } else {
            const errorData = await response.json();
            showNotification(errorData.message || 'Cập nhật đơn hàng thất bại.', 'error');
        }
    } catch (error) {
        console.error('Error updating order status:', error);
        showNotification('Xử lý thanh toán thất bại. Vui lòng thử lại sau.', 'error');
    } finally {
        // Remove order data from sessionStorage
        sessionStorage.removeItem('ordersCreateDTO');
    }
}

// Run the handler on page load
window.onload = handlePaymentResult;