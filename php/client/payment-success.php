<!doctype html>
<html class="no-js" lang="vi">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Shop | eCommerce - Payment Status</title>
    <meta name="description" content="Payment Status Page">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- Favicon -->
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
    
    <!-- ionRangeSlider CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ion-rangeslider/css/ion.rangeSlider.min.css">

    <!-- Custom CSS Styles -->
    <style>
        /* Notification Styles */
        .notification {
            display: none; /* Hidden by default */
            position: fixed;
            top: 20px;
            right: 20px;
            min-width: 250px;
            max-width: 350px;
            padding: 15px 20px;
            border-radius: 5px;
            color: #fff;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .notification.show {
            display: flex;
            align-items: center;
            justify-content: space-between;
            opacity: 1;
            transform: translateX(0);
        }

        .notification.success {
            background-color: #28a745;
        }

        .notification.error {
            background-color: #dc3545;
        }

        .notification.info {
            background-color: #17a2b8;
        }

        .notification .close-btn {
            margin-left: 15px;
            cursor: pointer;
            font-weight: bold;
            background: none;
            border: none;
            color: #fff;
            font-size: 16px;
        }

        /* Payment Result Styles */
        .payment-result-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 70vh;
            text-align: center;
            padding: 20px;
        }

        .payment-result-card {
            width: 100%;
            max-width: 500px;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .payment-result-card:hover {
            transform: translateY(-5px);
        }

        .payment-result-card.success {
            border-top: 5px solid #28a745;
            background-color: #e9f7ef;
        }

        .payment-result-card.error {
            border-top: 5px solid #dc3545;
            background-color: #f8d7da;
        }

        .payment-result-card .icon {
            font-size: 50px;
            margin-bottom: 20px;
        }

        .payment-result-card.success .icon {
            color: #28a745;
        }

        .payment-result-card.error .icon {
            color: #dc3545;
        }

        .payment-result-card h2 {
            margin-bottom: 15px;
            font-size: 24px;
            font-weight: bold;
        }

        .payment-result-card p {
            margin-bottom: 25px;
            font-size: 16px;
        }

        .payment-result-card .btn-custom {
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            display: inline-block;
        }

        .payment-result-card.success .btn-custom {
            background-color: #28a745;
            color: #fff;
        }

        .payment-result-card.success .btn-custom:hover {
            background-color: #218838;
            color: #fff;
        }

        .payment-result-card.error .btn-custom {
            background-color: #dc3545;
            color: #fff;
        }

        .payment-result-card.error .btn-custom:hover {
            background-color: #c82333;
            color: #fff;
        }
    </style>
</head>

<body>

    <!-- Notification Container -->
    <div id="notification-container"></div>

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
            <!-- Header Top -->
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
                                        <li><span id="userEmail">Hello, user@example.com</span></li>
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

            <!-- Header Mid -->
            <div class="header-mid header-sticky">
                <div class="container">
                    <div class="menu-wrapper">

                        <!-- Logo -->
                        <div class="logo">
                            <a href="index.php"><img src="../../static/client_assets/img/logo/logo.png" alt="Logo"></a>
                        </div>

                        <!-- Main Menu -->
                        <div class="main-menu d-none d-lg-block">
                            <nav>
                                <ul id="navigation">
                                    <li><a href="index.php">Home</a></li>
                                    <li><a href="view-products.php">Products</a></li>
                                    <!-- Thêm các liên kết khác nếu cần -->
                                </ul>
                            </nav>
                        </div>

                        <!-- Header Right -->
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
                                        <!-- Biểu tượng số lượng sản phẩm trong giỏ hàng sẽ được thêm vào đây qua JavaScript -->
                                        <!-- <span class="cart-count">3</span> -->
                                    </a>
                                </li>
                                <li id="auth-button">
                                    <!-- Nút Login hoặc Logout sẽ được cập nhật qua JavaScript -->
                                </li>
                            </ul>
                        </div>

                    </div>

                    <!-- Search Input -->
                    <div class="search_input" id="search_input_box">
                        <form class="search-inner d-flex justify-content-between">
                            <input type="text" class="form-control" id="search_input" placeholder="Search Here">
                            <button type="submit" class="btn"></button>
                            <span class="ti-close" id="close_search" title="Close Search"></span>
                        </form>
                    </div>

                    <!-- Mobile Menu -->
                    <div class="col-12">
                        <div class="mobile_menu d-block d-lg-none"></div>
                    </div>
                </div>
            </div>

            <!-- Header Bottom -->
            <div class="header-bottom text-center">
                <p>Sale Up To 50% Biggest Discounts. Hurry! Limited Period Offer <a href="#" class="btn btn-light">Shop Now</a></p>
            </div>
        </div>
    </header>

    <!-- Main Content: Payment Result -->
    <main>
        <div class="payment-result-container">
            <div id="paymentResult" class="payment-result-card">
                <!-- Content sẽ được JavaScript cập nhật -->
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <!-- Footer content remains unchanged -->
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
                                        <input type="email" placeholder="Enter your email" required>
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

                <div class="container">
                    <div class="row justify-content-between">
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-8">
                            <div class="single-footer-caption mb-50">
                                <div class="single-footer-caption mb-20">

                                    <div class="footer-logo mb-35">
                                        <a href="index.php"><img src="../../static/client_assets/img/logo/logo2_footer.png" alt="Footer Logo"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Other footer columns omitted for brevity -->
                    </div>
                </div>
            </div>

            <div class="footer-bottom-area">
                <div class="container">
                    <div class="footer-border">
                        <div class="row">
                            <div class="col-xl-12 ">
                                <div class="footer-copy-right text-center">
                                    <p>Copyright &copy;<script>
                                            document.write(new Date().getFullYear());
                                        </script>
                                        All rights reserved | This template is made with <i class="fa fa-heart color-danger"
                                            aria-hidden="true"></i> by <a
                                            href="https://colorlib.com" target="_blank"
                                            rel="nofollow noopener">Colorlib</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </footer>

    <!-- Back to Top -->
    <div id="back-top">
        <a class="wrapper" title="Go to Top" href="#">
            <div class="arrows-container">
                <div class="arrow arrow-one">
                </div>
                <div class="arrow arrow-two">
                </div>
            </div>
        </a>
    </div>

    <!-- JavaScript Libraries -->
    <!-- Load jQuery first -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

    <!-- ionRangeSlider JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/ion-rangeslider/js/ion.rangeSlider.min.js"></script>

    <!-- Vendor Libraries -->
    <script src="../../static/client_assets/js/vendor/modernizr-3.5.0.min.js"></script>
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

    <!-- Additional Libraries and Custom Scripts -->
    <script src="../../static/client_assets/js/contact.js"></script>
    <script src="../../static/client_assets/js/jquery.form.js"></script>
    <script src="../../static/client_assets/js/jquery.validate.min.js"></script>
    <script src="../../static/client_assets/js/mail-script.js"></script>
    <script src="../../static/client_assets/js/jquery.ajaxchimp.min.js"></script>
    <script src="../../static/client_assets/js/plugins.js"></script>
    <script src="../../static/client_assets/js/main.js"></script>
    <script src="../../static/client_assets/js/axios.min.js"></script>
    <script src="../../static/call-api/client/payment-success.js"></script>

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'UA-23581568-13');
    </script>

</body>

</html>
