
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
  orbiter.connect("tryunion.com", 80);
  displayChatMessage("Connecting to Union...");

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
  displayChatMessage("Chat ready!");
}
// Triggered when another client joins the chat room
function clientAddedListener (roomID, clientID) {
  displayChatMessage("User" + clientID + " joined the chat.");
  window.alert(clientID);
}
// Triggered when another client leaves the chat room
function clientRemovedListener (roomID, clientID) {
  displayChatMessage("User" + clientID + " left the chat.");
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
sizeW = (window.innerWidth/2)-100;
	sizeW = sizeW+"px";
	sizeH = (window.innerHeight/2)-100;
	sizeH = sizeH+"px";
	$("#loginForm").css({"margin-left":sizeW});
	$("#loginForm").css({"margin-top":sizeH});
	$("#createAccountForm").css({"margin-left":sizeW});
	$("#createAccountForm").css({"margin-top":sizeH});
	$("#login").css({"width":window.innerWidth});
	$("#login").css({"height":window.innerHeight});
	$("#username").focus(); 
	
	// Check if user is logged in
	if(!(typeof loggedIn === 'undefined') && loggedIn){
	init();
	$("#login").hide();	
	}
}


//Window the window is resized, run these functions to keep ratios right.
window.onresize = resize;
function resize()
{
sizeW = sizeW+"px";
	sizeH = (window.innerHeight/2)-100;
	sizeH = sizeH+"px";
	$("#loginForm").css({"margin-left":sizeW});
	$("#loginForm").css({"margin-top":sizeH});
	$("#createAccountForm").css({"margin-left":sizeW});
	$("#createAccountForm").css({"margin-top":sizeH});
	$("#login").css({"width":window.innerWidth});
	$("#login").css({"height":window.innerHeight});
	$("#username").focus(); 
	
}


/************Jquery**************************************/
//All JQuery goes here.
$(document).ready(function(){
	pageLoad();
	
//Click a nav item, run this function

$("#bottomNav ul li").click(function(){
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
	
	
});
/********************************************************/



