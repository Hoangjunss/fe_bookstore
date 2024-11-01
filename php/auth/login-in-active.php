<!DOCTYPE html>
<html lang="vi"> <!-- Thay đổi lang từ 'en' sang 'vi' vì nội dung bằng tiếng Việt -->
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Đăng Nhập</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://kit.fontawesome.com/98df298cac.js" crossorigin="anonymous"></script>
    <style>
        .login-form {
            width: 340px;
            margin: 50px auto;
        }

        .login-form form {
            margin-bottom: 15px;
            background: #f7f7f7;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
            padding: 30px;
        }

        .login-form h2 {
            margin: 0 0 15px;
        }

        .form-control, .btn {
            min-height: 38px;
            border-radius: 2px;
        }

        .btn {
            font-size: 15px;
            font-weight: bold;
        }

        .form-group {
            text-align: center;
        }

        .form-group a {
            display: inline-block;
        }
    </style>
</head>
<body>
<div class="login-form">
    <form class="mt-3" action="/login" method="post" id="myForm"><!-- Thay thế th:action bằng action với đường dẫn tĩnh -->
        <h2 class="text-center">Log in</h2>
        <div class="form-group">
            <input type="text" class="form-control" id="username" name="username" placeholder="Username" required="required">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" id="password" name="password" placeholder="Password" required="required">
            <small id="passwordError" style="color: red;">Tài khoản của bạn đã bị khoá!</small>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Log in</button>
        </div>
        <div class="clearfix">
            <label class="pull-left checkbox-inline"><input type="checkbox">Remember me</label>
            <a href="/recover.html" class="pull-right">Forgot Password?</a><!-- Thay thế th:href bằng href với đường dẫn tĩnh -->
        </div>
    </form>
    <div class="form-group">
        <div>--or--</div>
    </div>
    <p class="text-center"><a href="/register.html">Create an Account</a></p><!-- Thay thế th:href bằng href với đường dẫn tĩnh -->
</div>
<script>
    document.getElementById('myForm').addEventListener('submit', function(event) {
        var passwordInput = document.getElementById('password');
        var passwordError = document.getElementById('passwordError');
        var password = passwordInput.value;
        if (password.length < 6) {
            event.preventDefault();
            passwordError.textContent = 'Mật khẩu phải có ít nhất 6 kí tự.';
        } else {
            passwordError.textContent = '';
        }
    });
</script>
</body>
</html>
