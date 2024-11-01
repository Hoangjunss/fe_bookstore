  document.addEventListener("DOMContentLoaded", () => {
      fetchCartData();
  });

  // Hàm lấy dữ liệu giỏ hàng
  async function fetchCartData() {
      try {
            const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:8080/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          
          const cartData = await response.json();
          renderCart(cartData);
      } catch (error) {
          console.error('Error fetching cart data:', error);
          alert('Có lỗi xảy ra khi tải dữ liệu giỏ hàng.');
      }
  }

  // Hàm hiển thị giỏ hàng
  function renderCart(cart) {
      const tableBody = document.getElementById("cartTableBody");
      tableBody.innerHTML = ""; // Xóa nội dung hiện tại
      let total = 0;

      if (!cart || !cart.cartDetailDTOList || cart.cartDetailDTOList.length === 0) {
          tableBody.innerHTML = "<tr><td colspan='6' class='text-center'>Giỏ hàng của bạn đang trống.</td></tr>";
          document.querySelector(".total").innerText = '0 VND';
          return;
      }

      cart.cartDetailDTOList.forEach((detail, index) => {
          const product = detail.product.product; // ProductSaleDTO.product là Product
          const imageUrl = product.image ? product.image.url : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';
          const productName = product.name || 'Tên sản phẩm';
          const price = detail.product.price || 0;
          const quantity = detail.quantity || 0;
          const totalPrice = price * quantity;
          total += totalPrice;

          const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
          const formattedTotalPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);

          const row = `
              <tr data-cart-detail-id="${detail.id}">
                  <td><img src="${imageUrl}" alt="${productName}" width="60"></td>
                  <td>${productName}</td>
                  <td>${formattedPrice}</td>
                  <td>
                      <div class="quantity-container">
                          <button onclick="changeQuantity(${detail.id}, -1)">-</button>
                          <input type="text" value="${quantity}" onchange="updateQuantity(${detail.id}, this.value)">
                          <button onclick="changeQuantity(${detail.id}, 1)">+</button>
                      </div>
                  </td>
                  <td>${formattedTotalPrice}</td>
                  <td>
                      <button class="btn btn-danger btn-sm" onclick="removeFromCart(${detail.id})">Xóa</button>
                  </td>
              </tr>
          `;
          tableBody.insertAdjacentHTML('beforeend', row);
      });

      // Cập nhật tổng tiền
      const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
      document.querySelector(".total").innerText = formattedTotal;
  }

  // Hàm thay đổi số lượng sản phẩm
  async function changeQuantity(cartDetailId, delta) {
      try {
          // Lấy hàng tương ứng trong bảng
          const row = document.querySelector(`tr[data-cart-detail-id="${cartDetailId}"]`);
          const quantityInput = row.querySelector('input[type="text"]');
          let currentQuantity = parseInt(quantityInput.value);

          // Tính toán số lượng mới
          const newQuantity = currentQuantity + delta;
          if (newQuantity < 1) {
              alert('Số lượng tối thiểu là 1.');
              return;
          }

          // Gọi API để cập nhật số lượng
          await updateQuantity(cartDetailId, newQuantity);

      } catch (error) {
          console.error('Error changing quantity:', error);
      }
  }

  // Hàm cập nhật số lượng sản phẩm
  async function updateQuantity(cartDetailId, newQuantity) {
      try {
          // Gọi API PUT để cập nhật số lượng
          const response = await fetch('http://localhost:8080/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  // Thêm các header cần thiết nếu có, ví dụ: Authorization
              },
              body: JSON.stringify({
                  id: cartDetailId,
                  quantity: parseInt(newQuantity)
              })
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const updatedDetail = await response.json();
          // Lấy lại dữ liệu giỏ hàng sau khi cập nhật
          fetchCartData();
      } catch (error) {
          console.error('Error updating quantity:', error);
          alert('Có lỗi xảy ra khi cập nhật số lượng.');
      }
  }

  // Hàm xóa sản phẩm khỏi giỏ hàng
  async function removeFromCart(cartDetailId) {
      if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) return;

      try {
          const response = await fetch(`http://localhost:8080/cart-details?id=${cartDetailId}`, { // Điều chỉnh URL theo cấu hình backend của bạn
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  // Thêm các header cần thiết nếu có, ví dụ: Authorization
              }
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Lấy lại dữ liệu giỏ hàng sau khi xóa
          fetchCartData();
      } catch (error) {
          console.error('Error removing item from cart:', error);
          alert('Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.');
      }
  }

  // Hàm cập nhật số lượng thông qua sự kiện onchange của input
  async function updateQuantityFromInput(cartDetailId, newQuantity) {
      newQuantity = parseInt(newQuantity);
      if (isNaN(newQuantity) || newQuantity < 1) {
          alert('Số lượng không hợp lệ.');
          fetchCartData(); // Reset lại số lượng từ dữ liệu giỏ hàng
          return;
      }
      await updateQuantity(cartDetailId, newQuantity);
  }

  // Thay thế hàm updateProduct bằng hàm updateQuantityFromInput
  function updateQuantity(cartDetailId, newQuantity) {
      updateQuantityFromInput(cartDetailId, newQuantity);
  }