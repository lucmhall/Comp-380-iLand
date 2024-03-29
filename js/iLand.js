//==============================================================================

// VARIABLES

//==============================================================================
var orbiter;
var msgManager;
var UPC = net.user1.orbiter.UPC;
var roomID = "iLand";
var sPic = 0;
var element = function(id) { return document.getElementById(id); }
var players_global;
//==============================================================================
// INITIALIZATION
//==============================================================================
function init () {
  // Create the Orbiter instance, used to connect to and communicate with Union
  orbiter = new net.user1.orbiter.Orbiter();
  // If required JavaScript capabilities are missing, abort

  if (!orbiter.getSystem().isJavaScriptCompatible()) 
	{
		displayChatMessage("Your browser is not supported.");
		return;
	}
  // Register for Orbiter's connection events

  orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.READY, readyListener, this);
  orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.CLOSE, closeListener, this);
  // Register for incoming messages from Union

  msgManager = orbiter.getMessageManager();
  msgManager.addMessageListener(UPC.JOINED_ROOM, joinedRoomListener, this);
  msgManager.addMessageListener("CHAT_MESSAGE", chatMessageListener, this, [roomID]);
 
  msgManager.addMessageListener(UPC.CLIENT_SNAPSHOT, clientSnapshotMessageListener, this);
  msgManager.addMessageListener("Lobby_Enter", lobbyEnterListener, this, [roomID]);
  msgManager.addMessageListener("Return_Players", returnPlayersListener, this, [roomID]);
  msgManager.addMessageListener("beginGame", startGame, this, [roomID]);

 
  // Connect to Union
  orbiter.connect("iLand.grid.csun.edu", 9100);
  displayChatMessage("Connecting to chat server...");
  
  // Start Login Information
  showInfoTop(username);
    
  }
//==============================================================================

// ORBITER EVENT LISTENERS
//==============================================================================

// Triggered when the connection is ready
function readyListener (e) {
  displayChatMessage("Connected.");
  displayChatMessage("Waiting for login...");
  // Create the chat room
  msgManager.sendUPC(UPC.CREATE_ROOM, roomID);
  // Join the chat room
  msgManager.sendUPC(UPC.JOIN_ROOM, roomID);
}

// Triggered when the connection is closed

function closeListener (e) {

  displayChatMessage("Orbiter connection closed.");

}
//==============================================================================
// CHAT ROOM EVENT LISTENER
//==============================================================================
// Triggered when a JOINED_ROOM message is received
function joinedRoomListener () {
  displayChatMessage("Welcome to iLand!");
  msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "CHAT_MESSAGE", roomID, "true", "", username+" has joined.");
}
// Triggered when another client joins the chat room
function clientAddedListener (roomID, clientID) {
//	joined = username+" I now in the lobby.";
//	displayChatMessage(joined);
  //displayChatMessage("User" + clientID + " joined the lobby.");

  //****************************************************Michael stopped message
  //window.alert(clientID);
}
// Page Refresh Listener

window.onbeforeunload = function() {
msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "CHAT_MESSAGE", roomID, "true", "", username+" has left.", userpic);
msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "Lobby_Enter", roomID, "true", "", "left"+username);
};
// Triggered when another client leaves the chat room

function clientSnapshotMessageListener(requestID, clients){
	window.alert(clients);
}
//==============================================================================
// CHAT SENDING AND RECEIVING
//==============================================================================
// Sends a chat message to everyone in the chat room
function sendMessage () {
  var outgoing = document.getElementById("outgoing");
  if (outgoing.value.length > 0) {
    msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "CHAT_MESSAGE", roomID, "true", "", username+": "+outgoing.value);
    outgoing.value = "";
    // Focus text field again after submission (required for IE8 only)
    setTimeout(function () {outgoing.focus();}, 10);
  }
}
// Triggered when a chat message is received
function chatMessageListener (fromClientID, message) {
	var help = new RegExp("/help");
	if(message.match(help)){
		displayHelp();
		helpCase(message)
	}
	//else if(message == "/whisper" || message == "/w")
//	{
	//	whisper(message, fromClientID,len)
//	}
	else
		displayChatMessage(message);
}
// Displays a single chat message
function displayChatMessage (message) {
  // Make the new chat message element
  var msg = document.createElement("span");
  msg.appendChild(document.createTextNode(message));
  msg.appendChild(document.createElement("br"));
  // Append the new message to the chat
  var chatPane = document.getElementById("chatPane");
  chatPane.appendChild(msg);
  // Trim the chat to 500 messages
  if (chatPane.childNodes.length > 500) {
    chatPane.removeChild(chatPane.firstChild);
  }
  chatPane.scrollTop = chatPane.scrollHeight;
}




