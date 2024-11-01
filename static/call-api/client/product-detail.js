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
            <a href="javascript:void(0);" class="white-btn mr-10" onclick="addToCart(${productSale.id})">Add to Cart</a>
            <a href="#" class="border-btn share-btn"><i class="fas fa-share-alt"></i></a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productSaleId) {
  // Đối tượng chứa dữ liệu của sản phẩm để thêm vào giỏ hàng
  const cartDetailCreateDTO = {
    id: 1,           // ID sẽ do hệ thống tự tạo, nên để null
    quantity: 1,        // Đặt số lượng mặc định là 1, có thể tùy chỉnh nếu cần
    productSaleId: productSaleId
  };

  console.log(cartDetailCreateDTO);

  const token = localStorage.getItem('token');
  if (!token) {
    alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
    return; // Dừng hàm nếu không có token
  }
  // Gọi API POST để thêm sản phẩm vào giỏ hàng
  fetch('http://localhost:8080/api/v1/cart-details', {  // Điều chỉnh URL API theo cấu hình backend của bạn
    
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(cartDetailCreateDTO)
  })
  .then(response => {
    console.log(response);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to add product to cart');
    }
  })
  .then(data => {
    alert("Product added to cart successfully!");
  })
  .catch(error => {
    console.error("Error adding product to cart:", error);
    alert("Failed to add product to cart.");
  });
}