document.addEventListener("DOMContentLoaded", () => {
    fetchCartData();
    //fetchUserInfo();
    initializeAddressForm();
    const cartLink = document.querySelector('a[href="cart.php"]');
    
    function checkAuthAndRedirect(link, targetUrl) {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = targetUrl;
        } else {
            showNotification('Vui lòng đăng nhập để truy cập trang này.', 'error');
        }
    }

    const profileLink = document.getElementById("profileLink");
    profileLink.addEventListener("click", function(event) {
        event.preventDefault();  // Ngăn chặn chuyển hướng mặc định
        checkAuthAndRedirect(profileLink, "/profile.php");
    });

    cartLink.addEventListener("click", function(event) {
        event.preventDefault();  // Ngăn chặn chuyển hướng mặc định
        checkAuthAndRedirect(cartLink, "cart.php");
    });

    updateAuthButton();
});

function updateAuthButton() {
    const authButtonContainer = document.getElementById("auth-button");
    const token = localStorage.getItem('token');

    if (token) {
        // Nếu có token, hiển thị nút Logout
        authButtonContainer.innerHTML = `
            <a href="javascript:void(0);" id="logout-button">
                    <i class="btn btn-light"> Logout</i>
                </a>
        `;

        // Xử lý sự kiện đăng xuất
        document.getElementById("logout-button").addEventListener("click", function() {
            localStorage.removeItem('token');  // Xóa token
            alert("Đã đăng xuất thành công.");
            updateAuthButton();  // Cập nhật nút
            window.location.href = 'index.php';
        });
    } else {
        // Nếu không có token, hiển thị nút Login
        authButtonContainer.innerHTML = `
            <a href="../auth/login.php" id="login-button">
                    <i class="btn btn-light">Login</i>
                </a>
        `;

        // Xử lý sự kiện đăng nhập (chuyển hướng tới trang đăng nhập)
        document.getElementById("login-button").addEventListener("click", function(event) {
            event.preventDefault();  // Ngăn chặn chuyển hướng mặc định
            window.location.href = "../auth/login.php";
        });
    }
}

// Hàm hiển thị thông báo
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification-container');

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;

    notificationContainer.appendChild(notification);

    // Thêm lớp show để kích hoạt animation
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

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng hiển thị trên biểu tượng giỏ hàng
// async function updateCartCount() {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         return; // Nếu chưa đăng nhập, không cần cập nhật
//     }

//     try {
//         const response = await fetch('http://localhost:8080/api/v1/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const cart = await response.json();
//         const cartCount = cart.cartDetails.reduce((sum, item) => sum + item.quantity, 0);

//         // Cập nhật số lượng trong biểu tượng giỏ hàng
//         const cartCountElement = document.querySelector('.cart-count');
//         if (cartCountElement) {
//             cartCountElement.textContent = cartCount;
//         } else {
//             // Nếu chưa có, tạo phần tử và thêm vào trong .cart
//             const cartIcon = document.querySelector('.cart a');
//             const newCartCount = document.createElement('span');
//             newCartCount.className = 'cart-count';
//             newCartCount.textContent = cartCount;
//             cartIcon.appendChild(newCartCount);
//         }
//     } catch (error) {
//         console.error('Error updating cart count:', error);
//         // Bạn có thể thêm thông báo lỗi nếu muốn
//     }
// }

// Hàm lấy dữ liệu giỏ hàng và render
async function fetchCartData() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification('Bạn chưa đăng nhập. Vui lòng đăng nhập để xem giỏ hàng.', 'error');
            document.getElementById("cart-items").innerHTML = "<li>Giỏ hàng của bạn đang trống.</li>";
            document.getElementById("subtotalText").textContent = '0 VND';
            document.getElementById("shippingFeeText").textContent = '0 VND';
            document.getElementById("totalText").textContent = '0 VND';
            return;
        }

        const response = await fetch('http://localhost:8080/api/v1/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const cartData = await response.json();
        renderCart(cartData);
        //updateCartCount(); // Cập nhật số lượng giỏ hàng
    } catch (error) {
        console.error('Error fetching cart data:', error);
        showNotification('Có lỗi xảy ra khi tải dữ liệu giỏ hàng.', 'error');
    }
}

