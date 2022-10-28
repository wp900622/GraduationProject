<?
require_once 'connect.php';
?>
<!doctype html>
<html lang="utf-8">
<!--登入-->

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>login page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <link href="boostrap.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!--導覽列顏色-->
    <style>
        .bg-amos {
            background-color: #9898da;
        }

        body {
            background-color: #b1b1ec;
        }

        i {
            font-size: x-large;
        }

        /*手機*/
        .bg-log {
            background-color: #9898da;
            width: 100%;
        }

        /*平板*/
        @media screen and (min-width: 768px) {
            .bg-log {
                width: 60%;
            }
        }

        /*電腦*/
        @media screen and (min-width: 992px) {
            .bg-log {
                width: 60%;
            }
        }
    </style>
</head>

<body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous"></script>


    <!--導覽列-->
    <nav class="navbar navbar-expand-lg navbar-darks bg-amos mb-5">
        <div class="container-fluid">
            <a class="navbar-brand" style="color:#ffffff"><strong>學生資源平台</strong></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link link-dark" href="home.html">首頁</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-dark" href="stdscore.html">志工</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link link-dark" href="student.html">學生</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-dark" href="school.html">校方</a>
                    </li>
                </ul>
                <!--icon-->
                <div class="btn-group">
                    <button type="button" class="btn " data-bs-toggle="dropdown" data-display="static">
                        <i class="bi bi-person-circle"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-xl-end">
                        <li><a class="dropdown-item" href="login.html">登入</a></li>
                        <li><a class="dropdown-item" href="register.html">註冊</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <!--登入-->
    <div class="container bg-log rounded p-3">
        <h3 class="p-3" style="text-align: center ;">登入</h3>
        <div class="col-6 col-md-5 col-xl-4 mx-auto">
            <form action="connect.php" method="post">
                <label for="exampleInputEmail1" class="form-label">電子郵件</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </form>
        </div>
        <div class="col-6 col-md-5 col-xl-4 mx-auto">
            <label for="exampleInputPassword1" class="form-label">密碼</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <!--選擇身分-->
        <div class="col-6 col-md-5 col-xl-4 mx-auto">
            --選擇身分--
            <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option selected disabled value="">選擇身分</option>
                <option value="1">學生</option>
                <option value="2">志工</option>
                <option value="3">校方</option>
            </select>
        </div>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
            <a href="register.html" class="me-md-2">還沒註冊?</a>
            <a href="register.html" class="me-md-2" type="button">忘記密碼?</a>
            <button class="btn btn-primary col-3 col-xl-2 " type="button">登入</button>
        </div>
    </div>




    <!--下方欄位-->
    <footer role="contentinfo ">
        <div class="p-5 container-fluid">
            <div class="footerlinks row-fluid ">
                <hr>
                <span class="copy" style="color: #ffffff;">TEST</span>
                <div class="footnote span12">
                    <p style="text-align: center;"><span style="color: #ffffff;"></span></p>
                    <span class="col-4" style="color: #ffffff;"> 聯絡資訊</span><br>
                    <!--<p style="text-align: center ;"></p>-->
                    <span style="color: #ffffff;"> 電話：0912345678</span>

                    <p style="text-align: center;"><span style="color: #ffffff;"></span></p>
                </div>
            </div>
        </div>
    </footer>

</body>

</html>