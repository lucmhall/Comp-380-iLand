


/* Orbiter Micro Code */
//==============================================================================

// VARIABLES

//==============================================================================
var orbiter;
var msgManager;
var UPC = net.user1.orbiter.UPC;
var roomID = "iLandGame";

//==============================================================================
// INITIALIZATION

  

  
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

function sendGameMessage(message){
	 msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "GAME_ACTION", roomID, "true", "", message);
}

// Triggered when a chat message is received
function chatMessageListener (fromClientID, message) {
	if(message == "/help")
	{
		displayHelp();
	}
	else if(message == "/whisper" || message == "/w")
	{
		//Need to pase who it is to first, second you need to pass who it is from
		whisper(message, fromClientID,len)
	}
	else
		displayChatMessage("User" +fromClientID+ ": " + message);
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


// useful for finding elements
var element = function(id) { return document.getElementById(id); }
var errorMessage = undefined;
var elStatus;


function statusMessage(s) {
    if(!elStatus) elStatus = element('statusMessage');
    if(!elStatus) return;
    if(s) elStatus.innerHTML = s;
    else elStatus.innerHTML = '&nbsp;';
}


	statusMessage("Welcome to iLand");
///////////////////////////////////////////////////////
//Click a nav item, run this function
	 $("#myResources ul li").click(function () {

        $("#resourceInfo").empty();
		$("#resourceInfo").css({"display":"block"});
		$("#resourceInfo").append("<div id='exit_nav'>X</div>");	
		$("#exit_nav").click(function()
		{
			$("#resourceInfo").fadeOut(400);
		});
        var curr = $(this).attr('id');
		console.log(curr);
        if (curr == "Farm") 
		{
            $("#resourceInfo").append("'a'");
			console.log(curr);
        }
		else if (curr == "Fur")
		{
            $("#resourceInfo").append("'b'");
        }
		else if (curr == "Metal")
		{
            $("#resourceInfo").append("'c'");
        }
		else if (curr == "Wood")
		{
            $("#resourceInfo").append("'d'");
        }
		else if (curr == "Stone")
		{
            $("#resourceInfo").append("'e'");
        }
		else if (curr == "Meat")
		{
            $("#resourceInfo").append("'f'");
        }
	});
	
///////////////////////////////////////////////////////	




  var buyables = new Array();
        var outposts = new Array();
        var draggingElement;

        function handleOutpostDragStart(e) {
        e.dataTransfer.setDragImage(element('outpostPic'), 49, 48);
        	statusMessage("Place an Outpost in a Drop Zone to purchase");
        	for(var i = 0; i<16; i++){
        	$("#out"+i).css({"display":"block"});
        }
        	
            
            draggingElement = this;
            draggingElement.className = 'moving';
            
            draggingElement.style.opacity = '0.4';
        }

        function handleOutpostDragEnd(e) {
            this.style.opacity = '1.0';
        	draggingElement.className = undefined;
            draggingElement = undefined;
           
		for(var i = 0; i<16; i++){
			var bgImg = $("#out"+i).css("background-image");
			console.log(bgImg);
			if( bgImg == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
        	$("#out"+i).css({"display":"none"});
        }
        }
          if(!($('#statusMessage').text() === "Successfully purchased Outpost!")){
          	statusMessage("Welcome to iLand");
          }
        }


		function handleDragOver(e){
			if(e.preventDefault) return e.preventDefault();
			return false;
		}

        function handleOutpostDrop(e) {
        
        if (typeof(e)=='string'){
        var curr = element(e);
        if( $(curr).css("background-image") == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
        $(curr).css("height","52px");
         $(curr).css("background-size","30px 52px");
         $(curr).css({
      		"margin-top": function(index, value) {
    		    return parseFloat(value) -20;
    			  }});
			$(curr).css("background-image","url(images/outposttmb.png)");
			$(curr).fadeIn();
			}	
		}else{
		sendGameMessage($(this).attr("id"));
        if( $(this).css("background-image") == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
         $(this).css("height","52px");
         $(this).css("background-size","30px 52px");
         $(this).css({
      		"margin-top": function(index, value) {
    		    return parseFloat(value) -20;
    			  }});
         
          $(this).css("background-image","url(images/outposttmb.png)");
          statusMessage("Successfully purchased Outpost!");
        	  }
        	}
        }
		
  
		function handleRoadVDragStart(e){
		e.dataTransfer.setDragImage(element('roadVPic'), 49, 48);
			statusMessage("Place a Road in a Drop Zone to purchase");
			for(var i = 0; i<21; i++){
				console.log("#roadV"+i);
        	$("#roadV"+i).css({"display":"block"});
        }
        	
            
            draggingElement = this;
            draggingElement.className = 'moving';
            
            draggingElement.style.opacity = '0.4';
		}
		
		function handleRoadVDragEnd(e){
			statusMessage("Drag Road Vertical Ended");
			 this.style.opacity = '1.0';
        	draggingElement.className = undefined;
            draggingElement = undefined;
			for(var i = 0; i<21; i++){
			var bgImg = $("#roadV"+i).css("background-image");
			console.log(bgImg);
			if( !(bgImg == "url(https://iland.grid.csun.edu/game/images/roadVtmb.png)")){
        	$("#roadV"+i).css({"display":"none"});
				}
			}
			if(!($('#statusMessage').text() === "Successfully purchased Road!")){
          	statusMessage("Welcome to iLand");
          }
		}
		function handleRoadVDrop(e){
		console.log($(this).attr("id")+"!!!!!");
	if (typeof(e)=='string'){
			$(element(e)).css("background-image","url(images/roadVtmb.png)");
			$(element(e)).fadeIn();
		}else{
			sendGameMessage($(this).attr("id"));
			$(this).css("background-image","url(images/roadVtmb.png)");
          	statusMessage("Successfully purchased Road!");
          }
		}
		
		
		function handleRoadHDragStart(e){
		e.dataTransfer.setDragImage(element('roadHPic'), 49, 48);
			statusMessage("Place a Road in a Drop Zone to purchase");
			for(var i = 0; i<19; i++){
				console.log("#roadH"+i);
        	$("#roadH"+i).css({"display":"block"});
        }
        	
            
            draggingElement = this;
            draggingElement.className = 'moving';
            
            draggingElement.style.opacity = '0.4';
		}
		function handleRoadHDragEnd(e){
			statusMessage("Drag Road Horizontal Ended");
			 this.style.opacity = '1.0';
        	draggingElement.className = undefined;
            draggingElement = undefined;
			for(var i = 0; i<19; i++){
			var bgImg = $("#roadH"+i).css("background-image");
			console.log(bgImg);
			if( !(bgImg == "url(https://iland.grid.csun.edu/game/images/roadHtmb.png)")){
        	$("#roadH"+i).css({"display":"none"});
				}
			}
			if(!($('#statusMessage').text() === "Successfully purchased Road!")){
          	statusMessage("Welcome to iLand");
          }
		}
		function handleRoadHDrop(e){
		if (typeof(e)=='string'){
			$(element(e)).css("background-image","url(images/roadHtmb.png)");
			$(element(e)).fadeIn();
		}else{
		sendGameMessage($(this).attr("id"));
		$(this).css("background-image","url(images/roadHtmb.png)");
          statusMessage("Successfully purchased Road!");
          }
		}
		function gameActionListener(fromClientID, message){
		console.log(message.substring(0,5));
			if(message.substring(0,5) == "roadV"){
			handleRoadVDrop(message);
			}else if(message.substring(0,5) == "roadH"){
			handleRoadHDrop(message);
			}else if(message.substring(0,3) == "out"){
			handleOutpostDrop(message);
			}
			
		}

        function init() {
  				//Handlers for dropping in Outpost
                element('outpost').addEventListener('dragstart', handleOutpostDragStart, false);
                element('outpost').addEventListener('dragend', handleOutpostDragEnd, false);               
    	    	//Handlers for dropping in roads
    	    	
    	       element('roadHorz').addEventListener('dragstart', handleRoadHDragStart, false);
                element('roadHorz').addEventListener('dragend', handleRoadHDragEnd, false);               
    	    	element('roadVert').addEventListener('dragstart', handleRoadVDragStart, false);
                element('roadVert').addEventListener('dragend', handleRoadVDragEnd, false);   
                
             //Set listener for drop zones           
    	     for(var i=1; i<16; i++){    	    
    	     element('out'+i).addEventListener('drop', handleOutpostDrop, false);
    	     element('out'+i).addEventListener('dragover', handleDragOver, false);
    	     }
    	     for(var i=1; i<21; i++){  
    	     element('roadV'+i).addEventListener('drop', handleRoadVDrop, false);
    	     element('roadV'+i).addEventListener('dragover', handleDragOver, false);
    	     }  
    	      for(var i=1; i<19; i++){  
    	     element('roadH'+i).addEventListener('drop', handleRoadHDrop, false);
    	     element('roadH'+i).addEventListener('dragover', handleDragOver, false);   
    	     }
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
  			msgManager.addMessageListener("GAME_ACTION", gameActionListener, this, [roomID]);
  			// Connect to chat
  			orbiter.connect("tsar190.grid.csun.edu", 9100);
  			displayChatMessage("Connecting to chat server...");
		}   
            window.onload = function() {
            init();
            $("#chat").css({"margin-top":(window.innerHeight-180)+"px"});
        }