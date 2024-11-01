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
  <link rel="stylesheet" href="../../static/client_assets/css/style.css">

  <script src="../../static/call-api/client/product-detail.js"></script>

  <style>
    .fit-image {
      max-width: 300px;
      max-height: 300px;
      width: auto;
      height: auto;
    }
    .image-container {
      text-align: center;
    }
  </style>
</head>
<body>
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
                    <li><a href="view-orders.html">Track Your Order</a></li>
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
                  <li><a href="index.html">Home</a></li>
                  <li><a href="view-products.html">Products</a></li>
                  <li><a href="view-orders.html">Orders</a></li>
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
                <li><a href="profile.html"><span class="flaticon-user"></span></a></li>
                <li class="cart"><a href="cart.html"><span class="flaticon-shopping-cart"></span></a></li>
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
                      <li class="breadcrumb-item"><a href="index.html">Home</a></li>
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
                    <button type="submit" class="subscribe-btn">Subscribe</button>
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

  <!-- JavaScript to Fetch Product Details -->

  <!-- JS Libraries -->
  <script src="../../static/client_assets/js/vendor/jquery-1.12.4.min.js"></script>
  <script src="../../static/client_assets/js/bootstrap.min.js"></script>
</body>
</html>
