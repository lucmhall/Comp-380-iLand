<?php

include "../../mysqli_connect.php";


$un = $_POST['username'];
$p =  $_POST['password'];
$q= "select  picture, id, username from users where username='$un' AND password=sha1('$p')";


        
       
    $r = mysqli_query($dbc,$q);
	
    $num = mysqli_num_rows($r);
	if ($num == 1) {
		session_start();
		$_SESSION['username'] = $un;
		echo "1";
		$values = mysql_fetch_assoc($r);
		//$_SESSION['pic'] = $values['picture'];
		$_SESSION['pic'] = "1";
       }       
                
       

?>
