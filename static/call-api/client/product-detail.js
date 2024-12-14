document.addEventListener("DOMContentLoaded", function() {
  // Lấy ID sản phẩm từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const productSaleId = urlParams.get("id");

    const cartLink = document.querySelector('a[href="cart.php"]');
    
    function checkAuthAndRedirect(link, targetUrl) {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = targetUrl;
        } else {
            showNotification('Vui lòng đăng nhập để truy cập trang này.', 'error');
        }
    }

    const profileLink = document.getElementById("profileLink");
    profileLink.addEventListener("click", function(event) {
        event.preventDefault();  // Ngăn chặn chuyển hướng mặc định
        checkAuthAndRedirect(profileLink, "/profile.php");
    });
    cartLink.addEventListener("click", function(event) {
        event.preventDefault();  // Ngăn chặn chuyển hướng mặc định
        checkAuthAndRedirect(cartLink, "cart.php");
    });

    updateAuthButton();
  if (productSaleId) {
      // Gọi API để lấy chi tiết sản phẩm sale
      fetch(`http://localhost:8080/api/v1/product/id?id=${productSaleId}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
              // Thêm các header cần thiết nếu có, ví dụ: Authorization
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          displayProductDetails(data);
          // Sau khi hiển thị chi tiết sản phẩm, fetch các sản phẩm liên quan
          //fetchRelatedProducts(data.product.category.id, productSaleId);
      })
      .catch(error => {
          console.error("Error fetching product details:", error);
          document.getElementById("product-details").innerHTML = "<p>Error loading product details.</p>";
      });
  } else {
      document.getElementById("product-details").innerHTML = "<p>Product ID not found in URL.</p>";
  }

  function updateAuthButton() {
    const authButtonContainer = document.getElementById("auth-button");
    const token = localStorage.getItem('token');

    if (token) {
        // Nếu có token, hiển thị nút Logout
        authButtonContainer.innerHTML = `
            <a href="javascript:void(0);" id="logout-button">
                    <i class="btn btn-light"> Logout</i>
                </a>
        `;

        // Xử lý sự kiện đăng xuất
        document.getElementById("logout-button").addEventListener("click", function() {
            localStorage.removeItem('token');  // Xóa token
            alert("Đã đăng xuất thành công.");
            updateAuthButton();  // Cập nhật nút
        });
    } else {
        // Nếu không có token, hiển thị nút Login
        authButtonContainer.innerHTML = `
            <a href="../auth/login.php" id="login-button">
                    <i class="btn btn-light">Login</i>
                </a>
        `;

        // Xử lý sự kiện đăng nhập (chuyển hướng tới trang đăng nhập)
        document.getElementById("login-button").addEventListener("click", function(event) {
            event.preventDefault();  // Ngăn chặn chuyển hướng mặc định
            window.location.href = "../auth/login.php";
        });
    }
}


  // Hàm hiển thị chi tiết sản phẩm
  function displayProductDetails(productSale) {
      const productDetailsContainer = document.getElementById("product-details");

      // Kiểm tra xem productSale và product có tồn tại không
      if (!productSale) {
          productDetailsContainer.innerHTML = "<p>Product details are incomplete.</p>";
          return;
      }

      const product = productSale;
      console.log(product);

      // Lấy URL hình ảnh từ đối tượng Image nếu tồn tại
      const imageUrl = product.image ? product.image || '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg' : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';

      // Định dạng giá tiền
      const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);

      // Trạng thái sản phẩm
      const statusText = product.status ? "Available" : "Out of Stock";

      productDetailsContainer.innerHTML = `
          <div class="container product-details-container">
    <div class="row">
        <div class="col-lg-6">
            <div class="image-container">
                <img src="${imageUrl}" alt="${product.name || 'Product Image'}" class="product-image">
            </div>
        </div>
        <div class="col-lg-6">
            <div class="product-info">
                <h2 class="product-title">${product.name || 'Sample Product'}</h2>
                <p class="product-price">${formattedPrice} VND</p>
                <p><strong>Author:</strong> ${product.author || 'Unknown'}</p>
                <p><strong>Pages:</strong> ${product.page || 'N/A'}</p>
                <p><strong>Category:</strong> ${product.category || 'N/A'}</p>
                <p><strong>Size:</strong> ${product.size || 'N/A'}</p>
                <p><strong>Description:</strong> ${product.description || 'Detailed description of the product.'}</p>
                <p><strong>Quantity:</strong> ${product.quantity}</p>
                <button class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    </div>
</div>

      `;

      // Thêm sự kiện cho nút "Add to Cart"
      document.querySelector('.add-to-cart-btn').addEventListener('click', function () {
          const productId = this.getAttribute('data-id');
          addToCart(productId);
      });
  }

  // Hàm để thêm sản phẩm vào giỏ hàng
  async function addToCart(productSaleId) {
      if (!productSaleId) {
          showNotification('Không xác định được sản phẩm để thêm vào giỏ hàng.', 'error');
          return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
          showNotification('Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.', 'error');
          return;
      }

      try {
          const response = await fetch('http://localhost:8080/api/v1/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ 
                  id: null, // ID sẽ do hệ thống tự tạo
                  quantity: 1, // Số lượng mặc định là 1
                  productSaleId: productSaleId 
              })
          });

          if (!response.ok) {
              const contentType = response.headers.get("content-type");
              if (contentType && contentType.includes("application/json")) {
                  // Nếu là JSON, phân tích và xử lý lỗi thông thường
                  const errorData = await response.json();
                  if (errorData.message === 'Invalid quantity') {
                      showNotification('Sản phẩm đã hết hàng.', 'error');
                  } else {
                      showNotification(`Lỗi: ${errorData.message}`, 'error');
                  }
              } else {
                  // Nếu không phải JSON, đọc phản hồi dạng text
                  const errorText = await response.text();
                  if (errorText === 'Invalid quantity') {
                      showNotification('Sản phẩm đã hết hàng.', 'error');
                  } else {
                      showNotification(`Lỗi xảy ra: ${errorText}`, 'error');
                  }
              }
              return;
          }

          const addedCartDetail = await response.json();
          showNotification('Đã thêm sản phẩm vào giỏ hàng thành công!', 'success');
          // Cập nhật biểu tượng giỏ hàng
          //updateCartCount();
      } catch (error) {
          console.error('Error adding to cart:', error);
          showNotification('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.', 'error');
      }
  }

  /**
   * Hàm hiển thị thông báo
   * @param {string} message - Thông điệp thông báo
   * @param {string} type - Loại thông báo: 'success', 'error', 'info'
   */
  function showNotification(message, type = 'info') {
      const notificationContainer = document.getElementById('notification-container');

      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.innerHTML = `
          <span>${message}</span>
          <button class="close-btn">&times;</button>
      `;

      notificationContainer.appendChild(notification);

      // Cho phép CSS animate
      setTimeout(() => {
          notification.classList.add('show');
      }, 100); // Delay nhỏ để cho phép DOM cập nhật

      // Tự động ẩn sau 3 giây
      setTimeout(() => {
          notification.classList.remove('show');
          // Xóa phần tử sau khi animation kết thúc
          setTimeout(() => {
              notification.remove();
          }, 500);
      }, 3000);

      // Thêm sự kiện đóng khi nhấp vào nút close
      notification.querySelector('.close-btn').addEventListener('click', () => {
          notification.classList.remove('show');
          setTimeout(() => {
              notification.remove();
          }, 500);
      });
  }

  /**
   * Hàm cập nhật số lượng sản phẩm trong giỏ hàng hiển thị trên biểu tượng giỏ hàng
   */
  async function updateCartCount() {
      const token = localStorage.getItem('token');
      if (!token) {
          return; // Nếu chưa đăng nhập, không cần cập nhật
      }

      try {
          const response = await fetch('http://localhost:8080/api/v1/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const cart = await response.json();
          const cartDetails = cart.cartDetails || [];
          const cartCount = cartDetails.reduce((sum, item) => sum + item.quantity, 0);

          // Cập nhật số lượng trong biểu tượng giỏ hàng
          const cartCountElement = document.querySelector('.cart-count');
          if (cartCountElement) {
              cartCountElement.textContent = cartCount;
          } else {
              // Nếu chưa có, tạo phần tử và thêm vào trong .cart
              const cartIcon = document.querySelector('.cart a');
              const newCartCount = document.createElement('span');
              newCartCount.className = 'cart-count';
              newCartCount.textContent = cartCount;
              cartIcon.appendChild(newCartCount);
          }
      } catch (error) {
          console.error('Error updating cart count:', error);
          // Bạn có thể thêm thông báo lỗi nếu muốn
      }
  }

  // Hàm để định dạng giá
  function formatPrice(price) {
      return price.toLocaleString('vi-VN');
  }

  // Hàm để lấy và hiển thị các sản phẩm liên quan cùng loại
  async function fetchRelatedProducts(categoryId, currentProductId) {
      try {
          const response = await fetch(`http://localhost:8080/api/v1/productsales?categoryId=${categoryId}&size=4`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
                  // Thêm các header cần thiết nếu có, ví dụ: Authorization
              }
          });

          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

          const productPage = await response.json();
          const relatedProducts = productPage.content.filter(product => product.id !== parseInt(currentProductId));

          displayRelatedProducts(relatedProducts);
      } catch (error) {
          console.error('Error fetching related products:', error);
          document.getElementById("relatedProductContainer").innerHTML = "<p>Error loading related products.</p>";
      }
  }

  // Hàm để hiển thị các sản phẩm liên quan
  function displayRelatedProducts(products) {
      const relatedProductContainer = document.getElementById("relatedProductContainer");

      relatedProductContainer.innerHTML = ''; // Xóa danh sách cũ

      if (products.length === 0) {
          relatedProductContainer.innerHTML = '<p class="text-center">No related products found.</p>';
          return;
      }

      products.forEach(productSale => {
          const product = productSale.product;
          const productSaleId = productSale.id;
          const productName = product.name || 'Sample Product Name';
          const salePrice = productSale.price || 0;
          const thumbnail = product.image ? product.image.url : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';

          const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salePrice);

          const relatedProductHTML = `
              <div class="col-lg-3 col-md-6 col-sm-6">
                  <div class="single-items mb-30">
                      <div class="thumb">
                          <a href="product-details.php?id=${productSaleId}">
                              <img style="width: 100%; height: 200px;" src="${thumbnail}" alt="${productName}">
                          </a>
                          <div class="actions">
                              <button class="add-to-cart-link" data-id="${productSaleId}">Add to Cart</button>
                          </div>
                      </div>
                      <div class="content">
                          <h4><a href="product-details.php?id=${productSaleId}">${productName}</a></h4>
                          <p class="price">${formattedPrice}</p>
                      </div>
                  </div>
              </div>
          `;

          relatedProductContainer.insertAdjacentHTML('beforeend', relatedProductHTML);
      });

      // Thêm sự kiện cho các nút "Add to Cart" trong các sản phẩm liên quan
      document.querySelectorAll('#relatedProductContainer .add-to-cart-link').forEach(button => {
          button.addEventListener('click', function () {
              const productId = this.getAttribute('data-id');
              addToCart(productId);
          });
      });
  }

  // Hàm để xử lý thông tin người dùng đã đăng nhập
  function fetchUserInfo() {
      fetch('http://localhost:8080/api/v1/user/profile') // Thay đổi URL nếu cần
          .then(response => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error('User not logged in');
              }
          })
          .then(data => {
              const userEmailElement = document.getElementById('userEmail');
              if (userEmailElement) {
                  userEmailElement.textContent = `Hello, ${data.email}`;
              }
          })
          .catch(error => {
              const userEmailElement = document.getElementById('userEmail');
              if (userEmailElement) {
                  userEmailElement.textContent = 'Hello, Guest';
              }
              console.log('User not logged in');
          });
  }

  // Gọi các hàm khi trang được tải
  // fetchUserInfo();
  //updateCartCount(); // Cập nhật số lượng giỏ hàng khi trang được tải
});