// Hàm hiển thị giỏ hàng
function renderCart(cart) {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Xóa nội dung hiện tại
    let subtotal = 0;
    let shippingFee = 0; // Mặc định phí vận chuyển

    if (!cart || !cart.cartDetailDTOList || cart.cartDetailDTOList.length === 0) {
        cartItemsContainer.innerHTML = "<li>Giỏ hàng của bạn đang trống.</li>";
        document.getElementById("subtotalText").textContent = '0 VND';
        document.getElementById("shippingFeeText").textContent = '0 VND';
        document.getElementById("totalText").textContent = '0 VND';
        return;
    }

    cart.cartDetailDTOList.forEach((detail, index) => {
        const product = detail.product; // ProductSaleDTO.product là Product
        const imageUrl = product.image ? product.image : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';
        const productName = product.name || 'Tên sản phẩm';
        const price = product.price || 0;
        const quantity = detail.quantity || 0;
        const totalPrice = price * quantity;
        subtotal += totalPrice;

        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        const formattedTotalPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);

        const item = `<li>${productName} x ${quantity} <span>${formattedTotalPrice}</span></li>`;
        cartItemsContainer.insertAdjacentHTML('beforeend', item);
    });

    // Cập nhật subtotal và total
    document.getElementById("subtotalText").textContent = `${subtotal.toLocaleString('vi-VN')} VND`;
    document.getElementById("totalText").textContent = `${subtotal.toLocaleString('vi-VN')} VND`;

    // Nếu đã có shipping fee (tính toán dựa trên địa chỉ), thêm vào total
    // Bạn có thể cập nhật shippingFee sau khi người dùng nhập địa chỉ
}

// Hàm áp dụng voucher
async function applyVoucher() {
    const voucherCode = document.getElementById("voucherCode").value.trim();
    if (!voucherCode) {
        showNotification('Vui lòng nhập mã voucher.', 'error');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification('Bạn chưa đăng nhập. Vui lòng đăng nhập để áp dụng voucher.', 'error');
            return;
        }

        // Gọi API để kiểm tra và áp dụng voucher
        const response = await fetch(`http://localhost:8080/api/v1/vouchers/apply?code=${voucherCode}`, { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            showNotification(`Lỗi: ${errorData.message}`, 'error');
            return;
        }

        const voucherData = await response.json();
        showNotification('Áp dụng voucher thành công!', 'success');

        // Cập nhật tổng tiền sau khi áp dụng voucher
        // Giả sử voucherData chứa thông tin giảm giá
        const discount = voucherData.discount || 0; // Thay đổi theo cấu hình backend
        const subtotalText = document.getElementById("subtotalText").textContent.replace(/[^0-9]/g, '');
        const newTotal = parseInt(subtotalText) - discount;
        document.getElementById("totalText").textContent = `${newTotal.toLocaleString('vi-VN')} VND`;

    } catch (error) {
        console.error('Error applying voucher:', error);
        showNotification('Có lỗi xảy ra khi áp dụng voucher.', 'error');
    }
}

// Hàm chọn phương thức thanh toán và bình luận khi chọn PayPal và VNPay
function handlePaymentMethodSelection() {
    const paymentMethods = document.getElementsByName('paymentMethod');
    let selectedMethod = 'CASH'; // Mặc định

    paymentMethods.forEach((method) => {
        if (method.checked) {
            selectedMethod = method.value;
        }
    });

    if (selectedMethod === 'PAYPAL') {
        // TODO: Thêm logic xử lý PayPal
        console.log('User selected PayPal. Redirect to PayPal gateway.');
    } else if (selectedMethod === 'VNPAY') {
        // TODO: Thêm logic xử lý VNPay
        console.log('User selected VNPay. Redirect to VNPay gateway.');
    }

    return selectedMethod;
}

