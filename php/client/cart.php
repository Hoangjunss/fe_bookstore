<!DOCTYPE html>
<html class="no-js" lang="zxx">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <title>Shop | eCommerce</title>
  <meta name="description" content="" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="shortcut icon" type="image/x-icon" href="../../static/client_assets/img/icon/favicon.png">
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

  <script src="../../static/call-api/client/cart.js"></script>
  <style>
    .quantity-container {
      display: flex;
      align-items: center;
    }
    .quantity-container button {
      width: 30px;
      height: 30px;
      font-size: 18px;
      line-height: 0;
      border: 1px solid #ccc;
      background-color: #fff;
      cursor: pointer;
    }
    .quantity-container input {
      width: 50px;
      text-align: center;
      border: 1px solid #ccc;
      margin: 0 5px;
      height: 30px;
    }
    .total {
      font-weight: bold;
    }
  </style>
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
                <h2>Cart</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="cart_area">
    <div class="container">
      <div class="cart_inner">
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Ảnh</th>
              <th scope="col">Sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Thành tiền</th>
              <th scope="col">Thao tác</th> <!-- Thêm cột Thao tác để xóa sản phẩm -->
            </tr>
            </thead>
            <tbody id="cartTableBody">
            <!-- Cart items sẽ được chèn vào đây bởi JavaScript -->
            </tbody>
          </table>
          <div class="checkout_btn_inner float-right">
            <a class="btn" href="/client/product">Continue Shopping</a>
          </div>
        </div>
      </div>
    </div>

    <br>
    <div class="col-md-6 pl-5" style="margin-left: 330px;">
      <div class="row justify-content-end">
        <div class="col-md-7">
          <div class="row">
            <div class="col-md-12 text-right border-bottom mb-5">
              <h3 class="text-black h4 text-uppercase">Giỏ hàng</h3>
            </div>
          </div>

          <div class="row mb-5">
            <div class="col-md-6">
              <span class="text-black">Tổng tiền</span>
            </div>
            <div class="col-md-6 text-right">
              <strong class="text-black total">0 VND</strong>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-right">
                <a href="checkout.html" class="btn btn-primary">Đặt hàng</a>
            </div>
          </div>
        </div>
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

<!-- JavaScript to Fetch and Manage Cart Data -->

</body>
</html>
