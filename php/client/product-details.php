<!DOCTYPE html>
<html class="no-js" lang="zxx">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Shop | eCommerce</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" type="image/x-icon" href="../../static/client_assets/img/icon/favicon.png">

    <!-- CSS Libraries -->
    <link rel="stylesheet" href="../../static/client_assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../static/client_assets/css/flaticon.css"> <!-- Flaticon CSS -->
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
                    <!-- Header Right -->
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
                            <li><a href="profile.php"><span class="flaticon-user"></span></a></li>
                            <li class="cart">
                                <a href="cart.php">
                                    <span class="flaticon-shopping-cart"></span>
                                    <!-- Bỏ comment để hiển thị số lượng sản phẩm trong giỏ hàng -->
                                    <!-- <span class="cart-count">0</span> -->
                                </a>
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
            <p>Sale Up To 50% Biggest Discounts. Hurry! Limited Period Offer <a href="#" class="browse-btn">Shop Now</a></p>
        </div>
    </div>
</header>
    <!-- Main Content -->
    <main>
        <!-- Hero Area -->
        <div class="hero-area section-bg2">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="slider-area">
                            <div class="slider-height2 slider-bg4 d-flex align-items-center justify-content-center">
                                <div class="hero-caption hero-caption2">
                                    <h2>Product Details</h2>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb justify-content-center">
                                            <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Product Details</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>

         <!-- Product Details Section -->
         <div class="services-area2 pt-50" id="product-details">
             <!-- Product details sẽ được tải tại đây bởi JavaScript -->
         </div>

         <!-- Related Products Section -->
         <div class="related-products-area pt-50 pb-50">
             <div class="container">
                 <div class="section-title text-center mb-40">
                     <h2>Related Products</h2>
                 </div>
                 <div class="row" id="relatedProductContainer">
                     <!-- Sản phẩm liên quan sẽ được nạp qua JavaScript -->
                 </div>
             </div>
         </div>
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
    <!-- Vendor Libraries -->
    <script src="../../static/client_assets/js/vendor/jquery-1.12.4.min.js"></script>
    <script src="../../static/client_assets/js/bootstrap.min.js"></script>
    <script src="../../static/client_assets/js/main.js"></script>

    <!-- Custom JavaScript -->
    <script src="../../static/call-api/client/product-detail.js"></script>
</body>
</html>
