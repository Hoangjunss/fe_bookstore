<!DOCTYPE html>
<html class="no-js" lang="zxx">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <title>Shop | eCommerce</title>
    <meta name="description" content/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="shortcut icon" type="image/x-icon" href="../../static/client_assets/img/icon/favicon.png">

    <!-- CSS Libraries -->
    <link rel="stylesheet" href="../../static/client_assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../static/client_assets/css/style.css">
</head>
<body>
<!-- Preloader -->
<div id="preloader-active">
    <div class="preloader d-flex align-items-center justify-content-center">
        <div class="preloader-inner position-relative">
            <div class="preloader-circle"></div>
            <div class="preloader-img pere-text">
                <img src="../../static/client_assets/img/icon/loder.png" alt="loader">
            </div>
        </div>
    </div>
</div>

<header>
    <div class="header-area">
        <div class="header-top d-none d-sm-block">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="d-flex justify-content-between flex-wrap align-items-center">
                            <div class="header-info-left">
                                <ul>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Privacy</a></li>
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="#">Careers</a></li>
                                </ul>
                            </div>
                            <div class="header-info-right d-flex">
                                <ul class="order-list">
                                    <li><a href="#">My Wishlist</a></li>
                                    <li><a href="order.html">Track Your Order</a></li>
                                </ul>
                                <ul class="header-social">
                                    <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-mid header-sticky">
            <div class="container">
                <div class="menu-wrapper">
                    <div class="logo">
                        <a href="home.html"><img src="../../static/client_assets/img/logo/logo.png" alt="Logo"></a>
                    </div>

                    <div class="main-menu d-none d-lg-block">
                        <nav>
                            <ul id="navigation">
                                <li><a href="home.html">Home</a></li>
                                <li><a href="product.html">Products</a></li>
                            </ul>
                        </nav>
                    </div>

                    <div class="header-right">
                        <ul>
                            <li>
                                <div class="nav-search search-switch hearer_icon">
                                    <a id="search_1" href="javascript:void(0)">
                                        <span class="flaticon-search"></span>
                                    </a>
                                </div>
                            </li>
                            <li><a href="profile.html"><span class="flaticon-user"></span></a></li>
                            <li class="cart"><a href="cart.html"><span class="flaticon-shopping-cart"></span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>

<main>
    <!-- Giỏ hàng -->
    <section class="checkout_area">
        <div class="container">
            <div class="billing_details">
                <div class="row">
                    <div class="col-lg-8">
                        <h3>Billing Details</h3>

                        <div class="col-md-6 form-group p_star">
                            <input type="text" class="form-control" id="first" name="name" placeholder="Full Name"/>
                        </div>
                        <!-- Các phần nhập thông tin khác ở đây -->
                    </div>

                    <div class="col-lg-4">
                        <div class="order_box">
                            <h2>Your Order</h2>
                            <ul class="list" id="cart-items">
                                <!-- Cart items will be fetched and added here -->
                            </ul>
                            <ul class="list list_2">
                                <li><a href="#">Subtotal <span id="subtotalText">0 VND</span></a></li>
                                <li><a href="#">Shipping <span id="shippingFeeText">0 VND</span></a></li>
                                <li><a href="#">Total <span id="totalText">0 VND</span></a></li>
                            </ul>
                            <button class="btn w-100" onclick="pay()" id="pay-btn">Proceed to VNPay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<footer>
    <div class="footer-wrapper gray-bg">
        <div class="footer-area footer-padding">
            <section class="subscribe-area">
                <div class="container">
                    <div class="row justify-content-between subscribe-padding">
                        <div class="col-xxl-3 col-xl-3 col-lg-4">
                            <div class="subscribe-caption">
                                <h3>Subscribe Newsletter</h3>
                                <p>Subscribe newsletter to get 5% on all products.</p>
                            </div>
                        </div>
                        <div class="col-xxl-5 col-xl-6 col-lg-7 col-md-9">
                            <div class="subscribe-caption">
                                <form action="#">
                                    <input type="text" placeholder="Enter your email"/>
                                    <button class="subscribe-btn">Subscribe</button>
                                </form>
                            </div>
                        </div>
                        <div class="col-xxl-2 col-xl-2 col-lg-4">
                            <div class="footer-social">
                                <a href="https://bit.ly/sai4ull"><i class="fab fa-facebook"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</footer>

<!-- Đoạn script của bạn -->
<script src="../../static/client_assets/js/vendor/jquery-1.12.4.min.js"></script>
<script src="../../static/client_assets/js/bootstrap.min.js"></script>
<script>
    let cartItems = [];
    let subtotal = 0;

    // Fetch cart data
    async function fetchCartData() {
        try {
            const response = await fetch('http://localhost:8080/api/v1/cart', { method: 'GET' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            cartItems = await response.json();
            renderCart(cartItems);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }

    function renderCart(products) {
        const cartItemsContainer = document.getElementById("cart-items");
        subtotal = products.reduce((sum, item) => sum + item.totalPrice, 0);
        products.forEach(product => {
            const item = `<li>${product.productName} x ${product.quantity} <span>${product.totalPrice.toLocaleString('vi-VN')} VND</span></li>`;
            cartItemsContainer.insertAdjacentHTML('beforeend', item);
        });
        document.getElementById("subtotalText").textContent = `${subtotal.toLocaleString('vi-VN')} VND`;
        document.getElementById("totalText").textContent = `${subtotal.toLocaleString('vi-VN')} VND`;
    }

    async function placeOrder() {
        // Tạo dữ liệu địa chỉ
        const address = {
            province: document.getElementById("province").value,
            district: document.getElementById("district").value,
            ward: document.getElementById("ward").value,
            detail: document.getElementById("detailAddress").value
        };

        // Tạo đơn hàng
        const orderData = {
            userId: 1,  // Thay đổi thành ID người dùng thực tế
            quantity: cartItems.length,
            totalPrice: subtotal,
            address: address,
            orderDetailCreateDTOS: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.priceOfOne,
                totalPrice: item.totalPrice
            }))
        };

        // Gọi API tạo đơn hàng
        try {
            const response = await fetch('http://localhost:8080/api/v1/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) throw new Error(`Failed to create order: ${response.status}`);
            const createdOrder = await response.json();
            alert("Order placed successfully!");
            console.log("Created order:", createdOrder);
        } catch (error) {
            console.error("Error placing order:", error);
        }
    }

    document.addEventListener("DOMContentLoaded", fetchCartData);
</script>
<script>
    $(document).ready(function () {
        let provinceName = '';
        let districtName = '';
        let wardName = '';
        let fromDistrictId = 1488;
        let toDistrictId = '';
        let toWardCode = '';

        const host = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";
        const token = '5f440054-8c34-11ee-af43-6ead57e9219a';

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
                    let row = '<option disabled value="">Chọn tỉnh/thành</option>';
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
                document.getElementById('shippingFee').value = shippingFee;
                document.getElementById('shippingFeeText').textContent = `${shippingFee.toLocaleString('vi-VN')} VND`;
            });
        });

    });
</script>
<script src="../../static/client_assets/js/axios.min.js"></script>
<script src="../../static/client_assets/js/plugins.js"></script>
<script src="../../static/client_assets/js/main.js"></script>
</body>
</html>
