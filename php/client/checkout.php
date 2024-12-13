<!DOCTYPE html>
<html class="no-js" lang="zxx">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <title>Shop | eCommerce - Checkout</title>
    <meta name="description" content/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="shortcut icon" type="image/x-icon" href="../../static/client_assets/img/icon/favicon.png">

    <!-- CSS Libraries -->
    <link rel="stylesheet" href="../../static/client_assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../static/client_assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="../../static/client_assets/css/slicknav.css">
    <link rel="stylesheet" href="../../static/client_assets/css/flaticon.css">
    <link rel="stylesheet" href="../../static/client_assets/css/animate.min.css">
    <link rel="stylesheet" href="../../static/client_assets/css/price_rangs.css">
    <link rel="stylesheet" href="../../static/client_assets/css/magnific-popup.css">
    <link rel="stylesheet" href="../../static/client_assets/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="../../static/client_assets/css/themify-icons.css">
    <link rel="stylesheet" href="../../static/client_assets/css/slick.css">
    <link rel="stylesheet" href="../../static/client_assets/css/nice-select.css">
    <link rel="stylesheet" href="../../static/client_assets/css/style.css">

    <!-- Notification CSS -->
    <style>
        /* Style cho thông báo */
        .notification {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 250px;
            max-width: 350px;
            padding: 15px 20px;
            margin-bottom: 10px;
            border-radius: 5px;
            color: #fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transform: translateX(100%);
            transition: opacity 0.5s ease, transform 0.5s ease;
            position: relative;
        }

        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }

        .notification.success {
            background-color: #28a745; /* Màu xanh lá cho thành công */
        }

        .notification.error {
            background-color: #dc3545; /* Màu đỏ cho lỗi */
        }

        .notification.info {
            background-color: #17a2b8; /* Màu xanh dương cho thông tin */
        }

        .notification .close-btn {
            margin-left: 15px;
            cursor: pointer;
            font-weight: bold;
            color: #fff;
            background: none;
            border: none;
            font-size: 16px;
        }

        /* Điều chỉnh biểu tượng giỏ hàng để hiển thị số lượng */
        .cart {
            position: relative;
        }

        .cart-count {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: #dc3545;
            color: #fff;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
            font-weight: bold;
        }

        /* Styles cho các phần mới */
        .voucher-section {
            margin-top: 20px;
        }

        .payment-method {
            margin-top: 20px;
        }

        .address-section {
            margin-top: 20px;
        }

        .form-group input, .form-group select {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            box-sizing: border-box;
        }

        .order-summary {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <!-- Notification Container -->
    <div id="notification-container" style="position: fixed; top: 20px; right: 20px; z-index: 1000;"></div>

    <!-- Preloader -->
    <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                    <img src="../../static/client_assets/img/icon/loder.png" alt="Loader">
                </div>
            </div>
        </div>
    </div>

    <!-- Header -->
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
                                        <li><span id="userEmail">Hello, Guest</span></li>
                                        <li><a href="view-orders.php">Track Your Order</a></li>
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
                            <a href="index.php"><img src="../../static/client_assets/img/logo/logo.png" alt="Logo"></a>
                        </div>
                        <div class="main-menu d-none d-lg-block">
                            <nav>
                                <ul id="navigation">
                                    <li><a href="index.php">Home</a></li>
                                    <li><a href="view-products.php">Products</a></li>
                                    <!-- Thêm các liên kết khác nếu cần -->
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
                                <li><a href="profile.php" id="profileLink"><span class="flaticon-user"></span></a></li>
                                <li class="cart">
                                    <a href="cart.php">
                                        <span class="flaticon-shopping-cart"></span>
                                        <!-- Thêm số lượng sản phẩm trong giỏ hàng -->
                                        <span class="cart-count">0</span>
                                    </a>
                                </li>
                                <li id="auth-button">
                                    <!-- Nút Login hoặc Logout sẽ được cập nhật qua JavaScript -->
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mobile_menu d-block d-lg-none"></div>
                    </div>
                </div>
            </div>
            <div class="header-bottom text-center">
                <p>Sale Up To 50% Biggest Discounts. Hurry! Limited Period Offer <a href="#" class="browse-btn">Shop Now</a></p>
            </div>
        </div>
    </header>

    <main>
        <!-- Hero Area -->
        <div class="hero-area section-bg2">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="slider-area">
                            <div class="slider-height2 slider-bg4 d-flex align-items-center justify-content-center">
                                <div class="hero-caption hero-caption2">
                                    <h2>Checkout</h2>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb justify-content-center">
                                            <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Checkout Section -->
        <section class="checkout_area">
            <div class="container">
                <div class="billing_details">
                    <form id="checkoutForm">
                        <div class="row">
                            <!-- Billing Details -->
                            <div class="col-lg-8">
                                <h3>Billing Details</h3>
                                <div class="row">
                                    <div class="col-md-6 form-group p_star">
                                        <label for="fullName">Full Name</label>
                                        <input type="text" class="form-control" id="fullName" name="fullName" placeholder="Full Name" required/>
                                    </div>
                                    <div class="col-md-6 form-group p_star">
                                        <label for="phone">Phone Number</label>
                                        <input type="text" class="form-control" id="phone" name="phone" placeholder="Phone Number" required/>
                                    </div>
                                    <div class="col-md-12 form-group p_star">
                                        <label for="email">Email Address</label>
                                        <input type="email" class="form-control" id="email" name="email" placeholder="Email Address" required/>
                                    </div>
                                    <div class="col-md-12 form-group p_star">
                                        <label for="province">Province/City</label>
                                        <select id="province" name="province" class="form-control" required>
                                            <option disabled selected value="">Chọn tỉnh/thành</option>
                                        </select>
                                    </div>
                                    <!-- Chọn tỉnh thành -->
                                    <div class="col-md-12 form-group p_star">
                                        <label for="district">District</label>
                                        <select id="district" name="district" class="form-control" required>
                                            <option disabled selected value="">Chọn quận/huyện</option>
                                        </select>
                                    </div>
                                    <div class="col-md-12 form-group p_star">
                                        <label for="ward">Ward</label>
                                        <select id="ward" name="ward" class="form-control" required>
                                            <option disabled selected value="">Chọn phường/xã</option>
                                        </select>
                                    </div>
                                    <div class="col-md-12 form-group p_star">
                                        <label for="detailAddress">Detailed Address</label>
                                        <input type="text" class="form-control" id="detailAddress" name="detailAddress" placeholder="Street Address" required/>
                                    </div>
                                </div>

                                <!-- Voucher Section -->
                                <!-- <div class="voucher-section">
                                    <h4>Apply Voucher</h4>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="voucherCode" name="voucherCode" placeholder="Enter voucher code"/>
                                        <button type="button" class="btn btn-primary mt-2" onclick="applyVoucher()">Apply Voucher</button>
                                    </div>
                                </div> -->

                                <!-- Payment Method Section -->
                                <div class="payment-method">
                                    <h4>Select Payment Method</h4>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="paymentMethod" id="cash" value="CASH" checked>
                                        <label class="form-check-label" for="cash">
                                            Cash on Delivery (CASH)
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="paymentMethod" id="vnpay" value="VNPAY">
                                        <label class="form-check-label" for="vnpay">
                                            VNPay
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Order Summary -->
                            <div class="col-lg-4">
                                <div class="order_box">
                                    <h2>Your Order</h2>
                                    <ul class="list" id="cart-items">
                                        <!-- Cart items sẽ được fetch và thêm vào đây bởi JavaScript -->
                                    </ul>
                                    <ul class="list list_2">
                                        <li><a href="#">Subtotal <span id="subtotalText">0 VND</span></a></li>
                                        <li><a href="#">Shipping <span id="shippingFeeText">0 VND</span></a></li>
                                        <li><a href="#">Total <span id="totalText">0 VND</span></a></li>
                                    </ul>
                                    <button class="btn w-100" type="submit" id="checkout-btn">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
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
                                    <form id="newsletterForm">
                                        <input type="email" name="newsletter_email" id="newsletter_email" placeholder="Enter your email" required />
                                        <button class="subscribe-btn" type="submit">Subscribe</button>
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

    <!-- Back to Top -->
    <div id="back-top">
        <a class="wrapper" title="Go to Top" href="#">
            <div class="arrows-container">
                <div class="arrow arrow-one"></div>
                <div class="arrow arrow-two"></div>
            </div>
        </a>
    </div>

    <!-- JS Libraries -->
    <script src="../../static/client_assets/js/vendor/modernizr-3.5.0.min.js"></script>
    <script src="../../static/client_assets/js/vendor/jquery-1.12.4.min.js"></script>
    <script src="../../static/client_assets/js/popper.min.js"></script>
    <script src="../../static/client_assets/js/bootstrap.min.js"></script>
    <script src="../../static/client_assets/js/owl.carousel.min.js"></script>
    <script src="../../static/client_assets/js/slick.min.js"></script>
    <script src="../../static/client_assets/js/jquery.slicknav.min.js"></script>
    <script src="../../static/client_assets/js/wow.min.js"></script>
    <script src="../../static/client_assets/js/jquery.magnific-popup.js"></script>
    <script src="../../static/client_assets/js/jquery.nice-select.min.js"></script>
    <script src="../../static/client_assets/js/jquery.counterup.min.js"></script>
    <script src="../../static/client_assets/js/waypoints.min.js"></script>
    <script src="../../static/client_assets/js/price_rangs.js"></script>
    <script src="../../static/client_assets/js/contact.js"></script>
    <script src="../../static/client_assets/js/jquery.form.js"></script>
    <script src="../../static/client_assets/js/jquery.validate.min.js"></script>
    <script src="../../static/client_assets/js/mail-script.js"></script>
    <script src="../../static/client_assets/js/jquery.ajaxchimp.min.js"></script>
    <script src="../../static/client_assets/js/plugins.js"></script>
    <script src="../../static/client_assets/js/main.js"></script>
    <script src="../../static/client_assets/js/axios.min.js"></script>

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "UA-23581568-13");
    </script>

    <!-- Custom JavaScript for Checkout -->
    <script src="../../static/call-api/client/checkout.js"></script>
</body>
</html>