/***********Javascript Functions*****************************/

// Used to make user confirm before refresh. 
// Should remove this comment after development
//window.onbeforeunload = function() { return "If you refresh, your data will be lost."; }

//All javascript that will be run when the page loads goes here.
function pageLoad(){
	ww = window.innerWidth-560;
	sizeW = (window.innerWidth/2)-100;
	hh = (window.innerHeight/2)-150;
	logo = (window.innerWidth/2 - 157)+"px";
	
	$("#logo").css({"margin-left":logo});
    $("#description").css({"margin-top":hh});
	$("#loginForm").css({"margin-left":ww});
	$("#loginForm").css({"margin-top":hh});
	$("#createAccountForm").css({"margin-left":ww});
	$("#createAccountForm").css({"margin-top":hh});
	$("#login").css({"width":window.innerWidth});
	$("#login").css({"height":window.innerHeight});
	$("#username").focus(); 
	
	// Check if user is logged in
	if(!(typeof loggedIn === 'undefined') && loggedIn){
	init();
	$("#login").hide();	
	}else{
	$("#login").show();
	}
}

//Window the window is resized, run these functions to keep ratios right.
window.onresize = resize;
function resize()
{
sizeW = sizeW+"px";
	ww = window.innerWidth-460;
	hh = (window.innerHeight/2)-150;
	$("#loginForm").css({"margin-left":ww});
	$("#loginForm").css({"margin-top":hh});
	$("#createAccountForm").css({"margin-left":ww});
	$("#createAccountForm").css({"margin-top":hh});
	$("#login").css({"width":window.innerWidth});
	$("#login").css({"height":window.innerHeight});
	$("#username").focus(); 
}


