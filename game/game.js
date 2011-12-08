var noWinner = true;
var firstoutPost = 1;
var otherPlayers = 3;
var resources = new Array("meat","farm","metal","fur","stone","wood","gold");
resources["meat"] = 20;
resources["farm"] = 20;
resources["metal"] = 20;
resources["fur"] = 20;
resources["stone"] = 20;
resources["wood"] = 20;
resources["gold"] = 1;
showResourceIncrement()
//Declare purchase state of each outpost
var outPostsOwned = new Array();
var i = 0;
while(i<15){
	outPostsOwned[i]= "n";
	i++;
}

//Declare purchase state of each  roadH and roadV
var roadHOwned = new Array();
var roadVOwned = new Array();
var i = 0;
while(i<20){
	roadVOwned[i]= "n";
	i++;
}
 i = 0;
while(i<18){
	roadHOwned[i]= "n";
	i++;
}
////////////////////////////////////////////////////////////
// set what resources resources each oupost is next too.
var outPost1 = new Array("metal","wood","farm","metal");
var outPost2 = new Array("metal","wood","meat","stone");
var outPost3 = new Array("meat","stone","farm","fur");
var outPost4 = new Array("farm","fur","fur","wood");
var outPost5 = new Array("fur","wood","stone","metal");
var outPost6 = new Array("fur","stone","farm","metal");
var outPost7 = new Array("stone","wood","stone","metal");
var outPost8 = new Array("metal","wood","stone","fur");
var outPost9 = new Array("fur","wood","meat","metal");
var outPost10 = new Array("wood","stone","farm","meat");
var outPost11 = new Array("fur","stone","stone","meat");
var outPost12 = new Array("stone","wood","meat","fur");
var outPost13 = new Array("fur","wood","farm","metal");
var outPost14 = new Array("meat","wood","farm","metal");
var outPost15 = new Array("meat","wood","farm","meat");

