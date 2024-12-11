// category-details.js

document.addEventListener('DOMContentLoaded', function () {
    // Lấy categoryId từ URL (ví dụ: category-details.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    if (!categoryId) {
        alert('Không tìm thấy ID category.');
        window.location.href = 'list-category.html'; // Chuyển hướng về danh sách category
    } else {
        fetchCategoryDetails(categoryId);
        initializeDataTable(categoryId);
    }

    // Xử lý sự kiện tìm kiếm sản phẩm
    document.getElementById('btnSearchProduct').addEventListener('click', function (e) {
        e.preventDefault();
        $('#datatable-buttons').DataTable().ajax.reload();
    });
});

/**
 * Hàm lấy thông tin chi tiết của category và hiển thị lên giao diện
 * @param {number} categoryId - ID của category
 */
async function fetchCategoryDetails(categoryId) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/category/${categoryId}`);
        if (response.status === 200) {
            const category = response.data;
            document.getElementById('category-id').textContent = category.id;
            document.getElementById('category-name').textContent = category.name;
        } else {
            throw new Error('Không thể lấy thông tin category.');
        }
    } catch (error) {
        console.error('Error fetching category details:', error);
        alert('Không thể lấy thông tin category. Vui lòng thử lại sau.');
        //window.location.href = 'list-category.html';
    }
}

/**
 * Hàm khởi tạo DataTable cho danh sách sản phẩm
 * @param {number} categoryId - ID của category
 */
function initializeDataTable(categoryId) {
    $('#datatable-buttons').DataTable({
        processing: true, // Hiển thị thông báo đang xử lý
        serverSide: true, // Bật chế độ server-side
        ajax: {
            url: 'http://localhost:8080/api/v1/product/category', // Endpoint để lấy sản phẩm sale
            type: 'GET',
            data: function (d) {
                // Chuyển đổi các tham số từ DataTables thành các tham số phù hợp cho API của bạn
                let page = Math.floor(d.start / d.length);
                let size = d.length;
                let title = $('#productTitle').val().trim();
                let saleStartPrice = $('#saleStartPrice').val() ? parseFloat($('#saleStartPrice').val()) : null;
                let saleEndPrice = $('#saleEndPrice').val() ? parseFloat($('#saleEndPrice').val()) : null;

                return {
                    categoryId: categoryId,
                    title: title !== '' ? title : null,
                    saleStartPrice: saleStartPrice,
                    saleEndPrice: saleEndPrice,
                    page: page,
                    size: size
                };
            },
            dataSrc: function (json) {
                // Kiểm tra nếu response có content
                if (json.content) {
                    json.recordsTotal = json.totalElements;
                    json.recordsFiltered = json.totalElements;
                    return json.content;
                } else {
                    return [];
                }
            }
        },
        columns: [
            { data: 'id' },
            { 
                data: 'product.image', // Lấy hình ảnh từ Product
                render: function (data, type, row) {
                    let imageUrl = data ? data.url : '../../../static/assets_admin/images/products/default-product.png';
                    return `<img src="${imageUrl}" alt="Product Image" class="avatar-img">`;
                },
                orderable: false,
                searchable: false
            },
            { 
                data: 'product.name',
                render: function (data, type, row) {
                    return data ? data : 'N/A';
                }
            },
            { data: 'quantity' },
            { 
                data: 'price',
                render: function (data, type, row) {
                    return data ? data.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A';
                }
            },
            { 
                data: 'product.datePublic',
                render: function (data, type, row) {
                    if (!data) return 'N/A';
                    const date = new Date(data);
                    return date.toLocaleDateString('vi-VN');
                }
            },
            { 
                data: 'status',
                render: function (data, type, row) {
                    return data ? 'ACTIVE' : 'INACTIVE';
                }
            },
            { 
                data: null,
                render: function (data, type, row) {
                    return `
                        <a href="/admin/product/details/${row.product.id}.html" class="btn btn-info btn-sm">Xem Chi Tiết</a>
                    `;
                },
                orderable: false,
                searchable: false
            }
        ],
        responsive: true,
        paging: true,
        searching: false, // Tắt tìm kiếm nội bộ nếu bạn muốn sử dụng tìm kiếm qua API
        info: false,
        lengthChange: false,
        pageLength: 5,
        language: {
            emptyTable: "Không có dữ liệu nào để hiển thị",
            processing: "Đang xử lý...",
            paginate: {
                previous: "Trước",
                next: "Sau"
            }
        }
    });
}
