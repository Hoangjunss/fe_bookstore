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
                        <a href="order/list-order.php">
                            <i class="fe-shopping-cart"></i>
                            Quản lý đơn hàng
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

                <div class="row">
                    <!-- Số khách hàng hiện tại -->
                    <div class="col-md-6 col-xl-3">
                        <div class="card-box tilebox-one">
                            <i class="fe-box float-right"></i>
                            <h5 class="text-muted text-uppercase mb-3 mt-0">Số khách hàng hiện tại</h5>
                            <h3 class="mb-3" id="countCustomers">0</h3> <!-- Thêm id -->
                        </div>
                    </div>

                    <!-- Số sản phẩm hiện có -->
                    <div class="col-md-6 col-xl-3">
                        <div class="card-box tilebox-one">
                            <i class="fe-layers float-right"></i>
                            <h5 class="text-muted text-uppercase mb-3 mt-0">Số sản phẩm hiện có</h5>
                            <h3 class="mb-3" id="countProducts">0</h3> <!-- Thêm id -->
                        </div>
                    </div>

                    <!-- Tổng số hoá đơn -->
                    <div class="col-md-6 col-xl-3">
                        <div class="card-box tilebox-one">
                            <i class="fe-tag float-right"></i>
                            <h5 class="text-muted text-uppercase mb-3 mt-0">Tổng số hoá đơn</h5>
                            <h3 class="mb-3" id="countOrders">0</h3> <!-- Thêm id -->
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xl-7">
                        <div class="card-box">
                            <h4 class="header-title">Thống kê doanh thu</h4>

                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="text-center mt-3">
                                        <h6 class="font-normal text-muted font-14">Trung bình số tiền mỗi đơn hàng trong tháng hiện tại</h6>
                                        <h6 class="font-18">
                                            <i class="mdi mdi-arrow-up-bold-hexagon-outline text-success"></i>
                                            <span class="text-dark" id="averageOrderValue">0 VND</span> <!-- Thêm id -->
                                        </h6>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="text-center mt-3">
                                        <h6 class="font-normal text-muted font-14">Tổng số tiền thu được trong tháng hiện tại</h6>
                                        <h6 class="font-18">
                                            <i class="mdi mdi-arrow-up-bold-hexagon-outline text-success"></i>
                                            <span class="text-dark" id="totalRevenue">0 VND</span> <!-- Thêm id -->
                                        </h6>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end row -->
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
<!-- END wrapper -->

    <!-- Axios -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-- Vendor js -->
<script src="../../static/assets_admin/js/vendor.min.js"></script>

<!-- Chart JS -->
<script src="../../static/assets_admin/libs/chart-js/Chart.bundle.min.js"></script>

<!-- Init js -->
<script src="../../static/assets_admin/js/pages/dashboard.init.js"></script>

<!-- App js -->
<script src="../../static/assets_admin/js/app.min.js"></script>

<script src="../../static/call-api/admin/dashboard.js"></script>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
    document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logout-btn");

    if (logoutButton) {
        logoutButton.addEventListener("click", function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

            // Xóa token và refreshToken khỏi localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");

            // Thông báo đăng xuất thành công (tùy chọn)
            alert("Bạn đã đăng xuất thành công!");

            // Chuyển hướng đến trang đăng nhập
            window.location.href = "../auth/login.php";
        });
    } else {
        console.error("Phần tử logoutButton không tồn tại trong DOM.");
    }
});

</script>

</body>
</html>
