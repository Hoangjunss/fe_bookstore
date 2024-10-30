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
  <link rel="stylesheet" href="../../static/client_assets/css/style.css">
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
                                    <li><span>Hello, user@example.com</span></li>
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
                            </ul>
                        </nav>
                    </div>
                    <div class="header-right">
                        <ul>
                            <li><a href="client/profile.php"><span class="flaticon-user"></span></a></li>
                            <li class="cart"><a href="client/cart.php"><span class="flaticon-shopping-cart"></span></a></li>
                        </ul>
                    </div>
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
            </tr>
            </thead>
            <tbody id="cartTableBody">
            <!-- Cart items will be inserted here by JavaScript -->
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

<script src="../../static/client_assets/js/vendor/modernizr-3.5.0.min.js"></script>
<script src="../../static/client_assets/js/vendor/jquery-1.12.4.min.js"></script>
<script src="../../static/client_assets/js/bootstrap.min.js"></script>

<script>
  async function fetchCartData() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const cartData = await response.json();
        renderCart(cartData);
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}

function renderCart(products) {
    const tableBody = document.getElementById("cartTableBody");
    let total = 0;

    products.forEach((product, index) => {
        total += product.totalPrice;
        const row = `
            <tr>
                <td><img src="${product.thumbnail}" alt="${product.productName}" width="60"></td>
                <td>${product.productName}</td>
                <td>${product.priceOfOne.toLocaleString('vi-VN')} VND</td>
                <td>
                    <div class="quantity-container">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <input type="text" value="${product.quantity}" onchange="updateProduct(${index}, this.value)">
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </td>
                <td>${product.totalPrice.toLocaleString('vi-VN')} VND</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    document.querySelector(".total").innerText = total.toLocaleString('vi-VN') + ' VND';
}

document.addEventListener("DOMContentLoaded", fetchCartData);
</script>
</body>
</html>