/************Jquery**************************************/
//All JQuery goes here.
$(document).ready(function () {
    pageLoad();
    $("#chatPane").resizable();
    //$("#chatPane").draggable();
    $("#chat").draggable();

    //Click a nav item, run this function
    $("#bottomNav ul li").click(function () {

        $("#navContent").empty();
		$("#navContent").append("<div id='exit_nav'>X</div>");	
		$("#exit_nav").click(function(){
			$("#navContent").fadeOut(400,function(){
				$("#navContent").css({"height":"0px" });
			});
		});
        var curr = $(this).attr('id');
        if (curr == "logOut") 
        {
            $("#navContent").append("<p id='youSure'> Are you sure you want to log out?</p> <form id='logMeOut' action='javascript:;' method='post'> <input id='userButton' type='submit' value='Yes'/> </form>");
            $("#logMeOut").submit(function () 
            {
                $.post('ajax/logout.php', function () {window.location = '../';});
            });
        } 
        else if (curr == "account") 
        {
            $("#navContent").append("<p id='youSure'>Username: "+username+"</p>" /*<p id='youSure'>Bug Report</p>"*/ /*<form id='changePassword' action='javascript:;' method='post'> <input id='changePassword' type='submit' value='Yes'/> </form>"*/);
			/*$("#userName").submit(function () {
				$.post('ajax/userInfo.php', function(data)
				};
			$("#navContent").append(data)*/
			/*$("#changePassword").submit(function () {
				$.post('ajax/changePassword.php', function () {
				//.....
				};
			};*/
            
            $("#navContent").append("<form id='editAccount' action='javascript:;' method='post'> <input id='userButton2' type='submit' value='Edit Account'/> </form>");
            $("#editAccount").submit(function () 
            {
                window.location = '../edit.php';
            });
            
            
            
        } 
        else if (curr == "stats") 
        {
            $("#navContent").append("<p>Number of Games Played</p> <p> x </p> <p>\n</p> <p>Win/Loss Ratio</p> <p>y / z</p> <p>\n</p>");
        } 
        else 
        {
        	var first = "<p><b>How to play iLand:</b></p><p>At the start of the game, you get 20 of each resource and one(1) free Outpost.</p>"
        	var second = "<p></p>";
            $("#navContent").append();
        }

        if ($('#navContent').is(':visible')) {
            $("#navContent").animate({
                "height": "0px"
            }, 300, function () {

                $("#navContent").show();
                $("#navContent").css({ "opacity": "0" });
                $("#navContent").animate({
                    "height": "150px",
                    "opacity": "1"
                }, 300);

            });
        } else {

            $("#navContent").show();
            $("#navContent").css({ "opacity": "0" });
            $("#navContent").animate({
                "height": "150px",
                "opacity": "1"
            }, 300);
        }
    });    

    //When a user attempts to log in
    $("#loginForm").submit(function () {

        //Get input username and password.
        username = $("#username").val();
        password = $("#password").val();

        //AJAX call for login script
        $.post("ajax/login.php", {
            //password/unsername passed to php script
            password: "" + password + "",
            username: "" + username + ""
        }, function (data) {
            //Remove password from page
            $("#password").val("");
            //If login was correct 1 should be returned
            if (data == "1") {
                init();
                $("#login").fadeOut(300);
            } else {
                window.alert("Invalid Username/password. Please try again");

                $("#username").val("");
                $("#username").focus();
            }
        });

    });
	
	//User Picture Selection
	$("#pic1,#pic2,#pic3,#pic4,#pic5,#pic6,#pic7,#pic8").click(function() {
	
				 //window.alert("Invalid Username/password. Please try again");
					
					$("#pic1,#pic2,#pic3,#pic4,#pic5,#pic6,#pic7,#pic8").css({"border": ""});
					$(this).css({"border":"2px solid red"});
					sPic = $(this).attr("id");
					sPic = sPic.substring(3);
		});
		
    //User Account Creation
	
    $("#createAccount").click(function () {
        $("#loginForm").fadeOut(300, function () {

            $("#createAccountForm").fadeIn();
        });
        $("#createAcct").submit(function () {
            if (($("#un").val() != 0) &&
		 ($("#confirm").val() != 0) &&
		 ($("#conf").val() != 0) &&	 
		 ($("#sPic").val() != 0)){
                un = $("#un").val();
                pass = $("#pass").val();
                conf = $("#confirm").val();
				sPic = $("#sPic").val();
                if (pass != conf) {
                    window.alert("Passwords do not match");
                } else {
                    $.post("ajax/createAccount.php", {
                        pass: "" + pass + "",
                        un: "" + un + "",
						sPic: "" + sPic + ""
                    }, function (data) {
                        if (data == 1) {
                            init();
                            $("#login").fadeOut(300);
                        } else if (data == 2) {
                            window.alert("Username is in use try again");
                            $("#un,#pass,#confirm","#sPic").val('');
                            $("#un").focus();
                        }


                    });
                }
				
            } else {
                window.alert("One of the fields are left blank");
            }
        });
    });
	/*Back to Login Button

    $("#returnLogin").click(function () {
        $("#createAccount").hide();
        $("#loginForm").fadeIn(400);
        });*/
    /************************************************/
    //Test Code Mike
    
    
    //Lobby Animation

    //$('#game1').hover(function(){
    //	window.alert($(this).attr("height"));
    //
    //	$(this).animate({
    //		"width":"500px", 
    //		"height":"300px",
    //		"left":"40%",
    //		"top":"100px"
    //	},1000);
    //	
    //	$(this).css("left","50px");
    //});

    var old_height = ($('#game1').css("height"));
    var old_width = ($('#game1').css("width"));
//Lobby Open Animation
$('#open_lobby').click(function () {
	var lobby = element("lobby_Players").getElementsByTagName('div');
	if(lobby.length < 4){
		//Change Visibility
    	$('#open_lobby').hide();
    	$('#lobby_shown').show();
    	//Animate
    	$('#game1').animate({
    	'width': '500px',
    	'height': '300px',
    	'left': '40%',
    	'top': '100px'
    	}, 1000);
  		msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "Lobby_Enter", roomID, "true", "", username);
	}else{
		window.alert("The lobby is full. Sorry");
	}
});
	
	//Start Game Button
	//<?php include("filename.php"); ?>
	$('#start_game').click(function () {
		//window.alert($(this).css("height"));
		//Change Pages
		$('#container').hide();
		//<? php <A href=mapOne.php> </A> ?>

		
	});


    //Exit Lobby Animation and Function
    $('#exit_lobby').click(function () {
        
        msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "Lobby_Enter", roomID, "true", "", "left"+username);
        //changeStatus(players);
        //window.alert(old_height);
        //Change Visibility 
        $('#open_lobby').show();
        $('#lobby_shown').hide();
        
        //Animate
        $('#game1').animate({
            "height": old_height,
            "width": old_width,
            "left": "50%",
            "top": "50%"
        }, 1000);
    });
	
	
	//Start Match JS
	document.getElementById("start_match").onclick = function()
	{
        var l = "";
		if($("#start_match").css("background-color") == 'rgb(0, 128, 0)')
        {
        	var text = "";
    		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    	    for( var i=0; i < 42; i++ ){
        	text += possible.charAt(Math.floor(Math.random() * possible.length));
        	}
        	msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "beginGame", roomID, "true", "", text);
            window.location = "./game?roomID="+text;
        }
        
	};
	
	//get 4 people
	$('#got4').click(function () 
	{
    	//Change Visibility 
        $('#start_match').css({"background-color":"green"});
        
    });
	
    


	
	
});
/********************************************************/