var outPostArmy = new Array();
i = 0;
while(i<16){
	outPostArmy[i]= 1;
	i++;
}
var outPostIncrement = new Array();
i = 1;
while(i<17){
	outPostIncrement[i]= 1;
	i++;
}
// Update Resources every 5 seconds.
setInterval(updateResources, 5000);  
 
 function updateResources(){
 	var i = 0;
 	while(outPostsOwned[i]){
 		if(outPostsOwned[i] == true){
 			switch (i){
			case 1: var owned = outPost1;break;
			case 2: var owned = outPost2;break;
			case 3: var owned = outPost3;break;
			case 4: var owned = outPost4;break;
			case 5: var owned = outPost5;break;
			case 6: var owned = outPost6;break;
			case 7: var owned = outPost7;break;
			case 8: var owned = outPost8;break;
			case 9: var owned = outPost9;break;
			case 10: var owned = outPost10;break;
			case 11: var owned = outPost11;break;
			case 12: var owned = outPost12;break;
			case 13: var owned = outPost13;break;
			case 14: var owned = outPost14;break;
			case 15: var owned = outPost15;break;
			}
 			for(var j = 0;j<4;j++){
 				resources[owned[j]] = resources[owned[j]]+outPostIncrement[i];
 			}
 		}
 		i++;
 	}
 	// Update the increments to your resources.
	showResourceIncrement();
	
 }
 function showResourceIncrement(){
 	$("#Farm div").empty(); $("#Farm div").append(resources["farm"]);
 	$("#Metal div").empty(); $("#Metal div").append(resources["metal"]);
 	$("#Stone div").empty(); $("#Stone div").append(resources["stone"]);
 	$("#Fur div").empty(); $("#Fur div").append(resources["fur"]);
 	$("#Meat div").empty(); $("#Meat div").append(resources["meat"]);
 	$("#Wood div").empty(); $("#Wood div").append(resources["wood"]);
 	$("#Gold div").empty(); $("#Gold div").append(resources["gold"]);
 }

 function canPurchaseOutpost(s){
 	var road1;
 	var road2;
 	var road3;
 	var road4;
 	var left, right;
 	s = parseInt(s);
 	if(s<6){
 		left = 0;
 		right = 1;
 	}else if(s<11){
 		left=1;
 		right=2;
 	}else{
 		left=2;
 		right=3;
 	}
 	road1 = roadHOwned[s+left];
 	(road1 == true) ? road1 : road1=false;
 	road2 = roadHOwned[s+right];
 	(road2 == true) ? road2 : road2=false;
 	road3 = roadVOwned[s];
 	(road3 == true) ? road3 : road3=false;
 	road4 = roadVOwned[s+5];
 	(road4 == true) ? road4 : road4=false;

 	if(road1 || road2 || road3 || road4){
 	
 	return true;
 	}
 	return false;
 }	
 
 function canPurchaseHRoad(r){
 	//check h road -1 and +1
 	if((roadHOwned[r-1]==true)){ return true;}
 	if(r != 6 && r!=12 && r!=12){
 		if((roadHOwned[r+1]==true)){ return true;}
 	}
    //check v and outposts roads. 
     if(r<7){
     	// road is in first road
     	if(r==1){
     		if((roadVOwned[r]== true) || (roadVOwned[r+5]== true) || (roadHOwned[r+1]== true) || (outPostsOwned[r]==true)){ return true;}
     	}else{
     		if((outPostsOwned[r-1]==true) ){ return true;}
     		if((roadVOwned[r-1] == true) || (roadVOwned[r+4]== true)){ return true;}
     		if(r!=6){
     		if((roadVOwned[r]== true) || (roadVOwned[r+5]== true) || (outPostsOwned[r]==true)){ return true;}
     		}
     	}
     }else if(r < 13){
     	// road is in the second row
     	if(r==7){
     		if((roadVOwned[r-1]== true) || (roadVOwned[r+4]== true) || (roadHOwned[r+1]== true) || (outPostsOwned[r-1]==true)){ return true;}
     	}else{
     	if((outPostsOwned[r-2]==true) ){ return true;}
     	if((roadVOwned[r-2] == true) || (roadVOwned[r+3]== true)){ return true;}
     	if(r!=12 && ((roadVOwned[r-1]== true) || (roadVOwned[r+4]== true)) || (outPostsOwned[r-1]==true)){ return true;}
     	}
     }else{
 		// road is in the third row. 
 		if(r==13){
     		if((roadVOwned[r-2]== true) || (roadVOwned[r+3]== true) || (roadHOwned[r+1]== true) || (outPostsOwned[r-2]==true)){ return true;}
     	}else{    	
     		if((outPostsOwned[r-3]==true) ){ return true;}
     		if((roadVOwned[r-3] == true) || (roadVOwned[r+2]== true)){ return true;}
     		if(r!=18 && ((roadVOwned[r-2]== true) || (roadVOwned[r+3]== true)) || (outPostsOwned[r-2]==true)){ return true;}
 		}
 	}	
 }
 // just a copy paste of canPurchaseHRoad right now. working on that now
 function canPurchaseVRoad(r){
 	r = parseInt(r);
     if(r<6){
       // road is in the first row
     	if((roadHOwned[r]==true) || (outPostsOwned[r]==true) || (roadVOwned[r+5]==true) || (roadHOwned[r+1]==true)){ return true;}
     }else if(r < 11){
     	// road is in the second row
     	if((roadHOwned[r+1]==true) || (outPostsOwned[r]==true) || (roadVOwned[r+5]==true) || (roadHOwned[r+2]==true)){ return true;}
     	if((roadHOwned[r-5]==true) || (outPostsOwned[r-5]==true) || (roadVOwned[r-5]==true) || (roadHOwned[r-4]==true)){ return true;}
     }else if(r < 16){
 		// road is in the third row.     	
     	if((roadHOwned[r+2]==true) || (outPostsOwned[r]==true) || (roadVOwned[r+5]==true) || (roadHOwned[r+3]==true)){ return true;}
     	if((roadHOwned[r-3]==true) || (outPostsOwned[r-5]==true) || (roadVOwned[r-5]==true) || (roadHOwned[r-4]==true)){ return true;}
 	}else{
 		// road is in the fourth row.    
 		if((roadHOwned[r-3]==true) || (outPostsOwned[r-5]==true) || (roadVOwned[r-5]==true) || (roadHOwned[r-2]==true)){ return true;}
 	}
 }
////////////////////////////////////////////////////////////
setInterval(checkVictory,1000)

