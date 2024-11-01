<!doctype html>
<html class="no-js" lang="vi">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Shop | eCommerce</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="../../static/client_assets/img/icon/favicon.png">

    <!-- CSS Libraries -->
    <link rel="stylesheet" href="../../static/client_assets/css/bootstrap.min.css"> <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/owl.carousel.min.css"> <!-- Owl Carousel CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/slicknav.css"> <!-- SlickNav CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/flaticon.css"> <!-- Flaticon CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/animate.min.css"> <!-- Animate CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/price_rangs.css"> <!-- Price Rangs CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/magnific-popup.css"> <!-- Magnific Popup CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/fontawesome-all.min.css"> <!-- FontAwesome CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/themify-icons.css"> <!-- Themify Icons CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/slick.css"> <!-- Slick Slider CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/nice-select.css"> <!-- Nice Select CSS -->
    <link rel="stylesheet" href="../../static/client_assets/css/style.css"> <!-- Main Style CSS -->

    <script src="../../static/call-api/client/index.js"></script>
    <style>
        .add-to-cart-link {
            display: inline-block;
            /* padding: 10px 15px; */
            background-color: #4CAF50; /* Green color */
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
            cursor: pointer;
        }

        .add-to-cart-link:hover {
            background-color: #45a049; /* Darker green on hover */
        }
    </style>
</head>
<body>

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
                                <li><a href="client/index.php">Home</a></li>
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
                            <li><a href="profile.php"><span class="flaticon-user"></span></a></li>
                            <li class="cart"><a href="cart.php"><span class="flaticon-shopping-cart"></span></a></li>
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

<main>

    <!-- Hero Area -->
    <section class="slider-area ">
        <div class="slider-active">

            <!-- Single Slider -->
            <div class="single-slider slider-bg1 slider-height d-flex align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-xxl-5 col-xl-6 col-lg-7 col-md-8  col-sm-10">
                            <div class="hero-caption text-center">
                                <span>Fashion Sale</span>
                                <h1 data-animation="bounceIn" data-delay="0.2s">Minimal Menz Style</h1>
                                <p data-animation="fadeInUp" data-delay="0.4s">Consectetur adipisicing elit. Laborum
                                    fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla
                                    earum.</p>
                                <a href="#" class="btn_1 hero-btn" data-animation="fadeInUp" data-delay="0.7s">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Single Slider -->
            <div class="single-slider slider-bg2 slider-height d-flex align-items-center">
                <div class="container">
                    <div class="row justify-content-end">
                        <div class="col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-10">
                            <div class="hero-caption text-center">
                                <span>Fashion Sale</span>
                                <h1 data-animation="bounceIn" data-delay="0.2s">Minimal Menz Style</h1>
                                <p data-animation="fadeInUp" data-delay="0.4s">Consectetur adipisicing elit. Laborum
                                    fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla
                                    earum.</p>
                                <a href="#" class="btn_1 hero-btn" data-animation="fadeInUp" data-delay="0.7s">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Products Section -->
    <section class="items-product1 pt-30">
        <div class="container">
            <div class="row" id="productsContainer">
                <!-- Products will be inserted here by JavaScript -->
            </div>
        </div>
    </section>

    <!-- Trending This Week -->
    <div class="latest-items section-padding fix">
        <div class="container">
            <div class="row justify-content-between">
                <div class="col-xl-12">
                    <div class="nav-button">

                        <nav>
                            <div class="nav-tittle">
                                <h2>Trending This Week</h2>
                            </div>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <a class="nav-link active" id="nav-one-tab" data-bs-toggle="tab" href="#nav-one"
                                   role="tab" aria-controls="nav-one" aria-selected="true">Men</a>
                                <a class="nav-link" id="nav-two-tab" data-bs-toggle="tab" href="#nav-two" role="tab"
                                   aria-controls="nav-two" aria-selected="false">Women</a>
                                <a class="nav-link" id="nav-three-tab" data-bs-toggle="tab" href="#nav-three" role="tab"
                                   aria-controls="nav-three" aria-selected="false">Baby</a>
                                <a class="nav-link" id="nav-four-tab" data-bs-toggle="tab" href="#nav-four" role="tab"
                                   aria-controls="nav-four" aria-selected="false">Fashion</a>
                            </div>
                        </nav>

                    </div>
                </div>
            </div>
        </div>
        <div class="container">

            <div class="tab-content" id="nav-tabContent">
                <!-- Men Tab -->
                <div class="tab-pane fade show active" id="nav-one" role="tabpanel" aria-labelledby="nav-one-tab">

                    <div class="latest-items-active" id="trendingProducts">
                        <!-- Trending products will be inserted here by JavaScript -->
                    </div>
                </div>

                <!-- Other tabs can be similarly handled if needed -->
            </div>
        </div>
    </div>

    <!-- You May Like Section -->
    <section class="latest-items section-padding fix">
        <div class="row">
            <div class="col-xl-12">
                <div class="section-tittle text-center mb-40">
                    <h2>You May Like</h2>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="latest-items-active" id="youMayLikeProducts">
                <!-- You may like products will be inserted here by JavaScript -->
            </div>
        </div>
    </section>

    <!-- Testimonial Area -->
    <div class="testimonial-area testimonial-padding">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-10 col-md-11">

                    <div class="h1-testimonial-active">

                        <div class="single-testimonial text-center">
                            <div class="testimonial-caption ">
                                <div class="testimonial-top-cap">
                                    <h2>Customer Testimonial</h2>
                                    <p>Everybody is different, which is why we offer styles for every body. Laborum fuga
                                        incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla
                                        earum.</p>
                                </div>

                                <div class="testimonial-founder d-flex align-items-center justify-content-center">
                                    <div class="founder-img">
                                        <img src="../../static/client_assets/img/gallery/founder-img.png" alt="Founder Image">
                                    </div>
                                    <div class="founder-text">
                                        <span>Petey Cruiser</span>
                                        <p>Designer at Colorlib</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="single-testimonial text-center">
                            <div class="testimonial-caption ">
                                <div class="testimonial-top-cap">
                                    <h2>Customer Testimonial</h2>
                                    <p>Everybody is different, which is why we offer styles for every body. Laborum fuga
                                        incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla
                                        earum.</p>
                                </div>

                                <div class="testimonial-founder d-flex align-items-center justify-content-center">
                                    <div class="founder-img">
                                        <img src="../../static/client_assets/img/gallery/founder-img.png" alt="Founder Image">
                                    </div>
                                    <div class="founder-text">
                                        <span>Petey Cruiser</span>
                                        <p>Designer at Colorlib</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Subscribe and Footer Sections Omitted for Brevity -->

