<?php
include "../../mysqli_connect.php";

$username  = $_POST['username'];
$pass = $_POST['pass'];
$pass = sha1($pass);


$selectUser = "select * from users where username='".$username."'";
$checkPassword= "SELECT id, username FROM users WHERE username='$username' AND password='$pass'";

if(mysqli_num_rows(mysqli_query($dbc,$selectUser)) >= 1 )
{
    //Run query $checkPassword
    $r = mysqli_query($dbc,$checkPassword);
	//Count number of Rows in query result
    $num = mysqli_num_rows($r);
    
	if ($num == 1)
    {
        //Delete Query, to delete the account
        //echo "<script>alert('.$un')</script>"
        $deleteAccount = "DELETE FROM users WHERE username='$username'";
                     
        $sr = mysqli_query($dbc,$deleteAccount);
        
        if($sr)
        {
            echo "1";
        }
        else
        {
            echo "3";
        }
    }
    else if($num < 1)
    {
        echo "4";
    }
}
else
{
    echo "2";
}



?>
