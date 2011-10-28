<?php

include "../../../mysqli_connect.php";


$un = $_POST['username'];
$p =  $_POST['password'];
$q= "select  id, username from users where username='$un' AND password=sha1('$p')";
         
       
    //  $result = mysqli_query($dbc,$q);
      $num = mysqli_num_rows(mysqli_query($dbc,$q));
	if ($num == 1) {
		session_start();
		$_SESSION['username'] = $un;
		echo "1";
       }       
                
       

?>