<?php
include "../../../mysqli_connect.php";
$un  = $_POST['un'];
$pass = $_POST['pass'];
$pass = sha1($pass);

$tq = "select * from users where username='".$un."'";

if(mysqli_num_rows(mysqli_query($dbc,$tq)) >= 1 ){

echo "2";
}else{


$q = "insert into users (username, password) VALUES ('".$un."','".$pass."')";
$r = mysqli_query($dbc,$q);
	if($r){
	session_start();
	echo "1";
	
	$_SESSION['username']  = $un;
	}
}



?>
