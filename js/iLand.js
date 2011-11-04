//==============================================================================

// VARIABLES

//==============================================================================
var orbiter;
var msgManager;
var UPC = net.user1.orbiter.UPC;
var roomID = "iLand";
//==============================================================================
// INITIALIZATION
//==============================================================================
function init () {
  // Create the Orbiter instance, used to connect to and communicate with Union
  orbiter = new net.user1.orbiter.Orbiter();
  // If required JavaScript capabilities are missing, abort

  if (!orbiter.getSystem().isJavaScriptCompatible()) {

    displayChatMessage("Your browser is not supported.");

    return;

  }
  // Register for Orbiter's connection events

  orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.READY, readyListener, this);
  orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.CLOSE, closeListener, this);
  // Register for incoming messages from Union

  msgManager = orbiter.getMessageManager();
  msgManager.addMessageListener(UPC.JOINED_ROOM, joinedRoomListener, this);
  msgManager.addMessageListener(UPC.CLIENT_ADDED_TO_ROOM, clientAddedListener, this);
  msgManager.addMessageListener(UPC.CLIENT_REMOVED_FROM_ROOM, clientRemovedListener, this);
  msgManager.addMessageListener("CHAT_MESSAGE", chatMessageListener, this, [roomID]);
  msgManager.addMessageListener(UPC.CLIENT_SNAPSHOT, clientSnapshotMessageListener, this);
  // Connect to Union
  orbiter.connect("tsar190.grid.csun.edu", 9100);
  displayChatMessage("Connecting to chat server...");

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
}
// Triggered when another client joins the chat room
function clientAddedListener (roomID, clientID) {
  displayChatMessage("User" + clientID + " joined the lobby.");
  
  //****************************************************Michael stopped message
  //window.alert(clientID);
}
// Triggered when another client leaves the chat room
function clientRemovedListener (roomID, clientID) {
  displayChatMessage("User" + clientID + " left the lobby.");
}

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
    msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "CHAT_MESSAGE", roomID, "true", "", outgoing.value);
    outgoing.value = "";
    // Focus text field again after submission (required for IE8 only)
    setTimeout(function () {outgoing.focus();}, 10);
  }
}
// Triggered when a chat message is received
function chatMessageListener (fromClientID, message) {
  displayChatMessage("User" + fromClientID + ": " + message);
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
$(document).ready(function(){
	pageLoad();
	$("#chatPane").resizable();
	//$("#chatPane").draggable();
	$("#chat").draggable();

//Click a nav item, run this function
$("#bottomNav ul li").click(function(){

$("#navContent").empty();
var curr = $(this).attr('id');
if(curr=="logOut"){
$("#navContent").html("<p id='youSure'> Are you sure you want to log out?</p> <form id='logMeOut' action='javascript:;' method='post'> <input id='confirmLogOut' type='submit' value='Yes'/> </form>");
	$("#logMeOut").submit(function(){
			$.post('ajax/logout.php',function(){
			window.location = '../';
			});
			
			});
	}else if(curr=="account"){
		$("#navContent").html("<p>Account info will be here</p>");
		}else if(curr=="stats"){
				$("#navContent").html("<p>Stats will be here</p>");
			}else{
				$("#navContent").html("<p>Something will be here</p>");
			}
			
	if($('#navContent').is(':visible')){
	 $("#navContent").animate({
			"height":"0px"
				},300,function(){

				$("#navContent").show();
     $("#navContent").css({"opacity":"0"});
     $("#navContent").animate({
			"height":"300px",
			"opacity":"1"
				},300);

				});
	}else{

     $("#navContent").show();
     $("#navContent").css({"opacity":"0"});
     $("#navContent").animate({
			"height":"300px",
			"opacity":"1"
				},300);
		}		
		});

//When a user attempts to log in
$("#loginForm").submit(function(){

//Get input username and password.
username = $("#username").val();
password = $("#password").val();

//AJAX call for login script
$.post("ajax/login.php",{
//password/unsername passed to php script
		password : ""+password+"",
		username : ""+username+""
		},function(data){
	//Remove password from page
	$("#password").val("");
	//If login was correct 1 should be returned
	if(data =="1"){
		init();
		$("#login").fadeOut(300);	
	}else{
	window.alert("Invalid Username/password. Please try again");
	
	$("#username").val("");
	$("#username").focus(); 
	}	
		});
		
	});
//User Account Creation

$("#createAccount").click(function(){
	$("#loginForm").fadeOut(300,function(){
	
		$("#createAccountForm").fadeIn();
		});
	$("#createAcct").submit(function(){
	
		if(($("#un").val()!=0) &&
		 ($("#confirm").val()!=0) &&
		 ($("#conf").val()!=0)){
		un = $("#un").val();
		pass = $("#pass").val();
		conf = $("#confirm").val();
		if(pass != conf){
		window.alert("Passwords do not match");
		}else{
		
		$.post("ajax/createAccount.php",{
		pass : ""+pass+"",
		un : ""+un+""
			},function(data){
			if(data==1){
			init();
			$("#login").fadeOut(300);	
			}else if(data==2){
			window.alert("Username is in use try again");
			$("#un,#pass,#confirm").val('');
			$("#un").focus();
			}
			
			
			});
		}
		}else{
			window.alert("One of the fields are left blank");
		}
		});	
	});

	/************************************************/
	//Test Code Mike
	//Game 1 Animation
	
	var old_height = ($('#game1').css("height"));

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

	$('#game1').click(function(){
	//	window.alert($(this).css("height"));
		
		$(this).animate({
			"width":"500px", 
			"height":"300px",
			"left":"40%",
			"top":"100px"
		},1000);

	});

	
	
});
/********************************************************/