function convertVNDStringToNumber(vndStr) {
    // Loại bỏ dấu chấm và các ký tự không phải số
    const numericString = vndStr.replace(/[^0-9]/g, '');
    // Chuyển đổi chuỗi số thành kiểu số nguyên
    const number = parseInt(numericString, 10);
    return number;
}


// Hàm xử lý khi người dùng nhấn nút "Place Order"
document.getElementById("checkoutForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        showNotification('Bạn chưa đăng nhập. Vui lòng đăng nhập để đặt hàng.', 'error');
        return;
    }

    let provinceText = '';
    let districtText = '';
    let wardText = '';

    // Lấy dữ liệu từ form
    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
// Lấy phần tử DOM của các thẻ <select>
const provinceElement = document.getElementById("province");
const districtElement = document.getElementById("district");
const wardElement = document.getElementById("ward");

// Kiểm tra xem các phần tử có tồn tại không trước khi thao tác
if (provinceElement && districtElement && wardElement) {
    // Lấy giá trị (value) của từng thẻ <select>
    const provinceValue = provinceElement.value;
    const districtValue = districtElement.value;
    const wardValue = wardElement.value;

        //Tỉnh thành
        if(provinceValue == null || provinceValue == ''){
            showNotification('Vui lòng chọn tỉnh thành.', 'error');
            return;
        }
    
        // Quận huyện
        if(districtValue == null || districtValue == ''){
            showNotification('Vui lòng chọn quận huyện.', 'error');
            return;
        }
    
        // Phư��ng xã
        if(wardValue == null || wardValue == ''){
            showNotification('Vui lòng chọn phường xã.', 'error');
            return;
        }

    // Lấy văn bản (text) của từng lựa chọn đã chọn
    provinceText = provinceElement.options[provinceElement.selectedIndex].text;
    districtText = districtElement.options[districtElement.selectedIndex].text;
    wardText = wardElement.options[wardElement.selectedIndex].text;

    // In ra console để kiểm tra
    console.log("Province:", provinceValue, provinceText);
    console.log("District:", districtValue, districtText);
    console.log("Ward:", wardValue, wardText);
} else {
    console.error("Không tìm thấy một hoặc nhiều phần tử <select>.");
}

    const detailAddress = document.getElementById("detailAddress").value.trim();
    //const voucherCode = document.getElementById("voucherCode").value.trim();
    const paymentMethod = handlePaymentMethodSelection();
    const totalPrice = document.getElementById('subtotalText').textContent;
    const fee = document.getElementById('shippingFeeText').textContent;

    // Kiểm tra dữ liệu nhập
    if (!fullName || !phone || !email || !province || !district || !ward || !detailAddress) {
        showNotification('Vui lòng điền đầy đủ thông tin.', 'error');
        return;
    }

    // Kiểm tra định dạng Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Địa chỉ email không hợp lệ.', 'error');
        return;
    }

    // Kiểm tra định dạng Số điện thoại (ví dụ: 10 số)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        showNotification('Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.', 'error');
        return;
    }

    //Detail address
    if(detailAddress == null || detailAddress == ''){
        showNotification('Vui lòng nhập địa chỉ chi tiết.', 'error');
        return;
    }

    // Kiểm tra phương thức thanh toán
    if (!paymentMethod) {
        showNotification('Vui lòng chọn phương thức thanh toán.', 'error');
        return;
    }

    console.log(totalPrice + fee);

    const price = calculateTotalPrice(); // Hàm tính tổng giá tiền đơn hàng
    const formattedTotalPrice = convertVNDStringToNumber(totalPrice); // "650.000 ₫"
    const formattedFee = convertVNDStringToNumber(fee); 

    // Xử lý dựa trên phương thức thanh toán
    if (paymentMethod === "CASH") {
        const ordersCreateDTO = {
            quantity: 1,
            totalPrice: formattedTotalPrice,
            address: {
                fullName: fullName,
                email: email,
                province: provinceText, 
                district: districtText,
                ward: wardText,
                detailAddress: detailAddress,
                phone: phone
            },
            paymentStatus: "CASH",
            orderStatus: "PENDING",
            fee: formattedFee
        }
        console.log(ordersCreateDTO);
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
                const data = await response.json(); // Phân tích cú pháp JSON từ phản hồi
                console.log(data); // Kiểm tra dữ liệu nhận được từ backend
                alert('Đơn hàng của bạn đã được đặt thành công!');
                window.location.href = 'http://localhost:8000/php/client/order-details.php?id=' + data.id;
            } else {
                const errorData = await response.json();
                showNotification(errorData.message || 'Đặt hàng thất bại.', 'error');
            }
        } catch (error) {
            console.error('CASH Order Error:', error);
            showNotification('Đặt hàng thất bại. Vui lòng thử lại sau.', 'error');
        }

    } else if (paymentMethod === "PAYPAL") {
        // Xử lý thanh toán khi chọn PayPal
        // Ví dụ: Gửi đơn hàng lên backend và nhận URL PayPal để redirect
        try {
            const response = await fetch('http://localhost:8080/api/paypal/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const data = await response.json();
                const paypalUrl = data.paymentUrl; // Giả sử backend trả về URL PayPal
                window.location.href = paypalUrl;

                // Khi redirect thành công, bạn có thể xử lý thêm nếu cần
                // Ví dụ: Hiển thị thông báo hoặc lưu trạng thái đơn hàng
            } else {
                const errorData = await response.json();
                showNotification(errorData.message || 'Thanh toán PayPal thất bại.', 'error');
            }
        } catch (error) {
            console.error('PAYPAL Error:', error);
            showNotification('Thanh toán PayPal thất bại. Vui lòng thử lại sau.', 'error');
        }

    } else if (paymentMethod === "VNPAY") {
        const ordersCreateDTO = {
            quantity: 1,
            totalPrice: formattedTotalPrice,
            address: {
                fullName: fullName,
                email: email,
                province: provinceText, 
                district: districtText,
                ward: wardText,
                detailAddress: detailAddress,
                phone: phone
            },
            paymentStatus: "CASH",
            orderStatus: "PENDING",
            fee: formattedFee
        }
        sessionStorage.setItem('ordersCreateDTO', JSON.stringify(ordersCreateDTO));
        // Xử lý thanh toán khi chọn VNPAY
        // Ví dụ: Gọi hàm riêng để xử lý VNPAY
        // Giả sử bạn có biến price và id đơn hàng, cần xác định cách lấy chúng
        const id = generateOrderId(); // Hàm tạo hoặc lấy ID đơn hàng

        await callVNPAY(price, id);
    } else {
        showNotification('Phương thức thanh toán không hợp lệ.', 'error');
    }
});

