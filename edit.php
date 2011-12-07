<?php
session_start();
if(isset($_SESSION['username'])){

	$username = $_SESSION['username'];
	$userpic = $_SESSION['pic'];
?>
<script>var loggedIn= true; 
        var username ="<?php echo $username ?>";
		var userpic ="<?php echo $userpic ?>";
        var test= "test";
		//window.alert(userpic);
</script>
<?php
}

    
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>iLand Edit Account</title>
        <!-- Stylesheet for JQueryUI -->
        
        <link type="text/css" href="js/css/custom-theme/jquery-ui-1.8.16.custom.css" rel="stylesheet" />	
        <!-- Main Stylesheet -->
        <link href="styleEdit.css" rel="stylesheet" type="text/css" />
		<!-- styles needed by jScrollPane -->
		<link type="text/css" href="js/css/jquery.jscrollpane.css" rel="stylesheet" media="all" />
		
        
        <script type="text/javascript" src="js/jquery-1.6.1.min.js"></script>
        <script type="text/javascript" src="js/jQueryUI/jQueryUI.js"></script>
        <script type="text/javascript" src="js/edit.js"></script> 
        <link rel="SHORTCUT ICON" href="http://iland.grid.csun.edu/favicon.ico"/>
    </head>
    <body>

	    <div id="container">
		    <div id="edit">
                <img id="gusta" src="images/gusta1.png"/>
                <img src="images/logo.png" alt="logo_iLand" id="logo" style="margin-top:20px;margin-left:325px;position:absolute;" align="center"/>
                <div id="description">Edit your account!</div>
     
                <div id="changeAccountForm">
                    <form action="javascript:;" method="post" id="changeAcct" >
                        <div id="changeContainer">
                            
                            Username<input type='text' name='username' size='30' id='un' /> 
                            Password<input type="password" size="30" id="pass"/>
                            New Password<input type="password" size="30" id="newPass"/>
                            Confirm New Password<input type="password" size="30" id="newPass2"/>
                    
                            <input id="submit" type="submit" value="Change Password"/>
                            <li><a href="index.php">< Back to Game!!</a></li>
                        </div>
                    </form>
                </div>
                
                <div id="deleteAccountForm">
                    <form action="javascript:;" method="post" id="deleteAcct" >
                        <div id="deleteContainer">
                            Password<input type="password" size="30" id="delpass"/>
                            <input id="submit" type="submit" value="DELETE ACCOUNT!!!!"/>
                        </div>
                    </form>
                </div>
                
                
                
            </div><!--edit-->
        </div><!-- Container-->
    </body>
</html>

