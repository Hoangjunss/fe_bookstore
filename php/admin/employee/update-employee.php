<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8"/>
    <title>Cập Nhật Nhân Viên</title>
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
        .form-group img {
            max-width: 200px;
            max-height: 200px;
        }

        /* Thêm style cho thông báo lỗi */
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
                                    <li class="breadcrumb-item"><a href="#">Nhân viên</a></li>
                                    <li class="breadcrumb-item active">Cập Nhật Nhân viên</li>
                                </ol>
                            </div>
                            <h4 class="page-title">Cập Nhật Thông Tin Nhân Viên</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->


                <div class="row">
                    <div class="col-lg">
                        <div class="card-box">
                            <form id="updateEmployeeForm" class="parsley-examples" novalidate>
                                <!-- Hidden field để lưu ID nhân viên -->
                                <input type="hidden" name="id" id="id" value="">

                                <div class="form-group">
                                    <label for="username">Tên đăng nhập <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" required
                                           placeholder="Nhập tên đăng nhập" name="username" id="username"/>
                                    <div class="error-message" id="error-username"></div>
                                </div>

                                <div class="form-group">
                                    <label for="email">Email <span class="text-danger">*</span></label>
                                    <input type="email" class="form-control" required
                                           placeholder="Nhập email" name="email" id="email"/>
                                    <div class="error-message" id="error-email"></div>
                                </div>

                                <div class="form-group">
                                    <label for="fullname">Họ và tên <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" required
                                           placeholder="Nhập họ và tên" name="fullname" id="fullname"/>
                                    <div class="error-message" id="error-fullname"></div>
                                </div>

                                <div class="form-group">
                                    <label for="role">Chức vụ <span class="text-danger">*</span></label>
                                    <select class="form-control" id="role" name="role" required>
                                        <option value="">-- Chọn chức vụ --</option>
                                        <!-- Các tùy chọn chức vụ sẽ được thêm vào đây bằng JavaScript -->
                                    </select>
                                    <div class="error-message" id="error-role"></div>
                                </div>

                                <div class="form-group">
                                    <label for="status">Trạng thái <span class="text-danger">*</span></label>
                                    <select class="form-control" id="status" name="status" required>
                                        <option value="">-- Chọn trạng thái --</option>
                                        <option value="true">ACTIVE</option>
                                        <option value="false">INACTIVE</option>
                                    </select>
                                    <div class="error-message" id="error-status"></div>
                                </div>

                                <div class="form-group">
                                    <label for="password">Mật khẩu</label>
                                    <input type="password" class="form-control"
                                           placeholder="Nhập mật khẩu mới nếu muốn thay đổi" name="password" id="password"/>
                                    <div class="error-message" id="error-password"></div>
                                </div>

                                <div class="form-group mb-0">
                                    <div>
                                        <button type="submit" class="btn btn-gradient waves-effect waves-light">
                                            Lưu thay đổi
                                        </button>
                                        <button type="reset" class="btn btn-light waves-effect ml-1">
                                            <a href="list-employee.php">Danh sách nhân viên</a>
                                        </button>
                                    </div>
                                </div>

                                <!-- Thông báo lỗi chung -->
                                <div class="form-group mt-3">
                                    <div class="error-message" id="error-message"></div>
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

    <!-- End Page content -->

</div>
<!-- END wrapper -->

<!-- Right Sidebar -->
<div class="right-bar">
    <!-- Right Sidebar content... (giống như trang insert-employee.html) -->
    <!-- ... -->
</div>
<!-- /Right-bar -->

<!-- Right bar overlay-->
<div class="rightbar-overlay"></div>

<!-- Vendor JS -->
<script src="../../../static/assets_admin/js/vendor.min.js"></script>

<!-- Plugin JS-->
<script src="../../../static/assets_admin/assets/libs/parsleyjs/parsley.min.js"></script>

<!-- Validation init JS-->
<script src="../../../static/assets_admin/assets/js/pages/form-validation.init.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.1/axios.min.js"
        integrity="sha512-bPh3uwgU5qEMipS/VOmRqynnMXGGSRv+72H/N260MQeXZIK4PG48401Bsby9Nq5P5fz7hy5UGNmC/W1Z51h2GQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- App JS -->
<script src="../../../static/assets_admin/js/app.min.js"></script>

<script src="../../../static/call-api/admin/employee/update-employee.js" defer></script>


</body>

</html>