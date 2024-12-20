<!DOCTYPE html>
<html lang="vi"> <!-- Thay đổi lang từ 'en' sang 'vi' vì nội dung bằng tiếng Việt -->
<head>
    <meta charset="UTF-8">
    <title>Admin Profile</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description"/>
    <meta content="Coderthemes" name="author"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <!-- App favicon -->
    <!--
    <link rel="shortcut icon" href="../../static/assets_admin/images/favicon.ico">
    -->

    <!-- App css -->
    <link href="../../static/assets_admin/libs/dropzone/dropzone.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/assets_admin/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/assets_admin/css/icons.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/assets_admin/css/app.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/assets_admin/css/style.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/assets/fonts/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="../../static/assets/fonts/elegant-fonts.css" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700,900,400italic' rel='stylesheet' type='text/css'>
    <link href="../../static/assets/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="../../static/assets/css/owl.carousel.css" rel="stylesheet" type="text/css">
    <link href="../../static/assets/css/style.css" rel="stylesheet" type="text/css">
    <style>
        .profile-picture img {
            max-width: 250px;
            max-height: 250px;
            width: auto;
            height: auto;
        }

        input[type="file"] {
            display: block;
        }
        html, body {
            height: 130%;
            margin: 0;
            padding: 0;
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
                        <a href="dashboard.php">
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
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Dashboard</a></li>
                                    <li class="breadcrumb-item active">Profile</li>
                                </ol>
                            </div>
                            <h4 class="page-title">Profile</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->


                <div class="row">
                    <div class="col-lg">
                        <div class="card-box">
                            <h4 class="header-title mb-3">Thông tin cá nhân</h4>
                            <form id="form-profile" class="labels-uppercase" method="post" action="/admin/updateProfile.html" enctype="multipart/form-data">
                                <input type="hidden" id="id" name="id" value="<!-- Thay thế bằng giá trị tĩnh hoặc JavaScript -->">
                                <div class="row">
                                    <!-- Profile Picture -->
                                    <div class="col-md-3 col-sm-3">
                                        <section>
                                            <div id="profile-picture" class="profile-picture single-file-preview">
                                                <img src="../../static/assets_admin/images/avatar-default.png" alt="Avatar" class="image">
                                                <div class="input">
                                                    <input name="file" type="file" class="" id="imageInput">
                                                    <span>Chọn ảnh đại diện</span>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <script>
                                        document.getElementById('form-profile').addEventListener('submit', function (event) {
                                            let fileInput = document.getElementById('imageInput');
                                            let file = fileInput.files[0];

                                            if (file) {
                                                let maxSize = 2; // MB
                                                if (file.size > maxSize * 1024 * 1024) {
                                                    alert('Kích thước file không được vượt quá 2MB.');
                                                    event.preventDefault();
                                                    return;
                                                }

                                                let allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
                                                if (!allowedFormats.includes(file.type)) {
                                                    alert('Định dạng file không được hỗ trợ. Vui lòng chọn ảnh có định dạng JPEG, PNG hoặc GIF.');
                                                    event.preventDefault();
                                                    return;
                                                }
                                            }
                                        });
                                    </script>

                                    <div class="col-md-9 col-sm-9">
                                        <section>
                                            <div class="row">
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="form-group">
                                                        <label for="email">Email</label>
                                                        <input type="email" class="form-control" id="email" name="email"
                                                               placeholder="janedoe@gmail.com" value="admin@example.com">
                                                        <small class="text-danger error-email"></small>
                                                    </div>
                                                    <!--end form-group-->
                                                </div>
                                                <!--end col-md-6-->
                                            </div>
                                        </section>
                                        <section>
                                            <h3>Đổi mật khẩu</h3>
                                            <div class="form-group">
                                                <label for="currentPassword">Mật khẩu hiện tại</label>
                                                <input type="password" class="form-control" id="currentPassword" name="currentPassword">
                                            </div>
                                            <!--end form-group-->
                                            <div class="form-group">
                                                <label for="newPassword">Mật khẩu mới</label>
                                                <input type="password" class="form-control" id="newPassword" name="newPassword">
                                                <small class="text-danger error-newPassword"></small>
                                            </div>
                                            <!--end form-group-->
                                        </section>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-large btn-primary btn-rounded" id="submit">
                                                Lưu thay đổi
                                            </button>
                                        </div>
                                        <!-- end form-group -->
                                    </div>
                                    <!--end col-md-6-->
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
                <div class="inbox-item">
                    <div class="inbox-item-img"><img src="../../static/assets_admin/images/users/avatar-1.jpg"
                                                     class="rounded-circle" alt=""></div>
                    <p class="inbox-item-author"><a href="javascript: void(0);">Chadengle</a></p>
                    <p class="inbox-item-text">Hey! there I'm available...</p>
                    <p class="inbox-item-date">13:40 PM</p>
                </div>

                <div class="inbox-item">
                    <div class="inbox-item-img"><img src="../../static/assets_admin/images/users/avatar-2.jpg"
                                                     class="rounded-circle" alt=""></div>
                    <p class="inbox-item-author"><a href="javascript: void(0);">Tomaslau</a></p>
                    <p class="inbox-item-text">I've finished it! See you so...</p>
                    <p class="inbox-item-date">13:34 PM</p>
                </div>

                <div class="inbox-item">
                    <div class="inbox-item-img"><img src="../../static/assets_admin/images/users/avatar-3.jpg"
                                                     class="rounded-circle" alt=""></div>
                    <p class="inbox-item-author"><a href="javascript: void(0);">Stillnotdavid</a></p>
                    <p class="inbox-item-text">This theme is awesome!</p>
                    <p class="inbox-item-date">13:17 PM</p>
                </div>

                <div class="inbox-item">
                    <div class="inbox-item-img"><img src="../../static/assets_admin/images/users/avatar-4.jpg"
                                                     class="rounded-circle" alt=""></div>
                    <p class="inbox-item-author"><a href="javascript: void(0);">Kurafire</a></p>
                    <p class="inbox-item-text">Nice to meet you</p>
                    <p class="inbox-item-date">12:20 PM</p>
                </div>
                <div class="inbox-item">
                    <div class="inbox-item-img"><img src="../../static/assets_admin/images/users/avatar-5.jpg"
                                                     class="rounded-circle" alt=""></div>
                    <p class="inbox-item-author"><a href="javascript: void(0);">Shahedk</a></p>
                    <p class="inbox-item-text">Hey! there I'm available...</p>
                    <p class="inbox-item-date">10:15 AM</p>
                </div>
            </div> <!-- end inbox-widget -->
        </div> <!-- end .p-3-->

    </div> <!-- end slimscroll-menu-->
</div>
<!-- /Right-bar -->

<!-- Right bar overlay-->
<div class="rightbar-overlay"></div>


<script src="../../static/assets/js/jquery-2.2.1.min.js"></script>
<script src="../../static/assets/js/jquery-migrate-1.2.1.min.js"></script>
<script src="../../static/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="../../static/assets/js/jquery.validate.min.js"></script>
<script src="../../static/assets/js/bootstrap-datepicker.js"></script>
<script src="../../static/assets/js/icheck.min.js"></script>
<script src="../../static/assets/js/owl.carousel.js"></script>
<script src="../../static/assets/js/masonry.pkgd.min.js"></script>

<script src="../../static/assets/js/maps.js"></script>
<script src="../../static/assets/js/custom.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Vendor js -->
<script src="../../static/assets_admin/js/vendor.min.js"></script>

<!-- Plugin js-->
<script src="../../static/assets_admin/libs/parsleyjs/parsley.min.js"></script>

<!-- Validation init js-->
<script src="../../static/assets_admin/js/pages/form-validation.init.js"></script>

<!-- App js -->
<script src="../../static/assets_admin/js/app.min.js"></script>
<!-- Add this script section within the HTML document -->
<script>
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('form-profile').addEventListener('submit', function (event) {
            // Reset error messages
            document.querySelectorAll('.text-danger').forEach(function (element) {
                element.innerText = '';
            });

            // Validate email format
            var email = document.getElementById('email').value;
            if (!isValidEmail(email)) {
                document.querySelector('.error-email').innerText = 'Email phải có định dạng xxx@gmail.com';
                event.preventDefault();
            }

            // Validate new password if not empty
            var newPassword = document.getElementById('newPassword').value;
            if (newPassword.trim() !== '' && !isValidPassword(newPassword)) {
                document.querySelector('.error-newPassword').innerText = 'Mật khẩu mới phải trống hoặc có ít nhất 6 ký tự bao gồm chữ hoa, chữ thường và ký tự đặc biệt.';
                event.preventDefault();
            }
        });

        function isValidEmail(email) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function isValidPassword(password) {
            // Password must have at least 6 characters including uppercase, lowercase, and special characters
            var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            return passwordRegex.test(password);
        }
    });
</script>

</body>
</html>
