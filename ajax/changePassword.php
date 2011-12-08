<?php
include "../../mysqli_connect.php";

$un  = $_POST['un'];
$pass = $_POST['pass'];
$pass = sha1($pass);
$npass = $_POST['newPass'];
$npass = sha1($npass);




$selectUser = "select * from users where username='".$un."'";
$checkPassword= "select  id, username from users where username='$un' AND password='$pass'";

if(mysqli_num_rows(mysqli_query($dbc,$selectUser)) >= 1 )
{
    //Run query $checkPassword
    $r = mysqli_query($dbc,$checkPassword);
	//Count number of Rows in query result
    $num = mysqli_num_rows($r);
    
	if ($num == 1)
    {
        //Update Query, to set the new password
        $updateP = "UPDATE users SET password = ('".$npass."') WHERE username='".$un."'";
             
        $sr = mysqli_query($dbc,$updateP);
        
        if($sr)
        {
            echo "1";
        }
        else
        {
            echo "3";
        }
    }
    else
    {
        echo "4";
    }
}
else
{
    echo "2";
}



?>