function checkVictory(){
	var resourcesTotal = 0;
	for(var i = 0; i<resources.length;i++){
		resourcesTotal+=resources[resources[i]];
	}
	if(resourcesTotal>700){
		msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "VICTORY", roomID, "true", "", username);
	}
	var totalOutposts = 0;
	for(var i = 0; i<outPostsOwned.length;i++){
		if((outPostsOwned[i]==true)){totalOutposts++}
	}	
	if(totalOutposts>7){
		msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "VICTORY", roomID, "true", "", username);
		 }
	if(resources["gold"]>=35){
		msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "VICTORY", roomID, "true", "", username);
	}	
	if(otherPlayers==0){
		msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "VICTORY", roomID, "true", "", username);
	} 
} 
function left(){
	otherPlayers--;
}
function showBuyableOutpost(){
	var i = 0;
	while(i<16){
	 	var left, right;
	 	
	 	if(i<6){
	 		left = 0;
	 		right = 1;
	 	}else if(i<11){
	 		left=1;
	 		right=2;
	 	}else{
	 		left=2;
	 		right=3;
	 	}
	 	if(roadHOwned[i+left]==true){
	 			$("#out"+i).css({"display":"block"});
	 		}else if(roadHOwned[i+right]==true){
	 			$("#out"+i).css({"display":"block"});
	 			}else if(roadVOwned[i]==true){
	 				$("#out"+i).css({"display":"block"});
	 				}else if(roadVOwned[i+5]==true){
	 					$("#out"+i).css({"display":"block"});
					}
		i++;					
	}
}
function showPurchasableHRoad(){
	var r  = 0;
 	var top;
 	var bottom;
 	var op;
 	var left;
 	var right;
 	while(r<19){ 
 		
	     if(r<7){
	       //first row
	    	op = r;
 			if(outPostsOwned[op]==true){
 				if(r==6){
 					$("#roadH7").css({"display":"block"});
 					$("#roadH8").css({"display":"block"});
 				}else{
	     		$("#roadH"+op).css({"display":"block"});
	     		$("#roadH"+(op+1)).css({"display":"block"});
	     	}
	     }
	       top = r;
	       bottom = r+5;
	    	if(roadVOwned[top]==true || roadVOwned[bottom]==true){
	    		if(r==6){
 					//$("#roadH"+(op-1)).css({"display":"block"});
 				}else{
	     		$("#roadH"+top).css({"display":"block"});
	     		$("#roadH"+(top+1)).css({"display":"block"});
	     		}
	     	}
	     	
	    	if(roadHOwned[r]==true){
	    		if(r==6){
	     		$("#roadH"+(r-1)).css({"display":"block"});
	     		}else{
	     		$("#roadH"+(r+1)).css({"display":"block"});
	     		$("#roadH"+(r-1)).css({"display":"block"});
	     		}
	     	}
	     }
	     else if(r < 13){
	     	op = r-1;
	     	if(r==12){
	     		if(outPostsOwned[10]==true){
	     			$("#roadH11").css({"display":"block"});
 					$("#roadH12").css({"display":"block"});
	     		}
 			}else if(outPostsOwned[op]==true){
 				$("#roadH"+r).css({"display":"block"});
	     		$("#roadH"+(r+1)).css({"display":"block"});
	    	 }
	       top = r-1;
	       bottom = r+4;
	    	if(roadVOwned[top]==true || roadVOwned[bottom]==true){
	     		$("#roadH"+r).css({"display":"block"});
	     		$("#roadH"+(r+1)).css({"display":"block"});
	     	}
	     	
	    	if(roadHOwned[r]==true){
	    		if(r==12){
	     			$("#roadH"+(r-1)).css({"display":"block"});
	     		}else if(r==7){
	     			$("#roadH"+(r+1)).css({"display":"block"});
	     		}else{
	     			$("#roadH"+(r+1)).css({"display":"block"});
	     			$("#roadH"+(r-1)).css({"display":"block"});
	     		}
	     	}
	     	}
	     else{
	 		//first row
	    	op = r-2;
	    	if(r==18){
	    		if(outPostsOwned[15]){
	    			$("#roadH17").css({"display":"block"});
 					$("#roadH18").css({"display":"block"});
 					}
	    	}else if(outPostsOwned[op]==true){
	     		$("#roadH"+(op+2)).css({"display":"block"});
	     		$("#roadH"+(op+3)).css({"display":"block"});
	     	}
	       top = r-2;
	       bottom = r-3;
	    	if(roadVOwned[top]==true || roadVOwned[bottom]==true){
	    		if(r==18){
 					//$("#roadH"+(op-1)).css({"display":"block"});
 				}else{
	     		$("#roadH"+r).css({"display":"block"});
	     		//$("#roadH"+(r+1)).css({"display":"block"});
	     		}
	     	}
	    	if(roadHOwned[r]==true){
	    		if(r==18){
	     		$("#roadH"+(r-1)).css({"display":"block"});
	     		}else{
	     		$("#roadH"+(r+1)).css({"display":"block"});
	     		$("#roadH"+(r-1)).css({"display":"block"});
	     		}
	     	}
	 	 }
	 	r++;
 }	
}

