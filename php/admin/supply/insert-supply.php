<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8"/>
    <title>Thêm nhà cung cấp</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <!-- App favicon -->
    <link rel="shortcut icon" href="../../../static/assets_admin/images/favicon.ico" type="image/x-icon"/>

    <!-- App CSS -->
    <link href="../../../static/assets_admin/libs/dropzone/dropzone.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/css/icons.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/css/app.min.css" rel="stylesheet" type="text/css"/>

    <style>
        /* Style cho thông báo lỗi */
        .error-message {
            color: red;
            margin-top: 5px;
        }

        /* Style nút trở lại danh sách */
        .btn-light a {
            color: inherit;
            text-decoration: none;
        }

        /* Style cho thông báo thành công hoặc lỗi */
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
        .notification .close {
            margin-left: 10px;
            cursor: pointer;
            font-weight: bold;
        }
    </style>
</head>

<body>

<!-- Notification Container -->
<div id="notification-container"></div>

<!-- Begin page -->
<div id="wrapper">


    <!-- Topbar Start -->
    <div class="navbar-custom">
        <ul class="list-unstyled topnav-menu float-right mb-0">

            <!-- Ngôn ngữ và thông báo (giữ nguyên) -->
            <!-- ... -->

            <li class="dropdown notification-list">
                <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"
                   href="#" role="button" aria-haspopup="false" aria-expanded="false">
                    <span class="ml-1">
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
                    <a href="#" class="dropdown-item notify-item" id="logout-btn">
                        <i class="fe-log-out"></i>
                        <span>Logout</span>
                    </a>

                </div>
            </li>

            <!-- Cài đặt và sidebar (giữ nguyên) -->
            <!-- ... -->

        </ul>

        <!-- LOGO -->
        <div class="logo-box">
            <a href="/admin/home.html" class="logo text-center">
                <span class="logo-lg">
                    <img src="../../../static/assets_admin/images/logo-light.png" alt="Logo" height="16">
                </span>
                <span class="logo-sm">
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
                        <a href="../user/list-user.php">
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
                        <a href="#">
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
                                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                                    <li class="breadcrumb-item"><a href="#">Nhà cung cấp</a></li>
                                    <li class="breadcrumb-item active">Thêm nhà cung cấp</li>
                                </ol>
                            </div>
                            <h4 class="page-title">Thêm thông tin nhà cung cấp</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->


                <div class="row">
                    <div class="col-lg">
                        <div class="card-box">
                            <form id="myForm" data-parsley-validate>
                                <!-- Tên nhà cung cấp -->
                                <div class="form-group">
                                    <label for="name">Tên nhà cung cấp <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" required
                                           placeholder="Nhập tên nhà cung cấp" name="name" id="name"/>
                                    <div class="error-message" id="error-name"></div>
                                </div>

                                <!-- Địa chỉ -->
                                <div class="form-group">
                                    <label for="address">Địa chỉ <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" required
                                           placeholder="Nhập địa chỉ" name="address" id="address"/>
                                    <div class="error-message" id="error-address"></div>
                                </div>

                                <!-- Số điện thoại -->
                                <div class="form-group">
                                    <label for="phone">Số điện thoại <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" required
                                           placeholder="Nhập số điện thoại" name="phone" id="phone"/>
                                    <div class="error-message" id="error-phone"></div>
                                </div>

                                <!-- Trạng thái -->
                                <div class="form-group">
                                    <label for="status">Trạng thái <span class="text-danger">*</span></label>
                                    <select class="form-control" id="status" name="status" required>
                                        <option value="">-- Chọn trạng thái --</option>
                                        <option value="true">ACTIVE</option>
                                        <option value="false">INACTIVE</option>
                                    </select>
                                    <div class="error-message" id="error-status"></div>
                                </div>

                                <!-- Thông báo lỗi chung -->
                                <div class="form-group mt-3">
                                    <div class="error-message" id="error-message"></div>
                                </div>

                                <!-- Nút submit và reset -->
                                <div class="form-group mb-0">
                                    <div>
                                        <button type="submit" class="btn btn-gradient waves-effect waves-light">
                                            Lưu thay đổi
                                        </button>
                                        <button type="reset" class="btn btn-light waves-effect ml-1">
                                            <a href="list-supply.php">Danh sách nhà cung cấp</a>
                                        </button>
                                    </div>
                                </div>
                            </form>
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

<!-- Plugin JS-->
<script src="../../../static/assets_admin/libs/dropzone/dropzone.min.js"></script>
<script src="../../../static/assets_admin/libs/parsleyjs/parsley.min.js"></script>

<!-- Validation init JS-->
<script src="../../../static/assets_admin/js/pages/form-validation.init.js"></script>

<!-- App JS -->
<script src="../../../static/assets_admin/js/app.min.js"></script>

<!-- Axios JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.1/axios.min.js"
        integrity="sha512-bPh3uwgU5qEMipS/VOmRqynnMXGGSRv+72H/N260MQeXZIK4PG48401Bsby9Nq5P5fz7hy5UGNmC/W1Z51h2GQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- JavaScript cho thêm nhà cung cấp -->
<script src="../../../static/call-api/admin/supply/insert-supply.js"></script>

</body>
</html>
