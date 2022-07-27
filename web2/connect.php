<?php
$host = 'localhost';
$dbuser = 'topic';
$dbpassword = '';
$dbname = 'test';
$link = mysqli_connect($host, $dbuser, $dbpassword, $dbname);
if ($link) {
    //mysqli_query($link, 'SET NAMES uff8');
    echo "正確連接資料庫";
	echo $_POST["name"];
	echo $_POST["email"];
}
else {
    echo "不正確連接資料庫</br>" . mysqli_connect_error();
}
?>