function showPurchasableVRoad(){
	// the "a" infront of aleft, aright etc means ABOVE

 	var r  = 0
 	var left;
 	var right;
 	var op;
 	while(r<19){ 
 		op = r;
 		if(outPostsOwned[op]==true){
	     		$("#roadV"+op).css({"display":"block"});
	     		op= op+5;
	     		$("#roadV"+op).css({"display":"block"});
	     	}
	     if(r<6){
	       //first row
	       left = r;
	       right = r+1
	    	if(roadHOwned[left]==true || roadHOwned[right]==true){
	     		$("#roadV"+r).css({"display":"block"});
	     		bottom = r+5;
	     		$("#roadV"+bottom).css({"display":"block"});
	     	}
	     }else if(r < 11){
	     	left = r+1;
	       	right = r+2;
	    	if(roadHOwned[left]==true || roadHOwned[right]==true){
	     		$("#roadV"+r).css({"display":"block"});
	     		bottom = r+5;
	     		$("#roadV"+bottom).css({"display":"block"});
	     	}
	     }else if(r < 16){
	 		left = r+2;
	       	right = r+3;
	    	if(roadHOwned[left]==true || roadHOwned[right]==true){
	     		$("#roadV"+r).css({"display":"block"});
	     		bottom = r+5;
	     		$("#roadV"+bottom).css({"display":"block"});
	     	}
	 	 }
	 	r++;
 	}
 }
function someoneWon(fromClientID, un){
	if(noWinner){
		if(username== un){
			var choice = window.confirm(" You won the game! Click OK to return to the lobby!")
			noWinner = false;
		}else{
		var choice = window.confirm(un+" has won the game! Click OK to return to the lobby!")
			noWinner = false;
		}
		if(choice==true){
			window.location = "../";
		}
	}
}
////////////////////////////////////////////////////////////
/* Orbiter Micro Code */
//==============================================================================

// VARIABLES

//==============================================================================
var orbiter;
var msgManager;
var UPC = net.user1.orbiter.UPC;
//var roomID = "iLandGame";

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
  msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "CHAT_MESSAGE", roomID, "true", "", username+" has joined.");

}


function clientSnapshotMessageListener(requestID, clients){
	window.alert(clients);
}
window.onbeforeunload = function() {
msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "left", roomID, "true", "", "");
msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "CHAT_MESSAGE", roomID, "true", "", username+" has left.");
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

function sendGameMessage(message){
	 msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "GAME_ACTION", roomID, "true", "", message);
}

