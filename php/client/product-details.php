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
                    <li><span>Hello, Guest</span></li>
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
                      <li class="breadcrumb-item"><a href="#">Product Details</a></li>
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
      <!-- Product details will be loaded here by JavaScript -->
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
    </div>
  </div>
</footer>


  <!-- JavaScript to Fetch Product Details -->
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      // Lấy ID sản phẩm từ URL
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");

      if (productId) {
        // Gọi API để lấy chi tiết sản phẩm
        fetch(`http://localhost:8080/api/v1/product-sale?id=${productId}`, {
          method: "GET",
        })
          .then(response => response.json())
          .then(data => {
            displayProductDetails(data);
          })
          .catch(error => {
            console.error("Error fetching product details:", error);
            document.getElementById("product-details").innerHTML = "<p>Error loading product details.</p>";
          });
      } else {
        document.getElementById("product-details").innerHTML = "<p>Product ID not found in URL.</p>";
      }
    });

    // Hàm hiển thị chi tiết sản phẩm
    function displayProductDetails(product) {
      const productDetailsContainer = document.getElementById("product-details");

      productDetailsContainer.innerHTML = `
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="single-services d-flex align-items-center mb-0">
                <div class="features-img">
                  <img src="${product.imageUrl || '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg'}" class="fit-image" alt="${product.name || 'Sample Product'}">
                </div>
                <div class="features-caption">
                  <h3>${product.name || 'Sample Product Name'}</h3>
                  <div class="price"><span>${product.price || '1,299,000 VND'}</span></div>
                  <div class="review">
                    <div class="rating">
                      ${generateRatingStars(product.rating || 4.5)}
                    </div>
                    <p>(${product.reviewCount || 120} Reviews)</p>
                  </div>
                  <a href="javascript:void(0);" class="white-btn mr-10" onclick="addToCart(${product.id})">Add to Cart</a>
                  <a href="#" class="border-btn share-btn"><i class="fas fa-share-alt"></i></a>
                </div>
              </div>
              <p>${product.description || 'This is a detailed description of the product.'}</p>
            </div>
          </div>
        </div>
      `;
    }
    // Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productSaleId) {
  // Đối tượng chứa dữ liệu của sản phẩm để thêm vào giỏ hàng
  const cartDetailCreateDTO = {
    id: null,           // ID sẽ do hệ thống tự tạo, nên để null
    quantity: 1,        // Đặt số lượng mặc định là 1, có thể tùy chỉnh nếu cần
    productSaleId: productSaleId
  };

  // Gọi API POST để thêm sản phẩm vào giỏ hàng
  fetch('http://localhost:8080/api/v1/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartDetailCreateDTO)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to add product to cart');
    }
  })
  .then(data => {
    alert("Product added to cart successfully!");
    // Có thể cập nhật UI giỏ hàng hoặc chuyển hướng người dùng
  })
  .catch(error => {
    console.error("Error adding product to cart:", error);
    alert("Failed to add product to cart.");
  });
}


    // Hàm tạo sao đánh giá dựa trên rating
    function generateRatingStars(rating) {
      let stars = "";
      for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
          stars += '<i class="fas fa-star"></i>';
        } else if (i < rating) {
          stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
          stars += '<i class="far fa-star"></i>';
        }
      }
      return stars;
    }
  </script>

  <!-- JS Libraries -->
  <script src="../../static/client_assets/js/vendor/jquery-1.12.4.min.js"></script>
  <script src="../../static/client_assets/js/bootstrap.min.js"></script>
</body>
</html>
