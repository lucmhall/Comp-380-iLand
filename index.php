<?php
session_start();
if(isset($_SESSION['username'])){
?>
<script>var loggedIn= true; </script>
<?php
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>iLand</title>

<link href="style.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="js/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="js/OrbiterMicro_1.1.0.514_Release.js"></script>
<script type="text/javascript" src="js/iLand.js"></script>
<link rel="SHORTCUT ICON" href="http://tsar190.grid.csun.edu/iLand/favicon.ico">
</head>
<body >
<img src="images/iLand.png" width="100%" height="100%" style="position:absolute;"/>
	
	
	<div id="container">
		<div id="login">
		
			<form action="javascript:;" method="post" id="loginForm" >
			Username:<input type="text" name="username" size="30" id="username"/>
 			Password:<input type="password" size="30" id="password"/>
			<input id="submit"type="submit" value="Login"/>
			<a href="javascript:;" id="createAccount"> Create an account</a>
			</form>
			
			<div id="createAccountForm">
			<form action="javascript:;" method="post" id="createAcct" >
			Username:<input type="text" name="username" size="30" id="un"/>
 			Password:<input type="password" size="30" id="pass"/>
 			Confirm Password:<input type="password" size="30" id="confirm"/>
			<input id="submit"type="submit" value="Create"/>
			</form>
			</div><!--createAccountForm-->
		</div><!--login-->
	<div id="chat">
		<div id="chatPane"></div>

<div id="outGoing">
  <input type="text" id="outgoing" style="width:340px" onkeydown="if (event.keyCode == 13) sendMessage()"/>
  <input type="submit" value="Send" style="width:60px" onclick="sendMessage()"/>
</div><!-- OutGoing -->
	</div><!-- Chat -->
		<div id="bottomNav" style="">
			<ul>
				<li>Luc</li>
				<li>Moe</li>
				<li>Alex</li>
				<li>Michael</li>
			</ul>
		</div><!--bottom_nav-->
	</div><!-- Container-->
</body>
</html>


<?php

?>