//*************************//
//*      Lobby sh*t   */


	
function lobbyEnterListener(fromClientID, usa){
    
	if(usa.substring(0,4)=="left"){
		//mike
        players_global = players_global-1;
        changeStatusExit(players_global);
        //end mike
        
        
        var leftUN = "#lobbyEnter"+usa.substring(4);
		$(leftUN).remove();
        
	}else{
		var addUN = "lobbyEnter"+usa;
		$("#lobby_Players").append("<div class='lobby_play' id="+addUN+">"+usa+"</div>");
		/*Update all users in the game*/
		var playersDivs = element("lobby_Players").getElementsByTagName('div');
		var i = 0;
		var players = "";
		while(playersDivs[i]){
			players += playersDivs[i].id.substring(10)+";";
			i++;
		}
	 	msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "Return_Players", roomID, "true", "", players);
	}
}
function returnPlayersListener(fromClientID, players){
  	var players = players.split( ";" );
  	var i = 0;
  	var person;
	console.log(players);
    changeStatus(players);
    players_global = players.length;
  	if(players.length > 4)
    { 
        $("#start_match").css({"background-color":"green"});
    }
    
    
  	while(players[i]){
  		person = players[i];
  		if(person.substring(0,9) == "undefined"){ person = person.substring(9);}
  		userID = "#lobbyEnter"+person;
  		if( $(userID).length <= 0){
  			addUN = "lobbyEnter"+person;
  			$("#lobby_Players").append("<div id="+addUN+">"+person+"</div>");
  			}
  			i++;
  		}
  	}





function changeStatus(players){
  	var i = 0;
  	var person;
	console.log(players);
  	if(players.length > 4)
    { 
        $("#one").css({"background-color":"green"});
        $("#two").css({"background-color":"green"});
        $("#three").css({"background-color":"green"});
        $("#four").css({"background-color":"green"});
    }
    else if(players.length > 3) 
    {
        $("#one").css({"background-color":"green"});
        $("#two").css({"background-color":"green"});
        $("#three").css({"background-color":"green"});
        $("#four").css({"background-color":"red"});
    }
    else if(players.length > 2) 
    {
        $("#one").css({"background-color":"green"});
        $("#two").css({"background-color":"green"});
        $("#three").css({"background-color":"red"});
        $("#four").css({"background-color":"red"});
    }
    else 
    {
        $("#one").css({"background-color":"green"});
        $("#two").css({"background-color":"red"});
        $("#three").css({"background-color":"red"});
        $("#four").css({"background-color":"red"});
    }    
}

function changeStatusExit(players){
  	var i = 0;
  	var person;
	console.log(players);
  	if(players > 4)
    { 
        $("#one").css({"background-color":"green"});
        $("#two").css({"background-color":"green"});
        $("#three").css({"background-color":"green"});
        $("#four").css({"background-color":"green"});
    }
    else if(players > 3) 
    {
        $("#one").css({"background-color":"green"});
        $("#two").css({"background-color":"green"});
        $("#three").css({"background-color":"green"});
        $("#four").css({"background-color":"red"});
        $("#start_match").css({"background-color":"grey"});
    }
    else if(players > 2) 
    {
        $("#one").css({"background-color":"green"});
        $("#two").css({"background-color":"green"});
        $("#three").css({"background-color":"red"});
        $("#four").css({"background-color":"red"});
        $("#start_match").css({"background-color":"grey"});
    }
    else 
    {
        $("#one").css({"background-color":"green"});
        $("#two").css({"background-color":"red"});
        $("#three").css({"background-color":"red"});
        $("#four").css({"background-color":"red"});
        $("#start_match").css({"background-color":"grey"});
    }    
}

  	
//*****************************//
//* User information on top */


function showInfoTop(user)
{
	//This is cool. -Luc
	$("#userInfo").append("<div id="+user+"top"+">Logged in as: "+user+"</div>");
	$("#"+user+"top").css({
		"color": "#2B78E3",
		"font-size" : "20px"
	});
}
//Function to start the gam
function startGame(fromClientID, text){
	window.location = "./game?roomID="+text;
}






