<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8"/>
    <title>Chi Tiết Category</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <!-- App favicon -->
    <link rel="shortcut icon" href="../../../static/assets_admin/images/favicon.ico" type="image/x-icon">

    <!-- Third party CSS -->
    <link href="../../../static/assets_admin/libs/datatables/dataTables.bootstrap4.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/libs/datatables/buttons.bootstrap4.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/libs/datatables/responsive.bootstrap4.css" rel="stylesheet" type="text/css"/>

    <!-- App CSS -->
    <link href="../../../static/assets_admin/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/css/icons.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/css/app.min.css" rel="stylesheet" type="text/css"/>

    <!-- Your Custom CSS -->
    <style>
        .btn-success a, .btn-light a {
            color: inherit;
            text-decoration: none;
        }
        .btn-warning, .btn-danger {
            margin-right: 5px;
        }
        .pagination li a {
            cursor: pointer;
        }
        .status-select {
            width: 100%;
        }
        .error-message {
            color: red;
            margin-top: 5px;
        }
        .avatar-img {
            width: 100px;
            height: auto;
            max-height: 100px;
            border-radius: 50%;
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
                    <img src="../../../static/assets_admin/images/flags/vietnam.jpg" alt="user-image" class="mr-1" height="12">
                    <span class="align-middle">Vietnam <i class="mdi mdi-chevron-down"></i> </span>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <!-- item-->
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <img src="../../../static/assets_admin/images/flags/us.jpg" alt="user-image" class="mr-1" height="12"> <span
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
                    <a href="../profile.php" class="dropdown-item notify-item">
                        <i class="fe-user"></i>
                        <span>Thông tin cá nhân</span>
                    </a>

                    <!-- item-->
                    <a href="#" class="dropdown-item notify-item">
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
                    <img src="../../../static/assets_admin/images/logo-light.png" alt="Logo" height="16">
                    <!-- <span class="logo-lg-text-light">UBold</span> -->
                </span>
                <span class="logo-sm">
                    <!-- <span class="logo-sm-text-dark">U</span> -->
                    <img src="../../../static/assets_admin/images/logo-sm.png" alt="Logo" height="24">
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


    <!-- Left Sidebar Start -->
    <div class="left-side-menu">

        <div class="slimscroll-menu">

            <!--- Sidemenu -->
            <div id="sidebar-menu">

<ul class="metismenu" id="side-menu">

    <li class="menu-title">QUẢN LÝ</li>

    <li>
        <a href="../dashboard.php">
            <i class="fe-airplay"></i>
            <span> Dashboard </span>
        </a>
    </li>

    <li>
        <a href="../order/list-order.php">
            <i class="fe-shopping-cart"></i>
            Quản lý đơn hàng
        </a>
    </li>

    <li>
        <a href="../employee/list-employee.php">
            <i class="fe-briefcase"></i>
            Quản lý nhân viên
        </a>
    </li>
    <li>
        <a href="../user/list-user.php">
            <i class="fas fa-user"></i>
            Quản lý khách hàng
        </a>
    </li>
    <li>
        <a href="../category/list-category.php">
            <i class="fe-disc"></i>
            Quản lý loại sản phẩm
        </a>
    </li>
    <li>
        <a href="../product/list-product.php">
            <i class="fe-box"></i>
            Quản lý sản phẩm
        </a>
    </li>
    <li>
        <a href="../voucher/list-voucher.php">
            <i class="fe-percent"></i>
            Quản lý Voucher
        </a>
    </li>
    <li>
        <a href="../supply/list-supply.php">
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

    <!-- Start Page Content here -->
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
                                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                                    <li class="breadcrumb-item"><a href="#">Category</a></li>
                                    <li class="breadcrumb-item active">Chi Tiết Category</li>
                                </ol>
                            </div>
                            <h4 class="page-title">Chi Tiết Category</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->


                <!-- Thông Tin Category -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card-box">
                            <h5 class="mb-3">Thông Tin Category</h5>
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>ID:</strong> <span id="category-id"></span></p>
                                    <p><strong>Tên Category:</strong> <span id="category-name"></span></p>
                                    <p><strong>Trạng Thái:</strong> <span id="category-status"></span></p>
                                </div>
                                <!-- Bạn có thể thêm các thông tin khác nếu cần -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end Thông Tin Category -->


                <!-- Danh Sách Sản Phẩm Thuộc Category -->
                <div class="row">
                    <div class="col-12">
                        <div class="card-box table-responsive">

                            <!-- Form Tìm Kiếm (Nếu cần thiết) -->
                            <div class="mb-3">
                                <div class="form-row">
                                    <div class="col-md-4 mb-3">
                                        <label for="productTitle">Tiêu đề sản phẩm:</label>
                                        <input type="text" class="form-control" id="productTitle" placeholder="Nhập tiêu đề sản phẩm để tìm kiếm">
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label for="saleStartPrice">Giá Bắt Đầu:</label>
                                        <input type="number" class="form-control" id="saleStartPrice" placeholder="Nhập giá bắt đầu">
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label for="saleEndPrice">Giá Kết Thúc:</label>
                                        <input type="number" class="form-control" id="saleEndPrice" placeholder="Nhập giá kết thúc">
                                    </div>
                                </div>
                                <button id="btnSearchProduct" class="btn btn-primary">Tìm kiếm</button>
                            </div>

                            <!-- Bảng Danh Sách Sản Phẩm -->
                            <table id="datatable-buttons" class="table table-striped table-bordered dt-responsive nowrap" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Ảnh</th>
                                        <th>Tiêu Đề</th>
                                        <th>Số Lượng</th>
                                        <th>Giá</th>
                                        <th>Ngày Tạo</th>
                                        <th>Trạng Thái</th>
                                        <th>Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Nội dung bảng sẽ được chèn qua JavaScript -->
                                </tbody>
                            </table>
                            <!-- Phân Trang -->
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-end" id="pageId">
                                    <!-- Phân trang sẽ được chèn qua JavaScript -->
                                </ul>
                            </nav>
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
                        2023 &copy; Dashboard theme by <a href="">SWP391</a>
                    </div>

                </div>
            </div>
        </footer>
        <!-- end Footer -->

    </div>

    <!-- End Page content -->

</div>
<!-- END wrapper -->

<!-- Right Sidebar (Nếu cần thiết) -->
<div class="right-bar">
    <!-- Right Sidebar content... (giữ nguyên nếu cần thiết) -->
    <!-- ... -->
</div>
<!-- /Right-bar -->

<!-- Right bar overlay-->
<div class="rightbar-overlay"></div>

<!-- Vendor JS -->
<script src="../../../static/assets_admin/js/vendor.min.js"></script>

<!-- Required datatable js -->
<script src="../../../static/assets_admin/libs/datatables/jquery.dataTables.min.js"></script>
<script src="../../../static/assets_admin/libs/datatables/dataTables.bootstrap4.min.js"></script>
<!-- Buttons examples -->
<script src="../../../static/assets_admin/libs/datatables/dataTables.buttons.min.js"></script>
<script src="../../../static/assets_admin/libs/datatables/buttons.bootstrap4.min.js"></script>
<script src="../../../static/assets_admin/libs/jszip/jszip.min.js"></script>
<script src="../../../static/assets_admin/libs/pdfmake/pdfmake.min.js"></script>
<script src="../../../static/assets_admin/libs/pdfmake/vfs_fonts.js"></script>
<script src="../../../static/assets_admin/libs/datatables/buttons.html5.min.js"></script>
<script src="../../../static/assets_admin/libs/datatables/buttons.print.min.js"></script>

<!-- Responsive examples -->
<script src="../../../static/assets_admin/libs/datatables/dataTables.responsive.min.js"></script>
<script src="../../../static/assets_admin/libs/datatables/responsive.bootstrap4.min.js"></script>

<!-- Your Custom JS -->
<script src="../../../static/call-api/admin/category/category-details.js"></script>

<!-- Datatables init -->
<script src="../../../static/assets_admin/js/pages/datatables.init.js"></script>

<!-- App JS -->
<script src="../../../static/assets_admin/js/app.min.js"></script>

</body>
</html>