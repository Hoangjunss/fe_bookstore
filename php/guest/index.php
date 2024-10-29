<?php
// shop.php

// Bạn có thể thêm logic PHP ở đây nếu cần thiết
?>
<!doctype html>
<html class="no-js" lang="zxx">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Shop | eCommers</title>
    <meta name="description" content>
    <meta name="viewport" content="width=device-width, initial-scale=1">
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
</head>
<body>

<div id="preloader-active">
    <div class="preloader d-flex align-items-center justify-content-center">
        <div class="preloader-inner position-relative">
            <div class="preloader-circle"></div>
            <div class="preloader-img pere-text">
                <img src="../../static/client_assets/img/icon/loder.png" alt="loder">
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
                                    <li><a href="#">Track Your Order</a></li>
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
                        <a href="index.html"><img src="../../static/client_assets/img/logo/logo.png" alt="Logo"></a>
                    </div>

                    <div class="main-menu d-none d-lg-block">
                        <nav>
                            <ul id="navigation">
                                <li><a href="index.php">Home</a></li>
                                <li><a href="view-products.php">Products</a></li>
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
                            <li><a href="/login"><span class="flaticon-user"></span></a></li>
                            <li class="cart"><a href="/login"><span class="flaticon-shopping-cart"></span></a></li>
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

    <section class="slider-area">
        <div class="slider-active">

            <div class="single-slider slider-bg1 slider-height d-flex align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-10">
                            <div class="hero-caption text-center">
                                <span>Fashion Sale</span>
                                <h1 data-animation="bounceIn" data-delay="0.2s">Minimal Menz Style</h1>
                                <p data-animation="fadeInUp" data-delay="0.4s">Consectetur adipisicing elit. Laborum
                                    fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla
                                    earum.</p>
                                <a href="#" class="btn_1 hero-btn" data-animation="fadeInUp" data-delay="0.7s">Shop
                                    Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                                <a href="#" class="btn_1 hero-btn" data-animation="fadeInUp" data-delay="0.7s">Shop
                                    Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section class="items-product1 pt-30">
        <div class="container">
            <div class="row">
                <!-- Item 1 -->
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                    <div class="single-items mb-20">
                        <div class="items-img">
                            <img src="../../static/client_assets/img/logo/logo.png" alt="Men's Fashion">
                        </div>
                        <div class="items-details">
                            <h4><a href="pro-details.html">Men's Fashion</a></h4>
                            <a href="pro-details.html" class="browse-btn">Shop Now</a>
                        </div>
                    </div>
                </div>
                <!-- Item 2 -->
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                    <div class="single-items mb-20">
                        <div class="items-img">
                            <img src="../../static/client_assets/img/gallery/items2.jpg" alt="Women's Fashion">
                        </div>
                        <div class="items-details">
                            <h4><a href="pro-details.html">Women's Fashion</a></h4>
                            <a href="pro-details.html" class="browse-btn">Shop Now</a>
                        </div>
                    </div>
                </div>
                <!-- Item 3 -->
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                    <div class="single-items mb-20">
                        <div class="items-img">
                            <img src="../../static/client_assets/img/gallery/items3.jpg" alt="Baby Fashion">
                        </div>
                        <div class="items-details">
                            <h4><a href="pro-details.html">Baby Fashion</a></h4>
                            <a href="pro-details.html" class="browse-btn">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


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
                <!-- Tab Pane Men -->
                <div class="tab-pane fade show active" id="nav-one" role="tabpanel" aria-labelledby="nav-one-tab">

                    <div class="latest-items-active">
                        <!-- Item 1 -->
                        <div class="properties pb-30">
                            <div class="properties-card">
                                <div class="properties-img">
                                    <a href="product-details.php"><img src="../../static/client_assets/img/products/defbookcover-min.jpg" alt="Product 1"></a>
                                    <div class="socal_icon">
                                        <a href="#"><i class="ti-shopping-cart"></i></a>
                                        <a href="#"><i class="ti-heart"></i></a>
                                        <a href="#"><i class="ti-zoom-in"></i></a>
                                    </div>
                                </div>
                                <div class="properties-caption properties-caption2">
                                    <h3><a href="product-details.php">Men's Casual Shirt</a></h3>
                                    <div class="properties-footer">
                                        <div class="price">
                                            <span>499,000 VND</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Item 2 -->
                        <div class="properties pb-30">
                            <div class="properties-card">
                                <div class="properties-img">
                                    <a href="product-details.php"><img src="../../static/client_assets/img/products/defbookcover-min.jpg" alt="Product 2"></a>
                                    <div class="socal_icon">
                                        <a href="#"><i class="ti-shopping-cart"></i></a>
                                        <a href="#"><i class="ti-heart"></i></a>
                                        <a href="#"><i class="ti-zoom-in"></i></a>
                                    </div>
                                </div>
                                <div class="properties-caption properties-caption2">
                                    <h3><a href="product-details.php">Men's Formal Trousers</a></h3>
                                    <div class="properties-footer">
                                        <div class="price">
                                            <span>799,000 VND</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Item 3 -->
                        <div class="properties pb-30">
                            <div class="properties-card">
                                <div class="properties-img">
                                    <a href="product-details.php"><img src="../../static/client_assets/img/products/defbookcover-min.jpg" alt="Product 3"></a>
                                    <div class="socal_icon">
                                        <a href="#"><i class="ti-shopping-cart"></i></a>
                                        <a href="#"><i class="ti-heart"></i></a>
                                        <a href="#"><i class="ti-zoom-in"></i></a>
                                    </div>
                                </div>
                                <div class="properties-caption properties-caption2">
                                    <h3><a href="product-details.php">Men's Sports Jacket</a></h3>
                                    <div class="properties-footer">
                                        <div class="price">
                                            <span>699,000 VND</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Thêm các sản phẩm khác tương tự -->
                    </div>
                </div>
                <!-- Tab Pane Women -->
                <div class="tab-pane fade" id="nav-two" role="tabpanel" aria-labelledby="nav-two-tab">
                    <div class="latest-items-active">
                        <!-- Item 1 -->
                        <div class="properties pb-30">
                            <div class="properties-card">
                                <div class="properties-img">
                                    <a href="product-details.php"><img src="../../static/client_assets/img/products/defbookcover-min.jpg" alt="Product 4"></a>
                                    <div class="socal_icon">
                                        <a href="#"><i class="ti-shopping-cart"></i></a>
                                        <a href="#"><i class="ti-heart"></i></a>
                                        <a href="#"><i class="ti-zoom-in"></i></a>
                                    </div>
                                </div>
                                <div class="properties-caption properties-caption2">
                                    <h3><a href="product-details.php">Women's Summer Dress</a></h3>
                                    <div class="properties-footer">
                                        <div class="price">
                                            <span>599,000 VND</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Item 2 -->
                        <div class="properties pb-30">
                            <div class="properties-card">
                                <div class="properties-img">
                                    <a href="product-details.php"><img src="../../static/client_assets/img/products/defbookcover-min.jpg" alt="Product 5"></a>
                                    <div class="socal_icon">
                                        <a href="#"><i class="ti-shopping-cart"></i></a>
                                        <a href="#"><i class="ti-heart"></i></a>
                                        <a href="#"><i class="ti-zoom-in"></i></a>
                                    </div>
                                </div>
                                <div class="properties-caption properties-caption2">
                                    <h3><a href="product-details.php">Women's Handbag</a></h3>
                                    <div class="properties-footer">
                                        <div class="price">
                                            <span>1,199,000 VND</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Thêm các sản phẩm khác tương tự -->
                    </div>
                </div>
                <!-- Tab Pane Baby -->
                <div class="tab-pane fade" id="nav-three" role="tabpanel" aria-labelledby="nav-three-tab">
                    <div class="latest-items-active">
                        <!-- Item 1 -->
                        <div class="properties pb-30">
                            <div class="properties-card">
                                <div class="properties-img">
                                    <a href="product-details.php"><img src="../../static/client_assets/img/products/defbookcover-min.jpg" alt="Product 6"></a>
                                    <div class="socal_icon">
                                        <a href="#"><i class="ti-shopping-cart"></i></a>
                                        <a href="#"><i class="ti-heart"></i></a>
                                        <a href="#"><i class="ti-zoom-in"></i></a>
                                    </div>
                                </div>
                                <div class="properties-caption properties-caption2">
                                    <h3><a href="product-details.php">Baby Onesie</a></h3>
                                    <div class="properties-footer">
                                        <div class="price">
                                            <span>299,000 VND</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Thêm các sản phẩm khác tương tự -->
                    </div>
                </div>
                <!-- Tab Pane Fashion -->
                <div class="tab-pane fade" id="nav-four" role="tabpanel" aria-labelledby="nav-four-tab">
                    <div class="latest-items-active">
                        <!-- Item 1 -->
                        <div class="properties pb-30">
                            <div class="properties-card">
                                <div class="properties-img">
                                    <a href="product-details.php"><img src="../../static/client_assets/img/products/defbookcover-min.jpg" alt="Product 7"></a>
                                    <div class="socal_icon">
                                        <a href="#"><i class="ti-shopping-cart"></i></a>
                                        <a href="#"><i class="ti-heart"></i></a>
                                        <a href="#"><i class="ti-zoom-in"></i></a>
                                    </div>
                                </div>
                                <div class="properties-caption properties-caption2">
                                    <h3><a href="product-details.php">Fashionable Sunglasses</a></h3>
                                    <div class="properties-footer">
                                        <div class="price">
                                            <span>399,000 VND</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Thêm các sản phẩm khác tương tự -->
                    </div>
                </div>
            </div>
        </div>
    </div>


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
                                        <img src="../../static/client_assets/img/gallery/founder-img.png" alt="Founder">
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
                                        <img src="../../static/client_assets/img/gallery/founder-img.png" alt="Founder">
                                    </div>
                                    <div class="founder-text">
                                        <span>Petey Cruiser</span>
                                        <p>Designer at Colorlib</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Thêm các testimonial khác nếu cần -->
                    </div>
                </div>
            </div>
        </div>
    </div>


    <section class="latest-items section-padding fix">
        <div class="row">
            <div class="col-xl-12">
                <div class="section-tittle text-center mb-40">
                    <h2>You May Like</h2>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="latest-items-active">
                <!-- Product 1 -->
                <div class="properties pb-30">
                    <div class="properties-card">
                        <div class="properties-img">
                            <a href="product-details.php"><img src="../../static/client_assets/img/products/defbookcover-min.jpg" alt="Product 8"></a>
                            <div class="socal_icon">
                                <a href="/login"><i class="ti-shopping-cart"></i></a>
                                <a href="#"><i class="ti-heart"></i></a>
                                <a href="#"><i class="ti-zoom-in"></i></a>
                            </div>
                        </div>
                        <div class="properties-caption properties-caption2">
                            <h3><a href="product-details.php">Stylish Watch</a></h3>
                            <div class="properties-footer">
                                <div class="price">
                                    <span>899,000 VND</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Product 2 -->
                <div class="properties pb-30">
                    <div class="properties-card">
                        <div class="properties-img">
                            <a href="product-details.php"><img src="../../static/client_assets/img/products/defbookcover-min.jpg" alt="Product 9"></a>
                            <div class="socal_icon">
                                <a href="/login"><i class="ti-shopping-cart"></i></a>
                                <a href="#"><i class="ti-heart"></i></a>
                                <a href="#"><i class="ti-zoom-in"></i></a>
                            </div>
                        </div>
                        <div class="properties-caption properties-caption2">
                            <h3><a href="product-details.php">Leather Belt</a></h3>
                            <div class="properties-footer">
                                <div class="price">
                                    <span>299,000 VND</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Product 3 -->
                <div class="properties pb-30">
                    <div class="properties-card">
                        <div class="properties-img">
                            <a href="product-details.php0"><img src="../../static/client_assets/img/products/defbookcover-min.jpg" alt="Product 10"></a>
                            <div class="socal_icon">
                                <a href="/login"><i class="ti-shopping-cart"></i></a>
                                <a href="#"><i class="ti-heart"></i></a>
                                <a href="#"><i class="ti-zoom-in"></i></a>
                            </div>
                        </div>
                        <div class="properties-caption properties-caption2">
                            <h3><a href="product-details.php0">Casual Sneakers</a></h3>
                            <div class="properties-footer">
                                <div class="price">
                                    <span>699,000 VND</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Thêm các sản phẩm khác tương tự -->
            </div>
        </div>
    </section>


    <section class="home-blog">
        <div class="container">
            <div class="row justify-content-center">
                <div class="cl-xl-7 col-lg-8 col-md-10">

                    <div class="section-tittle text-center mb-40">
                        <h2>Latest News</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <!-- Blog Post 1 -->
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="single-blogs mb-30">
                        <div class="blog-img">
                            <a href="pro-details.html"><img src="../../static/client_assets/img/gallery/blog1.jpg" alt="Blog 1"></a>
                        </div>
                        <div class="blogs-cap">
                            <span>Fashion Tips</span>
                            <h5><a href="pro-details.html">What Curling Irons Are The Best Ones</a></h5>
                            <p>Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure,
                                delectus dignissimos facilis neque nulla earum.</p>
                            <a href="pro-details.html" class="red-btn">Read More</a>
                        </div>
                    </div>
                </div>
                <!-- Blog Post 2 -->
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="single-blogs mb-30">
                        <div class="blog-img">
                            <a href="pro-details.html"><img src="../../static/client_assets/img/gallery/blog2.jpg" alt="Blog 2"></a>
                        </div>
                        <div class="blogs-cap">
                            <span>Fashion Tips</span>
                            <h5><a href="pro-details.html">Vogue's Ultimate Guide To Autumn/Winter 2019 Shoes</a></h5>
                            <p>Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure,
                                delectus dignissimos facilis neque nulla earum.</p>
                            <a href="pro-details.html" class="red-btn">Read More</a>
                        </div>
                    </div>
                </div>
                <!-- Blog Post 3 -->
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="single-blogs mb-30">
                        <div class="blog-img">
                            <a href="pro-details.html"><img src="../../static/client_assets/img/gallery/blog3.jpg" alt="Blog 3"></a>
                        </div>
                        <div class="blogs-cap">
                            <span>Fashion Tips</span>
                            <h5><a href="pro-details.html">What Curling Irons Are The Best Ones</a></h5>
                            <p>Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure,
                                delectus dignissimos facilis neque nulla earum.</p>
                            <a href="pro-details.html" class="red-btn">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="categories-area">
        <div class="container">
            <div class="row">
                <!-- Category 1 -->
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="single-cat mb-50 wow fadeInUp text-center" data-wow-duration="1s" data-wow-delay=".2s">
                        <div class="cat-icon">
                            <img src="../../static/client_assets/img/icon/services1.svg" alt="Fast & Free Delivery">
                        </div>
                        <div class="cat-cap">
                            <h5>Fast & Free Delivery</h5>
                            <p>Free delivery on all orders</p>
                        </div>
                    </div>
                </div>
                <!-- Category 2 -->
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="single-cat mb-50 wow fadeInUp text-center" data-wow-duration="1s" data-wow-delay=".2s">
                        <div class="cat-icon">
                            <img src="../../static/client_assets/img/icon/services2.svg" alt="Secure Payment">
                        </div>
                        <div class="cat-cap">
                            <h5>Secure Payment</h5>
                            <p>Free delivery on all orders</p>
                        </div>
                    </div>
                </div>
                <!-- Category 3 -->
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="single-cat mb-50 wow fadeInUp text-center" data-wow-duration="1s" data-wow-delay=".4s">
                        <div class="cat-icon">
                            <img src="../../static/client_assets/img/icon/services3.svg" alt="Money Back Guarantee">
                        </div>
                        <div class="cat-cap">
                            <h5>Money Back Guarantee</h5>
                            <p>Free delivery on all orders</p>
                        </div>
                    </div>
                </div>
                <!-- Category 4 -->
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="single-cat mb-50 wow fadeInUp text-center" data-wow-duration="1s" data-wow-delay=".5s">
                        <div class="cat-icon">
                            <img src="../../static/client_assets/img/icon/services4.svg" alt="Online Support">
                        </div>
                        <div class="cat-cap">
                            <h5>Online Support</h5>
                            <p>Free delivery on all orders</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
                                    <input type="text" placeholder="Enter your email">
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
                                    <a href="index.html"><img src="../../static/client_assets/img/logo/logo2_footer.png" alt="Footer Logo"></a>
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
                                    <li><a href="#">Track Your Order</a></li>
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
                        <div class="col-xl-12 ">
                            <div class="footer-copy-right text-center">
                                <p>&copy;<script>document.write(new Date().getFullYear());</script>
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
<!-- Cloudflare Insights -->
<script defer src="https://static.cloudflareinsights.com/beacon.min.js/v84a3a4012de94ce1a686ba8c167c359c1696973893317"
        integrity="sha512-euoFGowhlaLqXsPWQ48qSkBSCFs3DPRyiwVu3FjR96cMPx+Fr+gpWRhIafcHwqwCqWS42RZhIudOvEI+Ckf6MA=="
        data-cf-beacon='{"rayId":"842605dd89cc1072","version":"2023.10.0","token":"cd0b4b3a733644fc843ef0b185f98241"}'
        crossorigin="anonymous"></script>
</body>
</html>
