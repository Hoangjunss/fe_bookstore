<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8"/>
    <title>Danh sách đơn hàng chờ duyệt</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <!-- App favicon -->
    <link rel="shortcut icon" href="../../../static/assets_admin/images/favicon.ico" type="image/x-icon"/>

    <!-- Third party CSS -->
    <link href="../../../static/assets_admin/libs/datatables/dataTables.bootstrap4.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/libs/datatables/buttons.bootstrap4.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/libs/datatables/responsive.bootstrap4.css" rel="stylesheet" type="text/css"/>

    <!-- App CSS -->
    <link href="../../../static/assets_admin/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/css/icons.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/css/app.min.css" rel="stylesheet" type="text/css"/>


    <style>
        .btn-light a {
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

        .btn-success a {
            color: white;
            text-decoration: none;
        }
        .btn-warning, .btn-danger, .btn-info {
            margin-right: 5px;
        }
        .pagination li a {
            cursor: pointer;
        }
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
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
        .notification.show {
            opacity: 1;
        }
        .notification.success {
            background-color: #28a745;
        }
        .notification.error {
            background-color: #dc3545;
        }
        .notification.info {
            background-color: #17a2b8;
        }
        .notification .close {
            margin-left: 10px;
            cursor: pointer;
            font-weight: bold;
        }
    </style>
</head>

<body>

<!-- Loading Overlay -->
<div id="loading-overlay" style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.8) url('../../../static/assets_admin/images/loading.gif') no-repeat center center;
    z-index: 9999;
    display: none;
"></div>


<!-- Begin page -->
<div id="wrapper">

<div id="notification-container"></div>
    
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
                                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                                    <li class="breadcrumb-item"><a href="#">Đơn hàng</a></li>
                                    <li class="breadcrumb-item active">Danh Sách Đơn Hàng</li>
                                </ol>
                            </div>
                            <h4 class="page-title">Danh Sách Đơn Hàng</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->


                <div class="row">
                    <div class="col-12">
                        <div class="card-box table-responsive">

                            <!-- Nút Thêm Mới Đơn Hàng (Nếu cần thiết) -->
                            <!-- <div class="d-flex justify-content-end mb-3">
                                <button class="btn btn-success">
                                    <a href="insert-order.php" style="color: white; text-decoration: none;">Thêm đơn hàng</a>
                                </button>
                            </div> -->

                            <!-- Form Tìm Kiếm -->
                                <div class="mb-3">
                                    <div class="form-row">
                                        <!-- Tìm kiếm theo Email -->
                                        <div class="col-md-4 mb-3">
                                            <label for="email">Email:</label>
                                            <input type="text" class="form-control" id="email" placeholder="Nhập email">
                                        </div>
                                        <!-- Lọc theo Trạng Thái -->
                                        <div class="col-md-4 mb-3">
                                            <label for="status">Trạng thái:</label>
                                            <select class="form-control" id="status" required>
                                                <option value="PENDING">PENDING</option>
                                                <option value="REJECT">REJECT</option>
                                                <option value="ACCESS">ACCESS</option>
                                                <option value="SUCCESS">Giao Hàng</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button id="btnSearch" class="btn btn-primary">Tìm kiếm</button>
                                </div>

                            <!-- Bảng Danh Sách Đơn Hàng -->
                            <table id="datatable-buttons"
                                   class="table table-striped table-bordered dt-responsive nowrap"
                                   style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Số sản phẩm</th>
                                    <th>Tổng giá trị</th>
                                    <th>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                            <!-- Phân Trang -->
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-end" id="pageId">
                                    <!-- Các nút phân trang sẽ được thêm vào đây bằng JavaScript -->
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

<!-- Right Sidebar -->
<div class="right-bar">
    <div class="rightbar-title">
        <a href="javascript:void(0);" class="right-bar-toggle float-right">
            <i class="mdi mdi-close"></i>
        </a>
        <h5 class="m-0 text-white">Settings</h5>
    </div>
    <div class="slimscroll-menu">
        <hr class="mt-0">
        <h5 class="pl-3">Basic Settings</h5>
        <hr class="mb-0"/>


        <div class="p-3">
            <div class="custom-control custom-checkbox mb-2">
                <input type="checkbox" class="custom-control-input" id="customCheck1" checked>
                <label class="custom-control-label" for="customCheck1">Notifications</label>
            </div>
            <div class="custom-control custom-checkbox mb-2">
                <input type="checkbox" class="custom-control-input" id="customCheck2" checked>
                <label class="custom-control-label" for="customCheck2">API Access</label>
            </div>
            <div class="custom-control custom-checkbox mb-2">
                <input type="checkbox" class="custom-control-input" id="customCheck3">
                <label class="custom-control-label" for="customCheck3">Auto Updates</label>
            </div>
            <div class="custom-control custom-checkbox mb-2">
                <input type="checkbox" class="custom-control-input" id="customCheck4" checked>
                <label class="custom-control-label" for="customCheck4">Online Status</label>
            </div>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck5">
                <label class="custom-control-label" for="customCheck5">Auto Payout</label>
            </div>
        </div>

        <!-- Messages -->
        <hr class="mt-0"/>
        <h5 class="pl-3 pr-3">Messages <span class="float-right badge badge-pill badge-danger">24</span></h5>
        <hr class="mb-0"/>
        <div class="p-3">
            <div class="inbox-widget">
                <!-- Inbox items... -->
            </div> <!-- end inbox-widget -->
        </div> <!-- end .p-3-->

    </div> <!-- end slimscroll-menu-->
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

<!-- Datatables init -->
<script src="../../../static/assets_admin/js/pages/datatables.init.js"></script>

<!-- App JS -->
<script src="../../../static/assets_admin/js/app.min.js"></script>

<script src="../../../static/call-api/admin/order/list-order.js"></script>


<!-- Axios JS (Nếu cần sử dụng Axios thay vì Fetch) -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.1/axios.min.js"
        integrity="sha512-bPh3uwgU5qEMipS/VOmRqynnMXGGSRv+72H/N260MQeXZIK4PG48401Bsby9Nq5P5fz7hy5UGNmC/W1Z51h2GQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->


</body>
</html>
