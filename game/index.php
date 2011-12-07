<?php
session_start();
if(isset($_SESSION['username'])){

	$username = $_SESSION['username'];
	$userpic = $_SESSION['pic'];
?>
<script>var loggedIn= true; 
        var username ="<?php echo $username ?>";
		var userpic ="<?php echo $userpic ?>";
		//window.alert(userpic);
</script>
<?php
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>
       iLand-In Game
    </title>
    <link rel="stylesheet" type="text/css" href="game.css" />
    <script src="../js/jQueryUI/jQueryUI.js"></script>	
    <script src="../js/OrbiterMicro_1.1.0.514_Release.js" type="text/javascript"></script>
<script src="jquery.js" type="text/javascript"></script>
<script src="../js/jQueryUI/jQueryUI.js" type="text/javascript"></script>
<script src="game.js" type="text/javascript"></script>

</head>

<body>

<div id="content">
	<div id="chat">
		    <div id="chatPane">
		    
		    </div>
    <div id="outGoing">
      <input type="text" id="outgoing" style="width:340px" onkeydown="if (event.keyCode == 13) sendMessage()"/>
      <input type="submit" value="Send" style="width:60px" onclick="sendMessage()"/>
    </div><!-- OutGoing -->
	    </div><!-- Chat -->
		<div id="resourceInfo">
		      &nbsp; &nbsp;Info for given resource will go here.
            </div>
	<div id="myResources">
		<ul>
			<li id="Farm">Farm: <div> 20</div></li>
			<li id="Fur">Fur: <div> 20</div></li>
			<li id="Metal">Metal: <div> 20</div></li>
			<li id="Wood">Wood: <div> 20</div></li> 
			<li id="Stone">Stone: <div> 20</div></li>
			<li id="Meat">Meat: <div> 20</div></li>
		</ul>
	<!--<div id = "FarmInfo"> a </div>-->
	<!--<div id = "FurInfo"> b </div>-->
	<!--<div id = "MetalInfo"> c </div>-->
	<!--<div id = "WoodInfo"> d </div>-->
	<!--<div id = "StoneInfo"> e </div>-->
	<!--<div id = "MeatInfo"> f </div>-->
		
	</div>
    <p class="message" id="statusMessage"/>
    <div id=gameMap>
    	<!-- Resource Divs -->
	    	<div class="resource" id="res1"></div>
	    	<div class="resource" id="res2"></div>
	    	<div class="resource" id="res3"></div>
	    	<div class="resource" id="res4"></div>
	    	<div class="resource" id="res5"></div>
	    	<div class="resource" id="res6"></div>
	    	<div class="resource" id="res7"></div>
	    	<div class="resource" id="res8"></div>
	    	<div class="resource" id="res9"></div>
	    	<div class="resource" id="res10"></div>
	    	<div class="resource" id="res11"></div>
	    	<div class="resource" id="res12"></div>
	    	<div class="resource" id="res13"></div>
	    	<div class="resource" id="res14"></div>
	    	<div class="resource" id="res15"></div>
	    	<div class="resource" id="res16"></div>
	    	<div class="resource" id="res17"></div>
	    	<div class="resource" id="res18"></div>
	    	<div class="resource" id="res19"></div>
	    	<div class="resource" id="res20"></div>
	    	<div class="resource" id="res21"></div>
	    	<div class="resource" id="res22"></div>
	    	<div class="resource" id="res23"></div>
	    	<div class="resource" id="res24"></div>
	   <!-- Outpost Divs -->
	   		<div class="outpost" id="out1"></div>
	   		<div class="outpost" id="out2"></div>
	   		<div class="outpost" id="out3"></div>
	   		<div class="outpost" id="out4"></div>
	   		<div class="outpost" id="out5"></div>
	   		<div class="outpost" id="out6"></div>
	   		<div class="outpost" id="out7"></div>
	   		<div class="outpost" id="out8"></div>
	   		<div class="outpost" id="out9"></div>
	   		<div class="outpost" id="out10"></div>
	   		<div class="outpost" id="out11"></div>
	   		<div class="outpost" id="out12"></div>
	   		<div class="outpost" id="out13"></div>
	   		<div class="outpost" id="out14"></div>
	   		<div class="outpost" id="out15"></div>
	   <!-- Vertical Roads-->		
	   		<div class="roadV" id="roadV1"></div>
	   		<div class="roadV" id="roadV2"></div>
	   		<div class="roadV" id="roadV3"></div>
	   		<div class="roadV" id="roadV4"></div>
	   		<div class="roadV" id="roadV5"></div>
	   		<div class="roadV" id="roadV6"></div>
	   		<div class="roadV" id="roadV7"></div>
	   		<div class="roadV" id="roadV8"></div>
	   		<div class="roadV" id="roadV9"></div>
	   		<div class="roadV" id="roadV10"></div>
	   		<div class="roadV" id="roadV11"></div>
	   		<div class="roadV" id="roadV12"></div>
	   		<div class="roadV" id="roadV13"></div>
	   		<div class="roadV" id="roadV14"></div>
	   		<div class="roadV" id="roadV15"></div>
	   		<div class="roadV" id="roadV16"></div>
	   		<div class="roadV" id="roadV17"></div>
	   		<div class="roadV" id="roadV18"></div>
	   		<div class="roadV" id="roadV19"></div>
	   		<div class="roadV" id="roadV20"></div>
	   	<!-- Horizontal Roads-->		
	  	 	<div class="roadH" id="roadH1"></div>
	   		<div class="roadH" id="roadH2"></div>
	   		<div class="roadH" id="roadH3"></div>
	   		<div class="roadH" id="roadH4"></div>
	   		<div class="roadH" id="roadH5"></div>
	   		<div class="roadH" id="roadH6"></div>
	   		<div class="roadH" id="roadH7"></div>
	   		<div class="roadH" id="roadH8"></div>
	   		<div class="roadH" id="roadH9"></div>
	   		<div class="roadH" id="roadH10"></div>
	   		<div class="roadH" id="roadH11"></div>
	   		<div class="roadH" id="roadH12"></div>
	   		<div class="roadH" id="roadH13"></div>
	   		<div class="roadH" id="roadH14"></div>
	   		<div class="roadH" id="roadH15"></div>
	   		<div class="roadH" id="roadH16"></div>
	   		<div class="roadH" id="roadH17"></div>
	   		<div class="roadH" id="roadH18"></div>	
	</div>
		
	<div id="upgradeBuy">
		<div id="UBColoring"></div>
		<div id="upgradeTab">Upgrade</div>
		<div id="tradingTab">Trading</div>
		<div id="upgradeContent"></div>
		<div id="tradingContent"></div>
	</div>
	
 <div id="columns">
        <div class="buyable" id="outpost"><img id="outpostPic" src="images/outpost.png" draggable="true" /><footer>Outpost</Footer></div>
        <div class="buyable" id="roadVert"><img id="roadVPic" src="images/roadV.png" draggable="true" /><footer>Road Vertical</Footer></div>
        <div class="buyable" id="roadHorz"><img id="roadHPic" src="images/roadH.png" draggable="true" /><footer>Road Horizontal</Footer></div>
    </div>

  
    
</div>
</body>
</html>