</main>
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
                                <p>Copyright &copy;<script>document.write(new Date().getFullYear());</script>
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

<!-- JS Libraries -->
<!-- Tải jQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

<!-- Tải ionRangeSlider CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ion-rangeslider/css/ion.rangeSlider.min.css">

<!-- Tải ionRangeSlider JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/ion-rangeslider/js/ion.rangeSlider.min.js"></script>
<!-- Vendor Libraries -->
<script src="../../static/client_assets/js/vendor/modernizr-3.5.0.min.js"></script> <!-- Modernizr: Detects HTML5 and CSS3 features -->
<script src="../../static/client_assets/js/vendor/jquery-1.12.4.min.js"></script> <!-- jQuery: JavaScript library -->
<script src="../../static/client_assets/js/popper.min.js"></script> <!-- Popper.js: Tooltip & popover positioning engine -->
<script src="../../static/client_assets/js/bootstrap.min.js"></script> <!-- Bootstrap JS: Front-end component library -->

<script src="../../static/client_assets/js/owl.carousel.min.js"></script> <!-- Owl Carousel: Carousel slider -->
<script src="../../static/client_assets/js/slick.min.js"></script> <!-- Slick Slider: Responsive carousel slider -->
<script src="../../static/client_assets/js/jquery.slicknav.min.js"></script> <!-- SlickNav: Responsive mobile menu -->

<script src="../../static/client_assets/js/wow.min.js"></script> <!-- WOW.js: Reveal animations on scroll -->
<script src="../../static/client_assets/js/jquery.magnific-popup.js"></script> <!-- Magnific Popup: Responsive lightbox & dialog script -->
<script src="../../static/client_assets/js/jquery.nice-select.min.js"></script> <!-- Nice Select: Custom select box -->
<script src="../../static/client_assets/js/jquery.counterup.min.js"></script> <!-- Counter-Up: Animated counters -->
<script src="../../static/client_assets/js/waypoints.min.js"></script> <!-- Waypoints: Execute a function when you scroll to an element -->
<script src="../../static/client_assets/js/price_rangs.js"></script> <!-- Price Range Slider: Custom price range slider -->

<script src="../../static/client_assets/js/contact.js"></script> <!-- Contact Form JS: Handles contact form submissions -->
<script src="../../static/client_assets/js/jquery.form.js"></script> <!-- jQuery Form: Form handling -->
<script src="../../static/client_assets/js/jquery.validate.min.js"></script> <!-- jQuery Validate: Form validation -->
<script src="../../static/client_assets/js/mail-script.js"></script> <!-- Mail Script: Handles email subscriptions -->
<script src="../../static/client_assets/js/jquery.ajaxchimp.min.js"></script> <!-- AjaxChimp: Integration with MailChimp -->

<!-- Custom Scripts -->
<script src="../../static/client_assets/js/plugins.js"></script> <!-- Plugins JS: Additional plugins -->
<script src="../../static/client_assets/js/main.js"></script> <!-- Main JS: Custom JavaScript for the site -->
<script src="../../static/client_assets/js/jquery-3.7.1.min.js"></script> <!-- jQuery 3.7.1 -->
<script src="../../static/client_assets/js/axios.min.js"></script> <!-- Axios: Promise based HTTP client -->

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"></script>
<script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());

    gtag('config', 'UA-23581568-13');
</script>

<!-- JavaScript to Fetch and Display Products -->

</body>
</html>
