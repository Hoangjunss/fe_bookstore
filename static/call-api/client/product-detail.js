document.addEventListener("DOMContentLoaded", function() {
  // Lấy ID sản phẩm từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const productSaleId = urlParams.get("id");

  if (productSaleId) {
      // Gọi API để lấy chi tiết sản phẩm sale
      fetch(`http://localhost:8080/api/v1/productsales/id?id=${productSaleId}`, {
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
          fetchRelatedProducts(data.product.category.id, productSaleId);
      })
      .catch(error => {
          console.error("Error fetching product details:", error);
          document.getElementById("product-details").innerHTML = "<p>Error loading product details.</p>";
      });
  } else {
      document.getElementById("product-details").innerHTML = "<p>Product ID not found in URL.</p>";
  }

  // Hàm hiển thị chi tiết sản phẩm
  function displayProductDetails(productSale) {
      const productDetailsContainer = document.getElementById("product-details");

      // Kiểm tra xem productSale và product có tồn tại không
      if (!productSale || !productSale.product) {
          productDetailsContainer.innerHTML = "<p>Product details are incomplete.</p>";
          return;
      }

      const product = productSale.product;
      console.log(product);

      // Lấy URL hình ảnh từ đối tượng Image nếu tồn tại
      const imageUrl = product.image ? product.image.url || '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg' : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';

      // Định dạng giá tiền
      const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productSale.price);

      // Trạng thái sản phẩm
      const statusText = productSale.status ? "Available" : "Out of Stock";

      productDetailsContainer.innerHTML = `
          <div class="container">
              <div class="row">
                  <div class="col-xl-6 col-lg-6">
                      <div class="image-container">
                          <img src="${imageUrl}" class="fit-image" alt="${product.name || 'Sample Product'}">
                      </div>
                  </div>
                  <div class="col-xl-6 col-lg-6">
                      <div class="features-caption">
                          <h3>${product.name || 'Sample Product Name'}</h3>
                          <div class="price"><span>${formattedPrice}</span></div>
                          <p><strong>Author:</strong> ${product.author || 'Unknown Author'}</p>
                          <p><strong>Page:</strong> ${product.page !== undefined ? product.page : 'N/A'}</p>
                          <p><strong>Publication Date:</strong> ${product.datePublic ? new Date(product.datePublic).toLocaleDateString('vi-VN') : 'N/A'}</p>
                          <p><strong>Size:</strong> ${product.size || 'N/A'}</p>
                          <p><strong>Description:</strong> ${product.description || 'This is a detailed description of the product.'}</p>
                          <p><strong>Status:</strong> ${statusText}</p>
                          <button class="add-to-cart-link" data-id="${productSale.id}">Add to Cart</button>
                          <a href="#" class="border-btn share-btn"><i class="fas fa-share-alt"></i></a>
                      </div>
                  </div>
              </div>
          </div>
      `;

      // Thêm sự kiện cho nút "Add to Cart"
      document.querySelector('.add-to-cart-link').addEventListener('click', function () {
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
          updateCartCount();
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
  updateCartCount(); // Cập nhật số lượng giỏ hàng khi trang được tải
});
