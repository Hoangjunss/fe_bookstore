<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8"/>
    <title>Xuất Hàng từ Kho</title>
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

    <script src="../../../static/call-api/employee/productsale/add-productsale.js" defer></script>

    <style>
        .avatar-img {
            width: 100px;
            height: auto;
            max-height: 100px;
            border-radius: 50%;
        }
        .status-badge {
            font-size: 1rem;
        }
        .btn-back {
            margin-bottom: 20px;
        }
        .error-message {
            color: red;
            margin-top: 5px;
        }
        .product-image {
            width: 150px;
            height: auto;
            border-radius: 5px;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
    </style>
</head>

<body>

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
                    employee@example.com <i class="mdi mdi-chevron-down"></i>
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
                        <a href="../order/list-order.php">
                            <i class="fe-shopping-cart"></i>
                            Quản lý đơn hàng
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fe-tag"></i>
                            Quản lý sản phẩm bán
                        </a>
                    </li>
                    <li>
                        <a href="../warehouse/list-warehouse.php">
                            <i class="fe-archive"></i>
                            Quản lý kho hàng 
                        </a>
                    </li>
                    <li>
                        <a href="../warehouse/list-warehousereceipt.php">
                            <i class="fe-file-plus"></i>
                            Quản lý phiếu nhập 
                        </a>
                    </li>
                    <li>
                        <a href="../order/list-order.php">
                            <i class="fe-percent"></i>
                            Quản lý Voucher
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
                                    <li class="breadcrumb-item"><a href="#">Product Sale</a></li>
                                    <li class="breadcrumb-item active">Xuất Hàng</li>
                                </ol>
                            </div>
                            <h4 class="page-title">Xuất Hàng từ Kho</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->


                <div class="row">
                    <div class="col-12">
                        <div class="card-box table-responsive">

                            <!-- Nút Quay Lại Danh Sách Product Sale -->
                            <div class="btn-back">
                                <button class="btn btn-light">
                                    <a href="list-productsale.php">Quay lại danh sách Product Sale</a>
                                </button>
                            </div>

                            <!-- Dropdown Select Product Sale -->
                            <!-- <div class="mb-4">
                                <h5>Chọn Product Sale</h5>
                                <select id="productsale-select" class="form-control">
                                    <option value="">-- Chọn Product Sale --</option>
                                    <option value="">Công chúa bong bóng</option>
                                </select>
                            </div> -->

                            <!-- Thông Tin Product Sale -->
                            <div class="mb-4">
                                <h5>Thông Tin Product Sale</h5>
                                <table class="table table-bordered">
                                    <tbody class="hello">
                                    <tr>
                                        <th>ID Product Sale</th>
                                        <td id="productsale-id">1</td>
                                        <th>Giá Bán</th>
                                        <td id="productsale-price">100000</td>
                                    </tr>
                                    <tr>
                                        <th>Số Lượng</th>
                                        <td id="productsale-quantity">10</td>
                                        <th>Trạng Thái</th>
                                        <td>
                                            <span id="productsale-status" class="status-badge badge badge-info">active</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Danh Sách Sản Phẩm Trong Kho -->
                            <div class="mb-4">
                                <h5>Sản Phẩm Trong Kho</h5>
                                <table id="warehouse-table"
                                       class="table table-striped table-bordered dt-responsive nowrap"
                                       style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>ID Kho</th>
                                        <th>Tên Sản Phẩm</th>
                                        <th>Số Lượng Trong Kho</th>
                                        <th>Giá</th>
                                        <th>Ngày Nhập</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <td>1</td>
                                        <td>Công chúa bong bóng</td>
                                        <td>100</td>
                                        <td>90000</td>
                                        <td>20-12-2004</td>
                                    <!-- Nội dung bảng sẽ được chèn qua JavaScript -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- Form Xuất Hàng -->
                            <div class="mb-4">
                                <h5>Thông Tin Xuất Hàng</h5>
                                <form id="export-form">
                                    <div class="form-group">
                                        <label for="export-price">Giá Bán (VND)</label>
                                        <input type="number" class="form-control" id="export-price" name="price" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="export-quantity">Số Lượng Xuất (Sản Phẩm)</label>
                                        <input type="number" class="form-control" id="export-quantity" name="quantity" min="1" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Xuất Hàng</button>
                                </form>
                            </div>

                            <!-- Thông Báo Lỗi Chung -->
                            <div class="form-group mt-3">
                                <div class="error-message" id="error-message"></div>
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
                        2017 - 2019 &copy; Abstack theme by <a href="https://coderthemes.com/">Coderthemes</a>
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


</body>
</html>
