<!DOCTYPE html>
<html lang="vi"> <!-- Thay đổi lang từ 'en' sang 'vi' vì nội dung bằng tiếng Việt -->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description"/>
    <meta content="Coderthemes" name="author"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <!-- App favicon -->
    <!--
    <link rel="shortcut icon" href="../../static/assets_admin/images/favicon.ico">
    -->
    
    <!-- App css -->
    <link href="../../static/assets_admin/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/assets_admin/css/icons.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/assets_admin/css/app.min.css" rel="stylesheet" type="text/css"/>

    <style>
        /* Thêm CSS tùy chỉnh nếu cần */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px;
            border-radius: 5px;
            color: #fff;
            z-index: 1000;
            display: flex;
            align-items: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .notification.success {
            background-color: #28a745;
        }
        .notification.error {
            background-color: #dc3545;
        }
        .notification .close {
            margin-left: 10px;
            cursor: pointer;
        }
        @keyframes disappear {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    </style>
</head>

<body>

<!-- Begin page -->
<div id="wrapper">

    <!-- Topbar Start -->
    <div class="navbar-custom">
        <ul class="list-unstyled topnav-menu float-right mb-0">

            <li class="dropdown d-none d-lg-block">
                <a class="nav-link dropdown-toggle mr-0 waves-effect waves-light" data-toggle="dropdown" href="#"
                   role="button" aria-haspopup="false" aria-expanded="false">
                    <img src="../../static/assets_admin/images/flags/vietnam.jpg" alt="user-image" class="mr-1" height="12">
                    <span class="align-middle">Vietnam <i class="mdi mdi-chevron-down"></i> </span>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <!-- item-->
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <img src="../../static/assets_admin/images/flags/us.jpg" alt="user-image" class="mr-1" height="12"> <span
                                class="align-middle">English</span>
                    </a>
                </div>
            </li>


            <li class="dropdown notification-list">
                <a class="nav-link dropdown-toggle waves-effect waves-light" data-toggle="dropdown" href="#"
                   role="button" aria-haspopup="false" aria-expanded="false">
                    <i class="fe-bell noti-icon"></i>
                    <span class="badge badge-danger rounded-circle noti-icon-badge">9</span>
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-lg">

                    <!-- item-->
                    <div class="dropdown-item noti-title">
                        <h5 class="m-0">
                            <span class="float-right">
                                <a href="" class="text-dark">
                                    <small>Clear All</small>
                                </a>
                            </span>Notification
                        </h5>
                    </div>

                    <div class="slimscroll noti-scroll">

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <div class="notify-icon bg-success"><i class="mdi mdi-comment-account-outline"></i></div>
                            <p class="notify-details">Caleb Flakelar commented on Admin<small class="text-muted">1 min
                                ago</small></p>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <div class="notify-icon bg-info"><i class="mdi mdi-account-plus"></i></div>
                            <p class="notify-details">New user registered.<small class="text-muted">5 hours ago</small>
                            </p>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <div class="notify-icon bg-danger"><i class="mdi mdi-heart"></i></div>
                            <p class="notify-details">Carlos Crouch liked <b>Admin</b><small class="text-muted">3 days
                                ago</small></p>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <div class="notify-icon bg-warning"><i class="mdi mdi-comment-account-outline"></i></div>
                            <p class="notify-details">Caleb Flakelar commented on Admin<small class="text-muted">4 days
                                ago</small></p>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <div class="notify-icon bg-purple"><i class="mdi mdi-account-plus"></i></div>
                            <p class="notify-details">New user registered.<small class="text-muted">7 days ago</small>
                            </p>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <div class="notify-icon bg-primary"><i class="mdi mdi-heart"></i></div>
                            <p class="notify-details">Carlos Crouch liked <b>Admin</b><small class="text-muted">13 days
                                ago</small></p>
                        </a>

                    </div>

                    <!-- All-->
                    <a href="javascript:void(0);" class="dropdown-item text-center text-primary notify-item notify-all">
                        View all
                        <i class="fi-arrow-right"></i>
                    </a>

                </div>
            </li>

            <li class="dropdown notification-list">
                <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"
                   href="#" role="button" aria-haspopup="false" aria-expanded="false">
                    <span class="ml-1"> <!-- Thay thế th:text="${email}" bằng nội dung tĩnh hoặc JavaScript -->
                        <!-- Ví dụ: admin@example.com -->
                        admin@example.com <i class="mdi mdi-chevron-down"></i>
                    </span>
                </a>
                <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                    <!-- item-->
                    <div class="dropdown-header noti-title">
                        <h6 class="text-overflow m-0">Chào mừng!</h6>
                    </div>

                    <!-- item-->
                    <a href="profile.php" class="dropdown-item notify-item">
                        <i class="fe-user"></i>
                        <span>Thông tin cá nhân</span>
                    </a>

                    <!-- item-->
                    <a href="#" class="dropdown-item notify-item" id="logout-btn">
                        <i class="fe-log-out"></i>
                        <span>Logout</span>
                    </a>

                </div>
            </li>

            <li class="dropdown notification-list">
                <a href="javascript:void(0);" class="nav-link right-bar-toggle waves-effect waves-light">
                    <i class="fe-settings noti-icon"></i>
                </a>
            </li>


        </ul>

        <!-- LOGO -->
        <div class="logo-box">
            <a href="/admin/home.html" class="logo text-center">
                <span class="logo-lg">
                    <img src="../../static/assets_admin/images/logo-light.png" alt="Logo" height="16">
                    <!-- <span class="logo-lg-text-light">UBold</span> -->
                </span>
                <span class="logo-sm">
                    <!-- <span class="logo-sm-text-dark">U</span> -->
                    <img src="../../static/assets_admin/images/logo-sm.png" alt="Logo" height="24">
                </span>
            </a>
        </div>

        <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
                <button class="button-menu-mobile waves-effect waves-light">
                    <i class="fe-menu"></i>
                </button>
            </li>

            <li class="d-none d-sm-block">
                <form class="app-search">
                    <div class="app-search-box">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search...">
                            <div class="input-group-append">
                                <button class="btn" type="submit">
                                    <i class="fe-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </li>

        </ul>
    </div>
    <!-- end Topbar -->


    <!-- ========== Left Sidebar Start ========== -->
    <div class="left-side-menu">

        <div class="slimscroll-menu">

            <!--- Sidemenu -->
            <div id="sidebar-menu">

                <ul class="metismenu" id="side-menu">

                    <li class="menu-title">QUẢN LÝ</li>

                    <li>
                        <a href="#">
                            <i class="fe-airplay"></i>
                            <span> Dashboard </span>
                        </a>
                    </li>

                    <li>
                        <a href="employee/list-employee.php">
                            <i class="fe-briefcase"></i>
                            Quản lý nhân viên
                        </a>
                    </li>
                    <li>
                        <a href="user/list-user.php">
                            <i class="fas fa-user"></i>
                            Quản lý khách hàng
                        </a>
                    </li>
                    <li>
                        <a href="category/list-category.php">
                            <i class="fe-disc"></i>
                            Quản lý loại sản phẩm
                        </a>
                    </li>
                    <li>
                        <a href="product/list-product.php">
                            <i class="fe-box"></i>
                            Quản lý sản phẩm
                        </a>
                    </li>

                    <li>
                        <a href="supply/list-supply.php">
                            <i class="fe-layout"></i>
                            Quản lý nhà cung cấp
                        </a>
                    </li>
                </ul>

            </div>
            <!-- End Sidebar -->

            <div class="clearfix"></div>

        </div>
        <!-- Sidebar -left -->

    </div>
    <!-- Left Sidebar End -->

    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="content-page">
        <div class="content">

            <!-- Start Content-->
            <div class="container-fluid">

                <!-- start page title -->
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">SWP391_G1</a></li>
                                    <li class="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>
                            <h4 class="page-title">Dashboard</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->

                


                </div>


                <div class="row">
                    <div class="col-xl-7">
                        <div class="card-box">
                            <h4 class="header-title">Thống kê doanh thu</h4>

                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="text-center mt-3">
                                        <h6 class="font-normal text-muted font-14">Tổng Số Lượng sản phẩm đã bán trong tháng này</h6>
                                        <h6 class="font-18">
                                            <i class="mdi mdi-arrow-up-bold-hexagon-outline text-success"></i>
                                            <span class="text-dark quantitySaleMonth"></span> <!-- Thay thế th:text bằng giá trị tĩnh hoặc JavaScript -->
                                        </h6>
                                    </div>

                                </div>
                                <div class="col-sm-4">
                                    <div class="text-center mt-3">
                                        <h6 class="font-normal text-muted font-14">Tổng số tiền thu được trong tháng hiện tại</h6>
                                        <h6 class="font-18">
                                            <i class="mdi mdi-arrow-up-bold-hexagon-outline text-success"></i>
                                            <span class="text-dark priceSaleMonth">0 VND</span> <!-- Thay thế th:text bằng giá trị tĩnh hoặc JavaScript -->
                                        </h6>
                                    </div>
                                </div>
                                <div class="row">
                                <div class="col-sm-4">
                                    <div class="text-center mt-3">
                                        <h6 class="font-normal text-muted font-14">Tổng Số Lượng sản phẩm đã bán trong năm này</h6>
                                        <h6 class="font-18">
                                            <i class="mdi mdi-arrow-up-bold-hexagon-outline text-success"></i>
                                            <span class="text-dark quantityPSaleYear"></span> <!-- Thay thế th:text bằng giá trị tĩnh hoặc JavaScript -->
                                        </h6>
                                    </div>

                                </div>
                                <div class="col-sm-4">
                                    <div class="text-center mt-3">
                                        <h6 class="font-normal text-muted font-14">Tổng số tiền thu được trong năm hiện tại</h6>
                                        <h6 class="font-18">
                                            <i class="mdi mdi-arrow-up-bold-hexagon-outline text-success"></i>
                                            <span class="text-dark priceSaleYear">0 VND</span> <!-- Thay thế th:text bằng giá trị tĩnh hoặc JavaScript -->
                                        </h6>
                                    </div>
                                </div>
                            </div>

                            <canvas id="financeChart"></canvas>
                            <script>
                                // Dữ liệu tĩnh hoặc lấy từ nguồn khác
                                const financeData = {
                                    labels: ['01-10-2023', '02-10-2023', '03-10-2023', '04-10-2023', '05-10-2023'],
                                    datasets: [{
                                        label: 'Tổng số tiền',
                                        data: [1000000, 1500000, 1300000, 1700000, 1600000],
                                        fill: false,
                                        borderColor: 'rgb(75, 192, 192)',
                                        tension: 0.1
                                    }]
                                };

                                const ctx = document.getElementById('financeChart').getContext('2d');
                                new Chart(ctx, {
                                    type: 'line',
                                    data: financeData,
                                    options: {
                                        responsive: true
                                    }
                                });
                            </script>
                        </div>
                    </div>
                </div>
                <!-- end row -->
                <div class="row">
                    <div class="col-xl-7">
                        <div class="card-box">
                            <h4 class="header-title">Thống kê nhập hàng</h4>

                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="text-center mt-3">
                                        <h6 class="font-normal text-muted font-14">Tổng Số Lượng sản phẩm đã nhập trong tháng này</h6>
                                        <h6 class="font-18">
                                            <i class="mdi mdi-arrow-up-bold-hexagon-outline text-success"></i>
                                            <span class="text-dark quantityWarehouseMonth"></span> <!-- Thay thế th:text bằng giá trị tĩnh hoặc JavaScript -->
                                        </h6>
                                    </div>

                                </div>
                                <div class="col-sm-4">
                                    <div class="text-center mt-3">
                                        <h6 class="font-normal text-muted font-14">Tổng số tiền nhập hàng trong tháng hiện tại</h6>
                                        <h6 class="font-18">
                                            <i class="mdi mdi-arrow-up-bold-hexagon-outline text-success"></i>
                                            <span class="text-dark priceWarehouseMonth">0 VND</span> <!-- Thay thế th:text bằng giá trị tĩnh hoặc JavaScript -->
                                        </h6>
                                    </div>
                                </div>
                                <div class="row">
                                <div class="col-sm-4">
                                    <div class="text-center mt-3">
                                        <h6 class="font-normal text-muted font-14">Tổng Số Lượng sản phẩm đã nhập trong năm này</h6>
                                        <h6 class="font-18">
                                            <i class="mdi mdi-arrow-up-bold-hexagon-outline text-success"></i>
                                            <span class="text-dark quantityWarehouseYear"></span> <!-- Thay thế th:text bằng giá trị tĩnh hoặc JavaScript -->
                                        </h6>
                                    </div>

                                </div>
                                <div class="col-sm-4">
                                    <div class="text-center mt-3">
                                        <h6 class="font-normal text-muted font-14">Tổng số tiền nhập hàng trong năm hiện tại</h6>
                                        <h6 class="font-18">
                                            <i class="mdi mdi-arrow-up-bold-hexagon-outline text-success"></i>
                                            <span class="text-dark priceWarehouseYear">0 VND</span> <!-- Thay thế th:text bằng giá trị tĩnh hoặc JavaScript -->
                                        </h6>
                                    </div>
                                </div>
                            </div>

                            <canvas id="financeChart"></canvas>
                            <script>
                                // Dữ liệu tĩnh hoặc lấy từ nguồn khác
                                const financeData = {
                                    labels: ['01-10-2023', '02-10-2023', '03-10-2023', '04-10-2023', '05-10-2023'],
                                    datasets: [{
                                        label: 'Tổng số tiền',
                                        data: [1000000, 1500000, 1300000, 1700000, 1600000],
                                        fill: false,
                                        borderColor: 'rgb(75, 192, 192)',
                                        tension: 0.1
                                    }]
                                };

                                const ctx = document.getElementById('financeChart').getContext('2d');
                                new Chart(ctx, {
                                    type: 'line',
                                    data: financeData,
                                    options: {
                                        responsive: true
                                    }
                                });
                            </script>
                        </div>
                    </div>
                </div>

            </div> <!-- end container-fluid -->

        </div> <!-- end content -->


        <!-- Footer Start -->
        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        2017 - 2019 &copy; Abstack theme by <a href="">Coderthemes</a>
                    </div>

                </div>
            </div>
        </footer>
        <!-- end Footer -->

    </div>

    <!-- ============================================================== -->
    <!-- End Page content -->
    <!-- ============================================================== -->

</div>

<script>
        document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            window.location.href = '../auth/login.php'; // Chuyển về trang login
        });
        async function fetchStatisticsMonth() {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const params = {
           month:month,
           year:year
        };

  try {
    const response = await fetch("http://localhost:8080/api/v1/orders/statistics",{params});
    const data = await response.json();
   

    // Assuming the total revenue is in the 'totalRevenue' property of the response
    const totalRevenue = data.totalPrice;
    const totalQuantity= data.totalQuantity;

  
    // Update the HTML element with the fetched data
    const revenueElement = document.querySelector('.priceSaleMonth');
    revenueElement.textContent = totalRevenue + ' VND';
    const quantityElement = document.querySelector('.quantitySaleMonth');
    quantityElement.textContent = totalQuantity ;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    // Handle errors, e.g., display an error message
  }
}
async function fetchStatisticsYear() {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const params = {
           month:null,
           year:year
        };

  try {
    const response = await fetch("http://localhost:8080/api/v1/orders/statistics",{params});
    const data = await response.json();
   

    // Assuming the total revenue is in the 'totalRevenue' property of the response
    const totalRevenue = data.totalPrice;
    const totalQuantity= data.totalQuantity;

  
    // Update the HTML element with the fetched data
    const revenueElement = document.querySelector('.priceSaleYear');
    revenueElement.textContent = totalRevenue + ' VND';
    const quantityElement = document.querySelector('.quantitySaleYear');
    quantityElement.textContent = totalQuantity ;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    // Handle errors, e.g., display an error message
  }
}
async function fetchStatisticsWarehouseMonth() {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const params = {
           month:month,
           year:year
        };

  try {
    const response = await fetch("http://localhost:8080/api/v1/warehouse/statistics",{params});
    const data = await response.json();
   

    // Assuming the total revenue is in the 'totalRevenue' property of the response
    const totalRevenue = data.totalPrice;
    const totalQuantity= data.totalQuantity;

  
    // Update the HTML element with the fetched data
    const revenueElement = document.querySelector('.priceWarehouseMonth');
    revenueElement.textContent = totalRevenue + ' VND';
    const quantityElement = document.querySelector('.quantityWarehouseMonth');
    quantityElement.textContent = totalQuantity ;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    // Handle errors, e.g., display an error message
  }
}
async function fetchStatisticsWarehouseYear() {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const params = {
           month:null,
           year:year
        };

  try {
    const response = await fetch("http://localhost:8080/api/v1/Warehouse/statistics",{params});
    const data = await response.json();
   

    // Assuming the total revenue is in the 'totalRevenue' property of the response
    const totalRevenue = data.totalPrice;
    const totalQuantity= data.totalQuantity;

  
    // Update the HTML element with the fetched data
    const revenueElement = document.querySelector('.priceWarehouseYear');
    revenueElement.textContent = totalRevenue + ' VND';
    const quantityElement = document.querySelector('.quantityWarehouseYear');
    quantityElement.textContent = totalQuantity ;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    // Handle errors, e.g., display an error message
  }
}

// Call the function to fetch data on page load or when needed
fetchStatisticsMonth();
fetchStatisticsYear();
fetchStatisticsWarehouseMonth();
fetchStatisticsWarehouseYear();
    });
</script>

<!-- END wrapper -->

<!-- Vendor js -->
<script src="../../static/assets_admin/js/vendor.min.js"></script>

<!-- Chart JS -->
<script src="../../static/assets_admin/libs/chart-js/Chart.bundle.min.js"></script>

<!-- Init js -->
<script src="../../static/assets_admin/js/pages/dashboard.init.js"></script>

<!-- App js -->
<script src="../../static/assets_admin/js/app.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</body>
</html>