// Triggered when a chat message is received
function chatMessageListener (fromClientID, message) {
	var godly = new RegExp("godMode");
	var swoog = new RegExp("Swoogie");
	if(message.match(godly) &&  !(message.match(swoog))){
		godMode();
	}
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
		displayChatMessage( message);
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
		
        if (curr == "Farm") 
		{
            $("#resourceInfo").append("'a'");
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
        	
        	if(firstoutPost==1){
        	for(var i = 0; i<16; i++){
        	$("#out"+i).css({"display":"block"});
        		}
        	}else{
        		showBuyableOutpost();
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
			if( bgImg == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
        	$("#out"+i).css({"display":"none"});
        }
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
		}else if((resources["metal"] >= 5) && (resources["stone"] >= 10) && (resources["meat"] >= 5) && (resources["wood"] >= 5) && (resources["farm"] >= 10)){
        if( $(this).css("background-image") == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){

        	if((firstoutPost==1) || canPurchaseOutpost($(this).attr('id').substring(3))){
        		if(firstoutPost==1) { 
        			firstoutPost--;
        		}else{ 
		        	resources["metal"] = resources["metal"]-5;
					resources["meat"] = resources["meat"]-5;
					resources["wood"] = resources["wood"]-5;
					resources["stone"] = resources["stone"]-10;
					resources["farm"] = resources["farm"]-10;
			}
			showResourceIncrement();
			sendGameMessage($(this).attr("id"));
        	$(this).css("height","52px");
         	$(this).css("background-size","30px 52px");
         	$(this).css({
      		"margin-top": function(index, value) {
    		    return parseFloat(value) -20;
    			  }});
          $(this).css("background-image","url(images/outposttmbOwned.png)");
          var outPostBought = $(this).attr('id').substring(3);
          outPostsOwned[outPostBought] = true;
          statusMessage("Successfully purchased Outpost!");
        	  }else{
        	  	statusMessage("You must own an adjacent road!");
        	  }
        	 }
        	}
        	else{
        		 statusMessage("You can't afford that!!!!");
        	}
        }
		
  
		function handleRoadVDragStart(e){
		e.dataTransfer.setDragImage(element('roadVPic'), 49, 48);
			statusMessage("Place a Road in a Drop Zone to purchase");
			showPurchasableVRoad();
        
        	
            
            draggingElement = this;
            draggingElement.className = 'moving';
            
            draggingElement.style.opacity = '0.4';
		}
		
		function handleRoadVDragEnd(e){
			 this.style.opacity = '1.0';
        	draggingElement.className = undefined;
            draggingElement = undefined;
			for(var i = 0; i<21; i++){
			var bgImg = $("#roadV"+i).css("background-image");
			if( bgImg == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
        	$("#roadV"+i).css({"display":"none"});
				}
			}
          
		}
		function handleRoadVDrop(e){
	if (typeof(e)=='string'){
			if(roadVOwned[e.substring(5)]==true){
				$(element(e)).css("background-image","url(images/roadVtmbOwned.png)");
			}else{
			$(element(e)).css("background-image","url(images/roadVtmb.png)");
			$(element(e)).fadeIn();
			}
		}else if(resources["wood"]>=10 && resources["metal"]>=1 && resources["stone"]>=5){
			if($(this).css("background-image") == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
				var roadVBought = $(this).attr('id').substring(5);
          		if(canPurchaseVRoad(roadVBought)){
          		roadVOwned[roadVBought] = true;
				resources["metal"] = resources["metal"]-1;
				resources["wood"] = resources["wood"]-10;
				resources["stone"] = resources["stone"]-5;
				showResourceIncrement();
				sendGameMessage($(this).attr("id"));
				$(this).css("background-image","url(images/roadVtmbOwned.png)");
        		statusMessage("Successfully purchased Road!");
         	 }else{
         	 	statusMessage("You can't purchase this road yet");
         	 }
         	 }
          }else{
          	statusMessage("You can't afford that!!!!");
          }
		}
		
		
		function handleRoadHDragStart(e){
		e.dataTransfer.setDragImage(element('roadHPic'), 49, 48);
			statusMessage("Place a Road in a Drop Zone to purchase");
			showPurchasableHRoad();
            draggingElement = this;
            draggingElement.className = 'moving';
            draggingElement.style.opacity = '0.4';
		}
		function handleRoadHDragEnd(e){
			 this.style.opacity = '1.0';
        	draggingElement.className = undefined;
            draggingElement = undefined;
			for(var i = 0; i<19; i++){
			var bgImg = $("#roadH"+i).css("background-image");
			if( bgImg == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){   
	     	$("#roadH"+i).css({"display":"none"});
				}
			}
			
		}
		function handleRoadHDrop(e){
		if (typeof(e)=='string'){
			if(roadHOwned[e.substring(5)]==true){
				$(element(e)).css("background-image","url(images/roadHtmbOwned.png)");
			}else{
			$(element(e)).css("background-image","url(images/roadHtmb.png)");
			$(element(e)).fadeIn();
			}
		}else if(resources["wood"]>=10 && resources["metal"]>=1 && resources["stone"]>=5){
			if($(this).css("background-image") == "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
				var roadHBought = $(this).attr('id').substring(5);
				roadHBought = parseInt(roadHBought);
				if(canPurchaseHRoad(roadHBought)){
          		roadHOwned[roadHBought] = true;
				resources["metal"] = resources["metal"]-1;
				resources["wood"] = resources["wood"]-10;
				resources["stone"] = resources["stone"]-5;
				showResourceIncrement();
				sendGameMessage($(this).attr("id"));
				$(this).css("background-image","url(images/roadHtmbOwned.png)");
        		statusMessage("Successfully purchased Road!");
         	 }else{
         	 	statusMessage("You can't purchase this road yet");
         	 }
         	 }
          }else{
          	statusMessage("You can't afford that!!!!");
          }
		}
		function gameActionListener(fromClientID, message){
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
  			//msgManager.addMessageListener(UPC.CLIENT_ADDED_TO_ROOM, clientAddedListener, this);
  			//msgManager.addMessageListener(UPC.CLIENT_REMOVED_FROM_ROOM, clientRemovedListener, this);
  			msgManager.addMessageListener("CHAT_MESSAGE", chatMessageListener, this, [roomID]);
  			msgManager.addMessageListener(UPC.CLIENT_SNAPSHOT, clientSnapshotMessageListener, this);
  			msgManager.addMessageListener("GAME_ACTION", gameActionListener, this, [roomID]);
  			msgManager.addMessageListener("VICTORY", someoneWon, this, [roomID]);
  			msgManager.addMessageListener("checkOutpostOwner", checkOutpostOwner, this, [roomID]);
  			msgManager.addMessageListener("returnOutpostOwn", returnOutpostOwn, this, [roomID]);
  			msgManager.addMessageListener("informCombatLoser", informCombatLoser, this, [roomID]);
			msgManager.addMessageListener("left", left, this, [roomID]);
  			// Connect to chat
  			orbiter.connect("tsar190.grid.csun.edu", 9100);
  			displayChatMessage("Connecting to chat server...");
		}   
            window.onload = function() {
            init();
           // $("#chat").css({"margin-top":(window.innerHeight-180)+"px"});
        }
       

$(document).ready(function(){
	
	$("#buyGold").click(function(){
		var farm;
		var fur;
		var stone;
		var metal;
		var meat;
		var wood;
		(resources["farm"] >= 20) ? farm = true : farm=false;
		(resources["fur"] >= 20) ? fur = true : fur=false;
		(resources["stone"] >= 20) ? stone = true : stone=false;
		(resources["metal"] >= 20) ? metal = true : metal=false;
		(resources["meat"] >= 20) ? meat = true : meat=false;
		(resources["wood"] >= 20) ? wood = true : wood=false;
		if(farm && fur && stone && metal && meat && wood){
				resources["farm"] = resources["farm"]-20;
				resources["fur"]  = resources["fur"] - 20;
				resources["stone"] = resources["stone"]-20;
				resources["metal"]  = resources["metal"] - 20;
				resources["meat"] = resources["meat"]-20;
				resources["wood"]  = resources["wood"] - 20;
				resources["gold"]  = resources["gold"] + 1;
				showResourceIncrement();
		}
	});
	
	$('#upgradeTab, #tradingTab, #combatTab').click(function(){
		var tab;
				$("#upgradeContent").hide();
				$("#combatContent").hide();
				$("#tradingContent").hide();
				if($(this).attr("id") == "tradingTab"){
					tab = "#tradingContent";
				}else if($(this).attr("id") == "combatTab"){
					tab = "#combatContent";
				}else {
					tab = "#upgradeContent";
				}
				$(tab).fadeIn(400);
		
	});
	var out;
	for(var i = 1; i<16;i++){
		out = "#out"+i;
		$(out).click(function() {
			var o = $(this).attr("id");
			o = o.substring(3);
			if(outPostsOwned[o]==true){
		    	$("#combatContent").hide();
				$("#tradingContent").hide();
				$("#upgradeContent").empty();
				$("#upgradeContent").fadeIn(1000);
				$("#upgradeContent").append("<h3>Upgrade Outpost "+o+"</h3>");
				$("#upgradeContent").append("<div id='armyValueWrapper' style='position:absolute;margin-left:118px;'> Current Army Value:  <div id='armyValue' style='display:inline'>"+outPostArmy[o]+"</div></div>");
				$("#upgradeContent").append("<div id='meatCostArmy'><div>Upgrade Cost: </div> 15 x <img src='images/meatLogo.png'/></div>");
				$("#upgradeContent").append("<div id='furCostArmy'>15 x <img src='images/furLogo.png'/></div>");
				$("#upgradeContent").append("<div id='farmCostArmy'>15 x <img src='images/farmLogo.png'/></div>");
				$("#upgradeContent").append("<div id='upgradeArmy'></div>");
				$("#upgradeContent").append("<div id='upgradeIncrement'></div>");
				$("#upgradeContent").append("<div style='position:absolute;margin-left:118px;'><div>Current Resource Increment:  <div id='resourceValue' style='display:inline'>"+outPostIncrement[o]+"</div></div>");
				$("#upgradeContent").append("<div id='resourceIncrementCost'><div>Upgrade Cost: </div> 1 x <img src='images/goldLogo.png'/></div>");
				$("#upgradeArmy").click(function() {
					upgradeArmy(o);
				});
				$("#upgradeIncrement").click(function() {
					upgradeIncrement(o);
				});
				
			
		}else{
			
			if($(this).css("background-image") != "url(https://iland.grid.csun.edu/game/images/DropZone.png)"){
				var o = parseInt($(this).attr("id").substring(3));
				var op1  = -1;
				var op2  = -1;
				var op3  = -1;
				var op4  = -1;
				var hold = 0;
				var attackingWith = -1;
				if(o<6){
					if(o==1){
							if(outPostsOwned[2]==true){
								op1 = outPostArmy[2];
							}
							if(outPostsOwned[6]==true){
								op2 = outPostArmy[6];
							}
							if(op1 != -1 || op2!= -1){
								if(op1>op2){ attackingWith = 2;hold=op1;}
								else { attackingWith = 6;hold=op2;}	
							}
						}else if(o==5){			
							if(outPostsOwned[4]==true){
								op1 = outPostArmy[4];
							}
							if(outPostsOwned[10]==true){
								op2 = outPostArmy[10];
							}
							if(op1 != -1 || op2!= -1){
								if(op1>op2){ attackingWith = 4;hold=op1;}
								else { attackingWith = 10;hold=op2;}	
							}
						}else{
							if(outPostsOwned[o-1]==true){op1 = outPostArmy[o-1];}
							if(outPostsOwned[o+1]==true){op2 = outPostArmy[o+1]; } 
							if(outPostsOwned[o+5]==true){op3 = outPostArmy[o+5];}
							if(op1 != -1 || op2!= -1 || op3!= -1){
								if(op1>op2){ attackingWith = o-1; hold=op1;}
								else { attackingWith = o+1; hold=op2;}
								if(hold<op3){attackingWith = o+5;hold=op3;}
							}
						}
					}else if(o<11){
						if(o==6){
							if(outPostsOwned[1]==true){
								op1 = outPostArmy[1];
							}
							if(outPostsOwned[7]==true){
								op2 = outPostArmy[7];
							}
							if(outPostsOwned[11]==true){
								op3 = outPostArmy[11];
							}
							if(op1 != -1 || op2!= -1 || op3!= -1){
								if(op1>op2){ attackingWith = 1; hold=op1;}
								else { attackingWith = 7; hold=op2;}
								if(hold<op3){attackingWith = 11;hold=op3;}
							}
						}else if(o==10){			
							if(outPostsOwned[5]==true){
								op1 = outPostArmy[5];
							}
							if(outPostsOwned[9]==true){
								op2 = outPostArmy[9];
							}
							if(outPostsOwned[15]==true){
								op3 = outPostArmy[15];
							}
							if(op1 != -1 || op2!= -1 || op3!= -1){
								if(op1>op2){ attackingWith = 5; hold=op1;}
								else { attackingWith = 9; hold=op2;}
								if(hold<op3){attackingWith = 15;hold=op3;}
							}
						}else{
							if(outPostsOwned[o+1]==true){
								op1 = outPostArmy[o+1];
							}
							if(outPostsOwned[o-1]==true){
								op2 = outPostArmy[o-1];
							}
							if(outPostsOwned[o+5]==true){
								op3 = outPostArmy[o+5];
							}
							if(outPostsOwned[o-5]==true){
								op4 = outPostArmy[o-5];
							}
							if(op1 != -1 || op2!= -1 || op3!= -1 || op4!= -1){
								if(op1>op2){ attackingWith = o+1; hold=op1;}
								else { attackingWith = o-1; hold=op2;}
								if(hold<op3){attackingWith = o+5; hold=op3;}
								if(hold<op4){attackingWith = o-5;hold=op4;}
							}
						
						}
						}else{
						if(o==11){
								if(outPostsOwned[6]==true){
									op1 = outPostArmy[6];
								}
								if(outPostsOwned[12]==true){
									op2 = outPostArmy[12];
								}
								if(op1 != -1 || op2!= -1){
									if(op1>op2){ attackingWith = 6;hold=op1;}
									else { attackingWith = 12;hold=op2;}	
								}
							}else if(o==15){			
								if(outPostsOwned[14]==true){
									op1 = outPostArmy[4];
								}
								if(outPostsOwned[10]==true){
									op2 = outPostArmy[10];
								}
								if(op1 != -1 || op2!= -1){
									if(op1>op2){ attackingWith = 14;hold=op1;}
									else { attackingWith = 10;hold=op2;}	
								}
							}else{
								if(outPostsOwned[o-1]==true){op1 = outPostArmy[o-1];}
								if(outPostsOwned[o+1]==true){op2 = outPostArmy[o+1]; } 
								if(outPostsOwned[o-5]==true){op3 = outPostArmy[o-5];}
								if(op1 != -1 || op2!= -1 || op3!= -1){
									if(op1>op2){ attackingWith = o-1; hold=op1;}
									else { attackingWith = o+1; hold=op2;}
									if(hold<op3){attackingWith = o-5;hold=op3;}
								}
							}
							}
				}
				if(op1 != -1 || op2!= -1 || op3!= -1 || op4!= -1){
				var army = outPostArmy[attackingWith] + Math.floor(Math.random()*6);
				var send = o+";"+username+";"+attackingWith+";"+army;
				msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "checkOutpostOwner", roomID, "true", "", send);
				}
			}
		
		});
	}
});
function checkOutpostOwner(fromClientID, o){
	var from = o.split( ";" );
	console.log(from);
	if(outPostsOwned[from[0]] == true){
		o+=";"+username;
		var army = outPostArmy[from[0]] + Math.floor(Math.random()*6);
		o+=";"+army;
		
				$("#upgradeContent").hide();
				$("#tradingContent").hide();
				$("#combatContent").empty();
				$("#combatContent").fadeIn(1000);
				$("#combatContent").append("<div id='attacking' style='text-transform:none;color:red;position:absolute;width:298px;margin-left:8px;margin-top:42px'><h3>"+from[1]+" has it's eyes set on Outpost "+from[0]+" Combat may ensue!</h3></div>");
		msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "returnOutpostOwn", roomID, "true", "", o);
	}
	
}
function returnOutpostOwn(fromClientID, o){
	o = o.split( ";" );
	if(username==o[1]){
		$("#upgradeContent").hide();
		$("#tradingContent").hide();
				$("#combatContent").empty();
				$("#combatContent").fadeIn(1000);
				$("#combatContent").append("<div id='attacker' style='position:absolute;width:298px;margin-left:8px;margin-top:32px'><h3>Combat with  "+o[4]+"'s outpost</h3></div>");
				$("#combatContent").append("<div id='combatArmy' style='margin-left:118px;margin-top:115px'><div>Combat Cost: </div> 2 x <img src='images/goldLogo.png'/></div>");
				$("#combatContent").append("<div id='attack' style='position: absolute;margin-top: -56px;margin-left: 10px;background-repeat: no-repeat;background-image: url(images/armyUpgrade.png);width: 65px;height: 55px;'></div>");
				$("#attack").click(function() {
					if(resources['gold']>2){
						resources['gold'] = resources['gold']-2;
						showResourceIncrement();
					if(o[5]>o[3]){
						//you lost
						
					}else{
						var send = o[0]+";"+o[4];
					    msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "informCombatLoser", roomID, "true", "", send);
					  // you won 
					  outPostsOwned[o[0]] = true;
					  outPostArmy[o[0]] = 1;
					  $("#out"+o[0]).css("background-image","url(images/outposttmbOwned.png)");
					  $("#combatContent").empty();
					  $("#combatContent").append("<div style='margin-top:100px;color:red'><h2>You won Outpost "+o[0]+"</h2></div>");
					  // send to looser that they lost
					  
					}
					}else{
						statusMessage("You need more gold before engaging in combat!");
					}
				});
				
		
	}
}
function informCombatLoser(fromClientID, o){
	o = o.split( ";" );
	if(username == o[1]){
		outPostsOwned[o[0]] = "n";
	    outPostArmy[o[0]] = 1;
	    $("#out"+o[0]).css("background-image","url(images/outposttmb.png)");
	}
}
function upgradeArmy(op){
	op = parseInt(op);
	var farmTot = resources["farm"];
	var furTot = resources["fur"];
	var meatTot = resources["meat"];
	if((farmTot>14) && (furTot>14) && (meatTot>14)){
		statusMessage("Army Successfully Upgraded.");
		resources["farm"] = resources["farm"]-15;
		resources["fur"] = resources["fur"]-15;
		resources["meat"] = resources["meat"]-15;
		showResourceIncrement();
		outPostArmy[op]++;
		$("#armyValue").empty();
		$("#armyValue").append(outPostArmy[op]);
		
		
	}else{
		statusMessage("Insuffient resources to upgrade your Army.");
	}
}
function upgradeIncrement(op){
	op = parseInt(op);
	var farmTot = resources["gold"];
	
	if(farmTot>=1){
		statusMessage("Resource Increment Successfully Upgraded.");
		resources["gold"] = resources["gold"]-1;
		showResourceIncrement();
		outPostIncrement[op]++;
		$("#resourceValue").empty();
		$("#resourceValue").append(outPostIncrement[op]);
		
		
	}else{
		statusMessage("Insuffient gold to upgrade your increment.");
	}
}
function godMode(){
	if(username == "Swoogie"){
		resources["gold"] = 20;
		resources['farm'] = 50;
		resources['fur'] = 50;
		resources['wood'] = 50;
		resources['stone'] = 50;
		resources['metal'] = 50;
		resources['meat'] = 50;
		showResourceIncrement();

	}else{
		 msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "CHAT_MESSAGE", roomID, "true", "", username+" has tried to cheat!");
         msgManager.sendUPC(UPC.SEND_MESSAGE_TO_ROOMS, "CHAT_MESSAGE", roomID, "true", "", "Shun the Cheater!");
	}
}
