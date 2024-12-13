<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8" />
    <title>Danh sách sách</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="../../../static/assets_admin/images/favicon.ico" type="image/x-icon" />

    <!-- Third party CSS -->
    <link href="../../../static/assets_admin/libs/datatables/dataTables.bootstrap4.css" rel="stylesheet" type="text/css" />
    <link href="../../../static/assets_admin/libs/datatables/buttons.bootstrap4.css" rel="stylesheet" type="text/css" />
    <link href="../../../static/assets_admin/libs/datatables/responsive.bootstrap4.css" rel="stylesheet" type="text/css" />

    <!-- App CSS -->
    <link href="../../../static/assets_admin/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../static/assets_admin/css/icons.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../static/assets_admin/css/app.min.css" rel="stylesheet" type="text/css" />

    <script src="../../../static/call-api/admin/product/list-product.js"></script>
    <style>
        /* Thêm các kiểu tùy chỉnh nếu cần */
        .img-thumbnail {
            max-width: 100px;
            height: auto;
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
                        <a href="">
                            <i class="fe-box"></i>
                            Quản lý sản phẩm
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

    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="content-page">
        <div class="content">

            <!-- Start Content-->
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card-box table-responsive">

                            <div class="d-flex justify-content-end mb-3">

                                <button class="btn btn-success mb-1">
                                    <a href="insert-product.php" style="color: white; text-decoration: none;">Thêm sách</a>
                                </button>
                            </div>

                            <div>
                                <div class="form-row">
                                    <div class="col-md-4 mb-3">
                                        <label for="bookName">Tên sách:</label>
                                        <input type="text" class="form-control" id="bookName" placeholder="Nhập tên sách">
                                    </div>

                                    <div class="col-md-4 mb-3">
                                        <label for="status">Trạng thái:</label>
                                        <select class="form-control" id="status" name="status">
                                            <option value="">Tất cả</option>
                                            <option value="1">ACTIVE</option>
                                            <option value="0">INACTIVE</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label for="category">Thể loại sách:</label>
                                        <select class="form-control mb-4 col-4" id="category"
                                                aria-label="Default select example">
                                            <option value="0">Tất cả</option>
                                            <!-- Thêm các thể loại sách khác nếu cần -->
                                        </select>
                                    </div>
                                </div>
                                <button id="btnSearch" onclick="searchCondition(0,5)" class="btn btn-primary">Tìm
                                    kiếm</button>
                            </div>

                            <table id="datatable-buttons"
                                   class="table table-striped table-bordered dt-responsive nowrap"
                                   style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                <thead>
                                <tr>
                                    <th style="width: 80px;">ID</th>
                                    <th style="width: 150px;">Hình ảnh</th>
                                    <th style="width: 200px;">Tên sách</th>
                                    <th>Tác giả</th>
                                    <th>Số trang</th>
                                    <th>Thể loại</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                <!-- Dữ liệu sẽ được thêm bằng JavaScript -->
                                </tbody>
                            </table>
                            <nav aria-label="...">
                                <ul class="pagination" id="pageId" style="float: right;">
                                    <!-- Phân trang sẽ được thêm bằng JavaScript -->
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

<!-- Vendor JS (bao gồm jQuery) -->
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
