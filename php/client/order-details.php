<!DOCTYPE html>
<html class="no-js" lang="vi">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <title>Shop | eCommerce</title>
    <meta name="description" content=""/>
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

    <script src="../../static/call-api/client/order-details.js"></script>
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
                                    <li><span id="userEmail">Hello, nguyenvana@example.com</span></li>
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
                                <li><a href="client/index.php">Home</a></li>
                                <li><a href="client/view-products.php">Products</a></li>
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
                            <li><a href="client/profile.php"><span class="flaticon-user"></span></a></li>
                            <li class="cart"><a href="client/cart.php"><span class="flaticon-shopping-cart"></span></a></li>
                            <li id="auth-button">
                                    <!-- Nút Login hoặc Logout sẽ được cập nhật qua JavaScript -->
                                </li>
                        </ul>

                    </div>
                </div>

                <div class="search_input" id="search_input_box">
                    <form class="search-inner d-flex justify-content-between">
                        <input type="text" class="form-control" id="search_input" placeholder="Search Here">
                        <button type="submit" class="btn"></button>
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
                                        <li class="breadcrumb-item">
                                            <a href="index.php">Home</a>
                                        </li>
                                        <li class="breadcrumb-item"><a href="#">Orders</a></li>
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
                        <!-- Không cần sử dụng input ẩn để lưu ID, lấy từ URL bằng JS -->

                        <div class="order-details">
                            <h2>ORDER: # <span id="orderId">Loading...</span></h2>
                            <p>Ngày: <span id="orderDate">Loading...</span></p>

                            <h3>THÔNG TIN KHÁCH HÀNG</h3>
                            <p>Họ tên: <span id="customerName">Loading...</span></p>
                            <p>Điện thoại: <span id="customerPhone">Loading...</span></p>
                            <p>Địa chỉ: <span id="customerAddress">Loading...</span></p>

                            <h3>THÔNG TIN ĐƠN HÀNG</h3>
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th style="width: 100px">STT</th>
                                    <th style="width: 300px">Tên hàng</th>
                                    <th style="width: 200px">Đơn giá</th>
                                    <th style="width: 200px">Số lượng</th>
                                    <th style="width: 200px">Thành tiền</th>
                                </tr>
                                </thead>
                                <tbody id="orderDetailsBody">
                                <!-- Order details sẽ được tải tại đây bởi JavaScript -->
                                </tbody>
                            </table>

                            <p>Phí ship: <span class="shipping-fee">Loading...</span></p>
                            <p>Tổng tiền: <span class="total-cost">Loading...</span></p>
                            <p>Trạng thái đơn hàng: <b class="order-status">Loading...</b></p>
                        </div>

                        <nav class="blog-pagination justify-content-center d-flex">
                            <ul class="pagination">
                                <li class="page-item">
                                    <a href="#" class="page-link" aria-label="Previous">
                                        <i class="ti-angle-left"></i>
                                    </a>
                                </li>
                                <li class="page-item"><a href="#" class="page-link">1</a></li>
                                <li class="page-item active"><a href="#" class="page-link">2</a></li>
                                <li class="page-item">
                                    <a href="#" class="page-link" aria-label="Next">
                                        <i class="ti-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <!-- Right Sidebar -->
                <div class="col-lg-4">
                    <div class="blog_right_sidebar">
                        <!-- Sidebar Widgets Omitted for Brevity -->
                    </div>
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
<script src="../../static/client_assets/js/jquery-3.7.1.min.js"></script>
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

<!-- JavaScript to Fetch Order Details -->

</body>
</html>
