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
        <!-- Stylesheet for JQueryUI -->
        <link type="text/css" href="js/css/custom-theme/jquery-ui-1.8.16.custom.css" rel="stylesheet" />	
        <!-- Main Stylesheet -->
        <link href="style.css" rel="stylesheet" type="text/css" />

        <script type="text/javascript" src="js/jquery-1.6.1.min.js"></script>
        <script type="text/javascript" src="js/jQueryUI/jQueryUI.js"></script>
        <script type="text/javascript" src="js/OrbiterMicro_1.1.0.514_Release.js"></script>
        <script type="text/javascript" src="js/iLand.js"></script>
        <link rel="SHORTCUT ICON" href="http://iland.grid.csun.edu/favicon.ico"/>
    </head>
    <body >

    <!--Added by Michael Version Number Div

    <div>
    Version 2.0
    </div>

    -->


    <img src="images/iLand.png" width="100%" height="100%" style="position:absolute;"/>
	
	
	    <div id="container">
	
	
		    <div id="game1">
                <p id="open_lobby">Click to Enter Lobby</p>
				<div id="lobby_shown">
					<div id='exit_lobby'>Exit Lobby</div>
					<div id="start_game">Start the Match</div>
				</div>
            </div>
		
		    <div id="login">
			    <img id="gusta" src="images/gusta1.png"/>
		    <img src="images/logo.png" alt="logo_iLand" id="logo" style="margin-top:20px;margin-left:325px;position:absolute;" align="center"/>
		
			    <div id="description">
			    On a deserted island in the middle of no where, the corpse of a plane 
			    can be seen just of the coast of the island. You and only a few others have
			    survived. You now must of the fend for yourself to survive. Trade, forge an alliance,
			    fight, build an empire, just survive by any means necessary. 
			    </div>
			    <form action="javascript:;" method="post" id="loginForm" >
			
			    <div id="loginContainer">
			    Username<input type="text" name="username" size="30" id="username"/>
 			    Password<input type="password" size="30" id="password"/>
			    <input id="submit" type="submit" value="Login"/>
			    <a href="javascript:;" id="createAccount"> Create an account</a>
			    </div>
			    </form>
			
			    <div id="createAccountForm">
			    <form action="javascript:;" method="post" id="createAcct" >
			    <div id="createContainer">
			    Username<input type="text" name="username" size="30" id="un"/>
 			    Password<input type="password" size="30" id="pass"/>
 			    Confirm Password<input type="password" size="30" id="confirm"/>
			    <input id="submit" type="submit" value="Create"/>
				<a href="javascript: ;" id="returnLogin"> Back</a>
			    </div>
			    </form>
			    </div><!--createAccountForm-->
		    </div><!--login-->
	
	    <div id="chat">
		    <div id="chatPane" class="">
		    <div class="ui-resizable-handle ui-resizable-ne ui-icon ui-icon-gripsmall-diagonal-ne" style="z-index: 1001; "></div>
		    </div>

    <div id="outGoing">
      <input type="text" id="outgoing" style="width:340px" onkeydown="if (event.keyCode == 13) sendMessage()"/>
      <input type="submit" value="Send" style="width:60px" onclick="sendMessage()"/>
    </div><!-- OutGoing -->
	    </div><!-- Chat -->
		    <div id="navContent">
		      &nbsp; &nbsp;Info will be here depending on what is clicked below. We will use AJAX to query our Database.
		        <!-- Added by Mike. Exit Button for navContent-->
                <div id="exit_nav">Test Text</div>
            </div>
		    <div id="bottomNav" style="">
			    <ul>
				    <li id="account">Account</li>
				    <li id="stats">Stats</li>
				    <li id="hold">Holder</li>
				    <li id="logOut">Log Out</li>
			    </ul>
		    </div><!--bottom_nav-->
	    </div><!-- Container-->
    </body>
</html>


<?php

?>
