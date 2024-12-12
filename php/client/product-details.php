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
    <link rel="stylesheet" href="../../static/client_assets/css/slicknav.css"><!-- SlickNav CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/slick.css"><!-- Slick Slider CSS -->
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
            top: 80px;
        }

        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }

        .notification.success {
            background-color: #28a745;
            /* Màu xanh lá cho thành công */
        }

        .notification.error {
            background-color: #dc3545;
            /* Màu đỏ cho lỗi */
        }

        .notification.info {
            background-color: #17a2b8;
            /* Màu xanh dương cho thông tin */
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

        /* .cart-count {
                position: absolute;
                top: -8px;
                right: -8px;
                background-color: #dc3545;
                color: #fff;
                border-radius: 50%;
                padding: 2px 6px;
                font-size: 12px;
                font-weight: bold;
            } */
            .product-details-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
    height: 400px;
    background-color: #fff;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures image fits without distortion */
}

.product-info {
    padding: 20px;
}

.product-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.product-price {
    color: #dc3545;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.product-info p {
    font-size: 16px;
    color: #555;
    margin-bottom: 5px;
}

.add-to-cart-btn, .share-btn {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-to-cart-btn {
    background-color: #28a745;
    color: #fff;
}

.add-to-cart-btn:hover {
    background-color: #218838;
}

.share-btn {
    background-color: #007bff;
    color: #fff;
    margin-left: 10px;
}

.share-btn:hover {
    background-color: #0069d9;
}

/* Phần Related Products Area */
.related-products-area {
    background-color: #f9f9f9; /* Màu nền nhẹ cho phần liên quan */
    padding: 50px 0;
}

.section-title h2 {
    font-size: 2em;
    font-weight: 700;
    margin-bottom: 20px;
    color: #333;
}

.single-items {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%; /* Đảm bảo ô sản phẩm chiếm toàn bộ chiều cao của hàng */
}

.single-items:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.thumb {
    position: relative;
    overflow: hidden;
    height: 300px; /* Đặt chiều cao cố định phù hợp */
}

.thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Giữ tỷ lệ và lấp đầy container */
    transition: transform 0.3s ease;
}

.single-items:hover .thumb img {
    transform: scale(1.05);
}

.actions {
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.single-items:hover .actions {
    opacity: 1;
}

.actions button {
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.actions button:hover {
    background-color: rgba(255, 255, 255, 1);
}

.content {
    padding: 20px;
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.content h4 {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #555;
    transition: color 0.3s ease;
}

.content h4 a {
    text-decoration: none;
    color: inherit;
}

.content h4 a:hover {
    color: #007bff; /* Màu xanh khi hover */
}

.content .price {
    font-size: 1.1em;
    font-weight: 600;
    color: #28a745; /* Màu xanh lá cho giá */
}

.rating {
    margin-bottom: 10px;
}

.rating i {
    color: #ffc107; /* Màu vàng cho sao */
    margin-right: 2px;
    font-size: 1em;
}

@media (max-width: 992px) {
    .single-items {
        margin-bottom: 30px;
    }
}

@media (max-width: 768px) {
    .related-products-area {
        padding: 30px 0;
    }

    .section-title h2 {
        font-size: 1.8em;
    }

    .content h4 {
        font-size: 1.1em;
    }

    .content .price {
        font-size: 1em;
    }
}

/* Nút "Add to Cart" */
.add-to-cart-link {
    background-color: #ff5722; /* Màu cam nổi bật */
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.add-to-cart-link:hover {
    background-color: #e64a19;
    transform: translateY(-2px);
}

/* Thêm khoảng cách giữa các cột sản phẩm */
#relatedProductContainer .col-lg-3,
#relatedProductContainer .col-md-6,
#relatedProductContainer .col-sm-6 {
    display: flex;
    align-items: stretch;
}

/* Thêm khoảng cách giữa các sản phẩm */
#relatedProductContainer .col-lg-3 + .col-lg-3,
#relatedProductContainer .col-md-6 + .col-md-6,
#relatedProductContainer .col-sm-6 + .col-sm-6 {
    margin-top: 30px;
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
    <script src="../../static/client_assets/js/vendor/jquery-1.12.4.min.js"></script><!-- jQuery 1.12.4 -->
    <script src="../../static/client_assets/js/bootstrap.min.js"></script>
    <script src="../../static/client_assets/js/slick.min.js"></script> <!-- Slick Slider -->
    <script src="../../static/client_assets/js/jquery.slicknav.min.js"></script> <!-- SlickNav -->
    <script src="../../static/client_assets/js/wow.min.js"></script> <!-- WOW.js -->
    <script src="../../static/client_assets/js/main.js"></script> <!-- Main JS -->




    <!-- Custom JavaScript -->
    <script src="../../static/call-api/client/product-detail.js"></script>
</body>

</html>