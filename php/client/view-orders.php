<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Shop | eCommerce</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
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

    <script src="../../static/call-api/client/view-orders.js"></script>
</head>
<body>
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
                                    <li><span id="userEmail">Hello, user@example.com</span></li>
                                    <li><a href="/client/track-order.html">Track Your Order</a></li>
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
                        <a href="/client/home.html"><img src="../../static/client_assets/img/logo/logo.png" alt="Logo"></a>
                    </div>
                    <div class="main-menu d-none d-lg-block">
                        <nav>
                            <ul id="navigation">
                                <li><a href="/client/home.html">Home</a></li>
                                <li><a href="/client/product.html">Products</a></li>
                                <li><a href="/client/orders.html">Orders</a></li>
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
                            <li><a href="/client/profile.html"><span class="flaticon-user"></span></a></li>
                            <li class="cart"><a href="/client/cart.html"><span class="flaticon-shopping-cart"></span></a></li>
                        </ul>
                    </div>
                </div>
                <div class="search_input" id="search_input_box">
                    <form class="search-inner d-flex justify-content-between" action="/client/search.html" method="get">
                        <input type="text" class="form-control" id="search_input" name="query" placeholder="Search Here" required />
                        <button type="submit" class="btn"><i class="fas fa-search"></i></button>
                        <span class="ti-close" id="close_search" title="Close Search"></span>
                    </form>
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
    <div class="hero-area section-bg2">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="slider-area">
                        <div class="slider-height2 slider-bg4 d-flex align-items-center justify-content-center">
                            <div class="hero-caption hero-caption2">
                                <h2>Orders</h2>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb justify-content-center">
                                        <li class="breadcrumb-item"><a href="/client/home.html">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Orders</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>

    <section class="blog_area">
        <div class="container">
            <div class="row">
                <!-- Left Sidebar -->
                <div class="col-lg-8 mb-5 mb-lg-0">
                    <div class="blog_left_sidebar">
                        <div id="orderContainer" class="blog_container">
                           <!-- Orders sẽ được hiển thị tại đây -->
                        </div>
                        <!-- Pagination -->
                        <nav aria-label="Page navigation example">
                            <ul class="pagination" id="pagination" style="float: right;">
                                <!-- Các nút phân trang sẽ được tạo động bằng JavaScript -->
                            </ul>
                        </nav>
                    </div>
                </div>
                <!-- Right Sidebar -->
                <div class="col-lg-4">
                    <!-- Sidebar Content -->
                    <!-- Thêm các nội dung sidebar tĩnh khác nếu cần -->
                </div>
            </div>
        </div>
    </section>
</main>

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

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"></script>
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
