<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8"/>
    <title>Tạo Mới Sách</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <!-- App favicon -->
    <link rel="shortcut icon" href="../../../static/assets_admin/images/favicon.ico" type="image/x-icon"/>

    <!-- App CSS -->
    <link href="../../../static/assets_admin/libs/dropzone/dropzone.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/css/icons.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../../static/assets_admin/css/app.min.css" rel="stylesheet" type="text/css"/>

    <script src="../../../static/call-api/admin/product/insert-product.js"></script>
    <style>
        .profile-picture img, .form-group img {
            max-width: 200px;
            max-height: 200px;
            width: auto;
            height: auto;
        }
        .image-preview {
            margin-top: 10px;
            max-width: 200px;
            max-height: 200px;
        }
        .error-message {
            color: red;
            margin-top: 5px;
        }
    </style>
</head>

<body>

<!-- Begin page -->
<div id="wrapper">


    <!-- Topbar Start -->
    <div class="navbar-custom">
        <ul class="list-unstyled topnav-menu float-right mb-0">

            <!-- Language Dropdown -->
            <li class="dropdown d-none d-lg-block">
                <a class="nav-link dropdown-toggle mr-0 waves-effect waves-light" data-toggle="dropdown" href="#"
                   role="button" aria-haspopup="false" aria-expanded="false">
                    <img src="../../../static/assets_admin/images/flags/vietnam.jpg" alt="user-image" class="mr-1"
                         height="12"> <span class="align-middle">Vietnam <i class="mdi mdi-chevron-down"></i> </span>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <!-- item-->
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <img src="../../../static/assets_admin/images/flags/us.jpg" alt="user-image" class="mr-1"
                             height="12"> <span class="align-middle">English</span>
                    </a>
                </div>
            </li>


            <!-- Notifications Dropdown -->
            <li class="dropdown notification-list">
                <a class="nav-link dropdown-toggle  waves-effect waves-light" data-toggle="dropdown" href="#"
                   role="button" aria-haspopup="false" aria-expanded="false">
                    <i class="fe-bell noti-icon"></i>
                    <span class="badge badge-danger rounded-circle noti-icon-badge">9</span>
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-lg">

                    <!-- item-->
                    <div class="dropdown-item noti-title">
                        <h5 class="m-0">
                                <span class="float-right">
                                    <a href="#" class="text-dark">
                                        <small>Xoá hết</small>
                                    </a>
                                </span>Thông báo
                        </h5>
                    </div>

                    <div class="slimscroll noti-scroll">

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <div class="notify-icon bg-success"><i class="mdi mdi-comment-account-outline"></i>
                            </div>
                            <p class="notify-details">Caleb Flakelar commented on Admin<small class="text-muted">1
                                min
                                ago</small></p>
                        </a>

                        <!-- More notification items... -->

                    </div>

                    <!-- All-->
                    <a href="javascript:void(0);"
                       class="dropdown-item text-center text-primary notify-item notify-all">
                        View all
                        <i class="fi-arrow-right"></i>
                    </a>

                </div>
            </li>

            <!-- User Dropdown -->
            <li class="dropdown notification-list">
                <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"
                   href="#" role="button" aria-haspopup="false" aria-expanded="false">
                    <span class="ml-1">admin@example.com <i class="mdi mdi-chevron-down"></i> </span>
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
                    <a href="/logout.html" class="dropdown-item notify-item">
                        <i class="fe-log-out"></i>
                        <span>Logout</span>
                    </a>

                </div>
            </li>

            <!-- Settings -->
            <li class="dropdown notification-list">
                <a href="javascript:void(0);" class="nav-link right-bar-toggle waves-effect waves-light">
                    <i class="fe-settings noti-icon"></i>
                </a>
            </li>


        </ul>

        <!-- LOGO -->
        <div class="logo-box">
            <a href="#" class="logo text-center">
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
                            Quản lý user
                        </a>
                    </li>
                    <li>
                        <a href="../category/list-category.php">
                            <i class="fe-disc"></i>
                            Quản lý loại sản phẩm
                        </a>
                    </li>
                    <li>
                        <a href="../product/list-book.html">
                            <i class="fe-book"></i>
                            Quản lý sách
                        </a>
                    </li>

                    <li>
                        <a href="../order/list-order.php">
                            <i class="fe-layout"></i>
                            Quản lý đơn hàng
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
                                    <li class="breadcrumb-item"><a href="#">Sách</a></li>
                                    <li class="breadcrumb-item active">Tạo Mới Sách</li>
                                </ol>
                            </div>
                            <h4 class="page-title">Tạo Mới Thông Tin Sách</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->


                <div class="row">
                    <div class="col-lg">
                        <div class="card-box">
                            <form id="createBookForm" enctype="multipart/form-data">
                                <!-- Tên sách -->
                                <div class="form-group">
                                    <label for="bookName">Tên sách <span style="color: red;">*</span></label>
                                    <input type="text" class="form-control" required
                                           placeholder="Nhập tên sách" name="name" id="bookName"/>
                                </div>

                                <!-- Mô tả sách -->
                                <div class="form-group">
                                    <label for="description">Mô tả <span style="color: red;">*</span></label>
                                    <textarea class="form-control" id="description" name="description" rows="5"
                                              placeholder="Nhập mô tả sách" required></textarea>
                                </div>

                                <!-- Tác giả -->
                                <div class="form-group">
                                    <label for="author">Tác giả <span style="color: red;">*</span></label>
                                    <input type="text" class="form-control" required
                                           placeholder="Nhập tên tác giả" name="author" id="author"/>
                                </div>

                                <!-- Số trang -->
                                <div class="form-group">
                                    <label for="page">Số trang <span style="color: red;">*</span></label>
                                    <input type="number" class="form-control" required
                                           placeholder="Nhập số trang" name="page" id="page"/>
                                </div>

                                <!-- Ngày xuất bản -->
                                <div class="form-group">
                                    <label for="datePublic">Ngày xuất bản <span style="color: red;">*</span></label>
                                    <input type="date" class="form-control" required
                                           name="datePublic" id="datePublic"/>
                                </div>

                                <!-- Thể loại sách -->
                                <div class="form-group">
                                    <label for="category">Thể loại sách <span style="color: red;">*</span></label>
                                    <select class="form-control" id="category" name="categoryId" required>
                                        <option value="">Chọn thể loại sách</option>
                                        <option value="1">Tiểu thuyết</option>
                                        <option value="2">Khoa học</option>
                                        <option value="3">Giáo trình</option>
                                        <!-- Thêm các thể loại sách khác nếu cần -->
                                    </select>
                                </div>

                                <!-- Nhà cung cấp -->
                                <div class="form-group">
                                    <label for="supply">Nhà cung cấp <span style="color: red;">*</span></label>
                                    <select class="form-control" id="supply" name="supplyId" required>
                                        <option value="">Chọn nhà cung cấp</option>
                                        <option value="1">Nhà cung cấp A</option>
                                        <option value="2">Nhà cung cấp B</option>
                                        <option value="3">Nhà cung cấp C</option>
                                        <!-- Thêm các nhà cung cấp khác nếu cần -->
                                    </select>
                                </div>

                                <!-- Ảnh thumbnail -->
                                <div class="form-group">
                                    <label for="image">Ảnh thumbnail <span style="color: red;">*</span></label>
                                    <br>
                                    <img id="imagePreview" src="../../../static/assets_admin/images/default-thumbnail.png"
                                         alt="Thumbnail" class="image-preview">
                                    <br><br>
                                    <input type="file" name="image" id="image" accept="image/*"
                                           onchange="previewImage(this)" required/>
                                </div>

                                <!-- Kích thước sách (nếu cần) -->
                                <div class="form-group">
                                    <label for="size">Kích thước sách (ví dụ: 15x23 cm)</label>
                                    <input type="text" class="form-control" placeholder="Nhập kích thước sách"
                                           name="size" id="size"/>
                                </div>

                                <!-- Trạng thái -->
                                <div class="form-group">
                                    <label for="status">Trạng thái <span style="color: red;">*</span></label>
                                    <select class="form-control" id="status" name="status" required>
                                        <option value="1">ACTIVE</option>
                                        <option value="0">INACTIVE</option>
                                    </select>
                                </div>

                                <!-- Thông báo lỗi -->
                                <div id="error-message" class="error-message"></div>

                                <!-- Nút submit và reset -->
                                <div class="form-group mb-0">
                                    <div>
                                        <button type="submit" class="btn btn-gradient waves-effect waves-light">
                                            Lưu thay đổi
                                        </button>
                                        <button type="reset" class="btn btn-light waves-effect ml-1">
                                            <a href="list-book.html" style="color: inherit; text-decoration: none;">Danh sách sách</a>
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
                        2017 - 2019 &copy; Dashboard theme by <a href="">SWP391</a>
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

<!-- Right Sidebar (Optional) -->
<!-- ... (nếu cần thiết, giữ nguyên hoặc điều chỉnh theo nhu cầu) ... -->

<!-- Vendor JS -->
<script src="../../../static/assets_admin/js/vendor.min.js"></script>

<!-- Plugin JS-->
<script src="../../../static/assets_admin/libs/dropzone/dropzone.min.js"></script>
<script src="../../../static/assets_admin/libs/parsleyjs/parsley.min.js"></script>

<!-- Validation init JS-->
<script src="../../../static/assets_admin/js/pages/form-validation.init.js"></script>

<!-- App JS -->
<script src="../../../static/assets_admin/js/app.min.js"></script>

<!-- jQuery (Nếu chưa có) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<!-- Bootstrap JS (Nếu chưa có) -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<!-- Axios JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.1/axios.min.js"
        integrity="sha512-bPh3uwgU5qEMipS/VOmRqynnMXGGSRv+72H/N260MQeXZIK4PG48401Bsby9Nq5P5fz7hy5UGNmC/W1Z51h2GQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>



</body>
</html>
