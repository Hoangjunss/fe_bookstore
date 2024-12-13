<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <title>Shop | eCommerce</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="shortcut icon" type="image/x-icon" href="../../static/client_assets/img/icon/favicon.png">

    <!-- CSS Libraries -->
    <link rel="stylesheet" href="../../static/client_assets/css/bootstrap.min.css"><!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/owl.carousel.min.css"><!-- Owl Carousel CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/slicknav.css"><!-- SlickNav CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/flaticon.css"><!-- Flaticon CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/animate.min.css"><!-- Animate CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/price_rangs.css"><!-- Price Rangs CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/magnific-popup.css"><!-- Magnific Popup CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/fontawesome-all.min.css"><!-- FontAwesome CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/themify-icons.css"><!-- Themify Icons CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/slick.css"><!-- Slick Slider CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/nice-select.css"><!-- Nice Select CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/style.css"><!-- Main Style CSS -->

    <style>
        .add-to-cart-link {
            display: inline-block;
            padding: 10px 15px;
            background-color: #4CAF50; /* Green color, bạn có thể thay đổi */
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
            border: none;
            cursor: pointer;
        }

        .add-to-cart-link:hover {
            background-color: #45a049; /* Màu xanh lá cây đậm hơn khi hover */
        }
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
            top: 80px;
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

        .single-items {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.single-items:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.thumb {
    position: relative;
}

.actions {
    position: absolute;
    top: 10px;
    right: 10px;
}

.add-to-cart-link {
    padding: 8px 12px;
    font-size: 14px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-to-cart-link:hover {
    background-color: #45a049;
}

.content {
    padding: 15px;
    text-align: center;
}

.product-title {
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0 5px;
}

.author {
    color: #555;
    font-size: 14px;
    margin: 5px 0;
}

.price {
    color: #333;
    font-size: 16px;
    font-weight: bold;
}

    </style>
</head>
<body>
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
                                <!-- <div class="nav-search search-switch hearer_icon">
                                    <a id="search_1" href="javascript:void(0)">
                                        <span class="flaticon-search"></span>
                                    </a>
                                </div> -->
                            </li>
                            <li><a href="profile.php" id="profileLink"><span class="flaticon-user"></span></a></li>
                            <li class="cart">
                                <a href="cart.php">
                                    <span class="flaticon-shopping-cart"></span>
                                    <!-- Bỏ comment để hiển thị số lượng sản phẩm trong giỏ hàng -->
                                    <!-- <span class="cart-count">0</span> -->
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


    <!-- Hero Area -->
    <div class="hero-area section-bg2">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="slider-area">
                        <div
                            class="slider-height2 slider-bg4 d-flex align-items-center justify-content-center"
                        >
                            <div class="hero-caption hero-caption2">
                                <h2>Category</h2>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb justify-content-center">
                                        <li class="breadcrumb-item">
                                            <a href="index.php">Home</a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">Category</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>

     <!-- Listing Area -->
     <div class="listing-area pt-50 pb-50">
        <div class="container">
            <div class="row">
                <!-- Sidebar -->
                <div class="col-xl-3 col-lg-4 col-md-4">
                    <div class="category-listing mb-50">
                        <div class="single-listing">
                            <div class="select-Categories pb-30">
                                <div class="select-job-items2 mb-30">
                                    <div class="col-xl-12">
                                        <input type="text" class="form-control" id="productName" name="productName"
                                               placeholder="Tên sản phẩm">
                                    </div>
                                </div>

                                <div class="select-job-items2 mb-30">
                                    <div class="col-xl-12">
                                        <select class="form-select form-control mb-4 col-4" id="category" name="category" aria-label="Default select example">
                                            <option value="0">Loại sản phẩm</option>
                                            <!-- Các tùy chọn danh mục sẽ được nạp qua JavaScript -->
                                        </select>
                                    </div>
                                </div>

                                <div class="select-job-items2 mb-30">
                                    <aside class="left_widgets p_filter_widgets price_rangs_aside sidebar_box_shadow mb-40">
                                        <div class="small-tittle">
                                            <h4>Lọc theo giá</h4>
                                        </div>
                                        <div class="widgets_inner">
                                            <div class="range_item">
                                                <form id="filterForm">
                                                    <div class="d-flex justify-content-between">
                                                        <div class="col-6">
                                                            <label for="saleStartPrice">Giá từ:</label>
                                                            <input type="number" class="form-control" id="saleStartPrice" name="saleStartPrice" min="0" placeholder="0">
                                                        </div>
                                                        <div class="col-6">
                                                            <label for="saleEndPrice">Giá đến:</label>
                                                            <input type="number" class="form-control" id="saleEndPrice" name="saleEndPrice" min="0" placeholder="1000">
                                                        </div>
                                                    </div>
                                                    <button type="submit" class="btn btn-primary mt-3">Tìm kiếm</button>
                                                </form>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product Listing -->
                <div class="col-xl-9 col-lg-8 col-md-8">
                    <div class="latest-items latest-items2">
                        <div class="row" id="productContainer">
                            <!-- Sản phẩm sẽ được nạp qua JavaScript -->
                        </div>

                        <!-- Phân trang -->
                        <nav aria-label="...">
                            <ul class="pagination" id="pagination" style="float: right;">
                                <!-- Các trang sẽ được nạp qua JavaScript -->
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
                        <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                            <div class="single-footer-caption mb-50">
                                <div class="footer-tittle">
                                    <h4>Shop Men</h4>
                                    <ul>
                                        <li><a href="#">Clothing Fashion</a></li>
                                        <li><a href="#">Winter</a></li>
                                        <li><a href="#">Summer</a></li>
                                        <li><a href="#">Formal</a></li>
                                        <li><a href="#">Casual</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                            <div class="single-footer-caption mb-50">
                                <div class="footer-tittle">
                                    <h4>Shop Women</h4>
                                    <ul>
                                        <li><a href="#">Clothing Fashion</a></li>
                                        <li><a href="#">Winter</a></li>
                                        <li><a href="#">Summer</a></li>
                                        <li><a href="#">Formal</a></li>
                                        <li><a href="#">Casual</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                            <div class="single-footer-caption mb-50">
                                <div class="footer-tittle">
                                    <h4>Baby Collection</h4>
                                    <ul>
                                        <li><a href="#">Clothing Fashion</a></li>
                                        <li><a href="#">Winter</a></li>
                                        <li><a href="#">Summer</a></li>
                                        <li><a href="#">Formal</a></li>
                                        <li><a href="#">Casual</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                            <div class="single-footer-caption mb-50">
                                <div class="footer-tittle">
                                    <h4>Quick Links</h4>
                                    <ul>
                                        <li><a href="order.php">Track Your Order</a></li>
                                        <li><a href="#">Support</a></li>
                                        <li><a href="#">FAQ</a></li>
                                        <li><a href="#">Carrier</a></li>
                                        <li><a href="#">About</a></li>
                                        <li><a href="#">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom-area">
                <div class="container">
                    <div class="footer-border">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="footer-copy-right text-center">
                                    <p>
                                        Copyright &copy;
                                        <script>
                                            document.write(new Date().getFullYear());
                                        </script>
                                        All rights reserved | This template is made with
                                        <i
                                            class="fa fa-heart color-danger"
                                            aria-hidden="true"
                                        ></i>
                                        by
                                        <a
                                            href="https://colorlib.com"
                                            target="_blank"
                                            rel="nofollow noopener"
                                        >Colorlib</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

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
    <script src="../../static/client_assets/js/vendor/modernizr-3.5.0.min.js"></script> <!-- Modernizr -->
    <script src="../../static/client_assets/js/vendor/jquery-1.12.4.min.js"></script> <!-- jQuery 1.12.4 -->
    <script src="../../static/client_assets/js/popper.min.js"></script> <!-- Popper.js -->
    <script src="../../static/client_assets/js/bootstrap.min.js"></script> <!-- Bootstrap JS -->

    <script src="../../static/client_assets/js/owl.carousel.min.js"></script> <!-- Owl Carousel -->
    <script src="../../static/client_assets/js/slick.min.js"></script> <!-- Slick Slider -->
    <script src="../../static/client_assets/js/jquery.slicknav.min.js"></script> <!-- SlickNav -->

    <script src="../../static/client_assets/js/wow.min.js"></script> <!-- WOW.js -->
    <script src="../../static/client_assets/js/jquery.magnific-popup.js"></script> <!-- Magnific Popup -->
    <script src="../../static/client_assets/js/jquery.nice-select.min.js"></script> <!-- Nice Select -->
    <script src="../../static/client_assets/js/jquery.counterup.min.js"></script> <!-- Counter-Up -->
    <script src="../../static/client_assets/js/waypoints.min.js"></script> <!-- Waypoints -->
    <script src="../../static/client_assets/js/price_rangs.js"></script> <!-- Price Rangs -->

    <script src="../../static/client_assets/js/contact.js"></script> <!-- Contact JS -->
    <script src="../../static/client_assets/js/jquery.form.js"></script> <!-- jQuery Form -->
    <script src="../../static/client_assets/js/jquery.validate.min.js"></script> <!-- jQuery Validate -->
    <script src="../../static/client_assets/js/mail-script.js"></script> <!-- Mail Script -->
    <script src="../../static/client_assets/js/jquery.ajaxchimp.min.js"></script> <!-- AjaxChimp -->

    <script src="../../static/client_assets/js/plugins.js"></script> <!-- Plugins JS -->
    <script src="../../static/client_assets/js/main.js"></script> <!-- Main JS -->

    <!-- Custom JavaScript -->
    <script src="../../static/call-api/client/view-products.js"></script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"></script><!-- Google Analytics -->
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag("js", new Date());

        gtag("config", "UA-23581568-13");
    </script>
</body>
</html>