// Hàm tính tổng giá tiền đơn hàng
function calculateTotalPrice() {
    // Implement logic để tính tổng giá tiền từ giỏ hàng
    // Ví dụ:
    const subtotal = parseInt(document.getElementById("subtotalText").innerText.replace(/\D/g, '')) || 0;
    const shippingFee = parseInt(document.getElementById("shippingFeeText").innerText.replace(/\D/g, '')) || 0;
    return subtotal + shippingFee;
}

// Hàm tạo hoặc lấy ID đơn hàng
function generateOrderId() {
    // Implement logic để lấy hoặc tạo ID đơn hàng
    // Ví dụ: Lấy từ backend sau khi tạo đơn hàng tạm
    // Hoặc sử dụng UUID trên frontend
    return '123456789'; // Thay thế bằng logic thực tế
}

// Hàm lấy phương thức thanh toán được chọn
function handlePaymentMethodSelection() {
    const paymentMethods = document.getElementsByName("paymentMethod");
    for (let method of paymentMethods) {
        if (method.checked) {
            return method.value;
        }
    }
    return null;
}

// Hàm gọi API VNPAY
async function callVNPAY(price, id) {
    try {
        const token = localStorage.getItem('token');
    if (!token) {
        return; // Nếu chưa đăng nhập, không cần cập nhật
    }
        const response = await fetch(`http://localhost:8080/api/v1/vnpay/pay?price=${price}&id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to initiate VNPAY payment.');
        }

        const paymentUrl = await response.text(); // Assuming the backend returns the URL as plain text
        // Redirect người dùng đến trang thanh toán VNPAY
        window.location.href = paymentUrl;

        // Khi redirect thành công, bạn có thể xử lý thêm nếu cần
        // Ví dụ: Hiển thị thông báo hoặc lưu trạng thái đơn hàng
    } catch (error) {
        console.error('VNPAY Error:', error);
        showNotification('Thanh toán qua VNPAY thất bại. Vui lòng thử lại sau.', 'error');
    }
}

// Hàm làm trống giỏ hàng sau khi đặt hàng
async function clearCart() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch('http://localhost:8080/api/v1/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        showNotification('Giỏ hàng đã được làm trống.', 'success');
        fetchCartData();
    } catch (error) {
        console.error('Error clearing cart:', error);
        showNotification('Có lỗi xảy ra khi làm trống giỏ hàng.', 'error');
    }
}

// Hàm xử lý khi người dùng chọn phương thức thanh toán
function handlePaymentMethodSelection() {
    const paymentMethods = document.getElementsByName('paymentMethod');
    let selectedMethod = 'CASH'; // Mặc định

    paymentMethods.forEach((method) => {
        if (method.checked) {
            selectedMethod = method.value;
        }
    });

    if (selectedMethod === 'PAYPAL') {
        // TODO: Thêm logic xử lý PayPal
        console.log('User selected PayPal. Redirect to PayPal gateway.');
    } else if (selectedMethod === 'VNPAY') {
        // TODO: Thêm logic xử lý VNPay
        console.log('User selected VNPay. Redirect to VNPay gateway.');
    }

    return selectedMethod;
}

// Hàm xử lý thông tin người dùng đã đăng nhập
async function fetchUserInfo() {
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('userEmail').textContent = 'Hello, Guest';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/v1/user/profile', { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        document.getElementById('userEmail').textContent = `Hello, ${userData.email}`;
    } catch (error) {
        console.error('Error fetching user info:', error);
        document.getElementById('userEmail').textContent = 'Hello, Guest';
    }
}

// Hàm khởi tạo form địa chỉ với các API để lấy tỉnh, quận, phường
function initializeAddressForm() {
    // Sử dụng GHN API để lấy danh sách tỉnh, quận, phường như bạn đã làm trong `cart.php`
    // Giả sử bạn đã thêm các hàm gọi API ở một nơi nào đó và sử dụng lại chúng ở đây
    // Nếu không, bạn cần tái sử dụng code từ `cart.php`

    let provinceName = '';
    let districtName = '';
    let wardName = '';
    let fromDistrictId = 1488; // Tỉnh mặc định từ GHN API
    let toDistrictId = '';
    let toWardCode = '';

    const host = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";
    const token = 'f40d0301-b206-11ef-81b7-f2563a9a571b';

    let callAPI = (api, params = {}) => {
        const config = {
            headers: {
                'token': token
            },
            params: params
        };

        return axios.get(host + api, config)
            .then((response) => response.data)
            .catch((error) => console.error("Error calling API:", error));
    };

    let callAPICalculate = (params = {}) => {
        const config = {
            headers: {
                'token': token,
                'shop_id': 5500083
            },
            params: params
        };

        return axios.get("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee", config)
            .then((response) => response.data)
            .catch((error) => console.error("Error calling API:", error));
    };

    let callApiDistrict = (provinceId) => callAPI("district", {'province_id': provinceId});
    let callApiWard = (districtId) => callAPI("ward", {'district_id': districtId});

    let renderDataProvince = () => {
        callAPI("province")
            .then((data) => {
                let row = '<option disabled selected value="">Chọn tỉnh/thành</option>';
                data.data.forEach(element => {
                    row += `<option value="${element.ProvinceID}">${element.ProvinceName}</option>`;
                });
                $("#province").html(row);
            })
            .catch((error) => console.error("Error rendering province data:", error));
    };

    renderDataProvince();

    $("#province").change(() => {
        const provinceId = $("#province").val();
        provinceName = $("#province option:selected").text();
        if (provinceId) {
            callApiDistrict(provinceId)
                .then((data) => renderDataDistrict(data));
        }
    });

    $("#district").change(() => {
        const districtId = $("#district").val();
        districtName = $("#district option:selected").text();
        if (districtId) {
            toDistrictId = districtId;
            callApiWard(districtId)
                .then((data) => renderDataWard(data));
        }
    });

    $("#ward").change(() => {
        toWardCode = $("#ward").val();
        wardName = $("#ward option:selected").text();
        callAPICalculate({
            "service_type_id": 2,
            "insurance_value": 500000,
            "coupon": null,
            "from_district_id": fromDistrictId,
            "to_district_id": toDistrictId,
            "to_ward_code": "" + toWardCode,
            "height": 12,
            "length": 26,
            "weight": 1000,
            "width": 27
        }).then(data => {
            let shippingFee = data.data.total;
            document.getElementById('shippingFeeText').textContent = `${shippingFee.toLocaleString('vi-VN')} VND`;
            // Cập nhật tổng tiền
            updateTotalPrice(shippingFee);
        });
    });
}

// Hàm cập nhật tổng tiền sau khi tính phí vận chuyển
function updateTotalPrice(shippingFee) {
    const subtotalText = document.getElementById("subtotalText").textContent.replace(/[^0-9]/g, '');
    const subtotal = parseInt(subtotalText);
    const total = subtotal + shippingFee;
    document.getElementById("totalText").textContent = `${total.toLocaleString('vi-VN')} VND`;
}

// Hàm áp dụng voucher
// Bạn có thể thêm logic áp dụng voucher ở đây nếu backend hỗ trợ

// Hàm xử lý khi người dùng nhấn nút "Place Order"
async function placeOrder(orderData) {
    const token = localStorage.getItem('token');
    if (!token) {
        showNotification('Bạn chưa đăng nhập. Vui lòng đăng nhập để đặt hàng.', 'error');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/v1/orders', { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            showNotification(`Lỗi: ${errorData.message}`, 'error');
            return;
        }

        const createdOrder = await response.json();
        showNotification('Đặt hàng thành công!', 'success');

        // Nếu thanh toán qua PayPal hoặc VNPay, bạn có thể chuyển hướng người dùng tới gateway tương ứng
        if (orderData.paymentMethod === 'PAYPAL') {
            // TODO: Redirect to PayPal payment gateway with order details
            console.log('Redirecting to PayPal...');
            // window.location.href = 'PAYPAL_GATEWAY_URL';
        } else if (orderData.paymentMethod === 'VNPAY') {
            // TODO: Redirect to VNPay payment gateway with order details
            console.log('Redirecting to VNPay...');
            // window.location.href = 'VNPAY_GATEWAY_URL';
        } else {
            // Nếu thanh toán bằng CASH, có thể chuyển hướng tới trang xác nhận đơn hàng
            window.location.href = `order-confirmation.php?orderId=${createdOrder.id}`;
        }

        // Làm trống giỏ hàng sau khi đặt hàng thành công
        await clearCart();

    } catch (error) {
        console.error("Error placing order:", error);
        showNotification('Có lỗi xảy ra khi đặt hàng.', 'error');
    }
}

// Hàm làm trống giỏ hàng sau khi đặt hàng
async function clearCart() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch('http://localhost:8080/api/v1/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        showNotification('Giỏ hàng đã được làm trống.', 'success');
        fetchCartData();
    } catch (error) {
        console.error('Error clearing cart:', error);
        showNotification('Có lỗi xảy ra khi làm trống giỏ hàng.', 'error');
    }
}

// Hàm khởi tạo form địa chỉ với các API để lấy tỉnh, quận, phường
function initializeAddressForm() {
    // Sử dụng GHN API để lấy danh sách tỉnh, quận, phường như bạn đã làm trong `cart.php`
    let provinceName = '';
    let districtName = '';
    let wardName = '';
    let fromDistrictId = 1488; // Tỉnh mặc định từ GHN API
    let toDistrictId = '';
    let toWardCode = '';

    const host = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";
    const tokenGHN = '5f440054-8c34-11ee-af43-6ead57e9219a';

    let callAPI = (api, params = {}) => {
        const config = {
            headers: {
                'token': tokenGHN
            },
            params: params
        };

        return axios.get(host + api, config)
            .then((response) => response.data)
            .catch((error) => console.error("Error calling API:", error));
    };

    let callAPICalculate = (params = {}) => {
        const config = {
            headers: {
                'token': tokenGHN,
                'shop_id': 4724045
            },
            params: params
        };

        return axios.get("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee", config)
            .then((response) => response.data)
            .catch((error) => console.error("Error calling API:", error));
    };

    let callApiDistrict = (provinceId) => callAPI("district", {'province_id': provinceId});
    let callApiWard = (districtId) => callAPI("ward", {'district_id': districtId});

    let renderDataProvince = () => {
        callAPI("province")
            .then((data) => {
                let row = '<option disabled selected value="">Chọn tỉnh/thành</option>';
                data.data.forEach(element => {
                    row += `<option value="${element.ProvinceID}">${element.ProvinceName}</option>`;
                });
                $("#province").html(row);
            })
            .catch((error) => console.error("Error rendering province data:", error));
    };

    renderDataProvince();

    $("#province").change(() => {
        const provinceId = $("#province").val();
        provinceName = $("#province option:selected").text();
        if (provinceId) {
            callApiDistrict(provinceId)
                .then((data) => renderDataDistrict(data));
        }
    });

    $("#district").change(() => {
        const districtId = $("#district").val();
        districtName = $("#district option:selected").text();
        if (districtId) {
            toDistrictId = districtId;
            callApiWard(districtId)
                .then((data) => renderDataWard(data));
        }
    });

    $("#ward").change(() => {
        toWardCode = $("#ward").val();
        wardName = $("#ward option:selected").text();
        calculateShippingFee();
    });
}

// Hàm render dữ liệu quận/huyện
function renderDataDistrict(data) {
    if (data.code !== 200) {
        console.error('Error fetching districts:', data.message);
        return;
    }
    let row = '<option disabled selected value="">Chọn quận/huyện</option>';
    data.data.forEach(element => {
        row += `<option value="${element.DistrictID}">${element.DistrictName}</option>`;
    });
    $("#district").html(row);
    $("#ward").html('<option disabled selected value="">Chọn phường/xã</option>'); // Reset ward
}

// Hàm render dữ liệu phường/xã
function renderDataWard(data) {
    if (data.code !== 200) {
        console.error('Error fetching wards:', data.message);
        return;
    }
    let row = '<option disabled selected value="">Chọn phường/xã</option>';
    data.data.forEach(element => {
        row += `<option value="${element.WardCode}">${element.WardName}</option>`;
    });
    $("#ward").html(row);
}

// Hàm tính phí vận chuyển dựa trên địa chỉ
async function calculateShippingFee() {
    const fromDistrictId = 1488; // Tỉnh mặc định từ GHN API
    const toDistrictId = document.getElementById("district").value;
    const toWardCode = document.getElementById("ward").value;

    if (!toDistrictId || !toWardCode) {
        document.getElementById('shippingFeeText').textContent = '0 VND';
        updateTotalPrice(0);
        return;
    }

    try {
        const response = await axios.get("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee", {
            headers: {
                'token': 'f40d0301-b206-11ef-81b7-f2563a9a571b',
                'shop_id': 5500083
            },
            params: {
                "service_type_id": 2,
                "insurance_value": 500000,
                "coupon": null,
                "from_district_id": fromDistrictId,
                "to_district_id": toDistrictId,
                "to_ward_code": toWardCode,
                "height": 12,
                "length": 26,
                "weight": 1000,
                "width": 27
            }
        });

        if (response.data.code !== 200) {
            throw new Error(response.data.message);
        }

        let shippingFee = response.data.data.total;
        console.log(shippingFee);
        document.getElementById('shippingFeeText').textContent = `${shippingFee.toLocaleString('vi-VN')} VND`;
        updateTotalPrice(shippingFee);
    } catch (error) {
        console.error('Error calculating shipping fee:', error);
        showNotification('Có lỗi xảy ra khi tính phí vận chuyển.', 'error');
        document.getElementById('shippingFeeText').textContent = '0 VND';
        updateTotalPrice(0);
    }
}

// Hàm cập nhật tổng tiền sau khi tính phí vận chuyển
function updateTotalPrice(shippingFee) {
    const subtotalText = document.getElementById("subtotalText").textContent.replace(/[^0-9]/g, '');
    const subtotal = parseInt(subtotalText);
    const total = subtotal + shippingFee;
    document.getElementById("totalText").textContent = `${total.toLocaleString('vi-VN')} VND`;
}

// Hàm áp dụng voucher (nếu backend hỗ trợ)
async function applyVoucher() {
    const voucherCode = document.getElementById("voucherCode").value.trim();
    if (!voucherCode) {
        showNotification('Vui lòng nhập mã voucher.', 'error');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification('Bạn chưa đăng nhập. Vui lòng đăng nhập để áp dụng voucher.', 'error');
            return;
        }

        // Gọi API để kiểm tra và áp dụng voucher
        const response = await fetch(`http://localhost:8080/api/v1/vouchers/apply?code=${voucherCode}`, { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            showNotification(`Lỗi: ${errorData.message}`, 'error');
            return;
        }

        const voucherData = await response.json();
        showNotification('Áp dụng voucher thành công!', 'success');

        // Cập nhật tổng tiền sau khi áp dụng voucher
        // Giả sử voucherData chứa thông tin giảm giá
        const discount = voucherData.discount || 0; // Thay đổi theo cấu hình backend
        const subtotalText = document.getElementById("subtotalText").textContent.replace(/[^0-9]/g, '');
        const subtotal = parseInt(subtotalText);
        const shippingFeeText = document.getElementById("shippingFeeText").textContent.replace(/[^0-9]/g, '');
        const shippingFee = parseInt(shippingFeeText) || 0;
        const newTotal = subtotal + shippingFee - discount;
        document.getElementById("totalText").textContent = `${newTotal.toLocaleString('vi-VN')} VND`;

    } catch (error) {
        console.error('Error applying voucher:', error);
        showNotification('Có lỗi xảy ra khi áp dụng voucher.', 'error');
    }
}



// Hàm làm trống giỏ hàng sau khi đặt hàng
async function clearCart() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch('http://localhost:8080/api/v1/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        showNotification('Giỏ hàng đã được làm trống.', 'success');
        fetchCartData();
    } catch (error) {
        console.error('Error clearing cart:', error);
        showNotification('Có lỗi xảy ra khi làm trống giỏ hàng.', 'error');
    }
}
