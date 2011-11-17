//Chat Commands

function displayHelp()
{	
	displayChatMessage("Welcome to iLand.  Please choose from the following and enter the number");	
	displayChatMessage("1: To Learn How to Play");	displayChatMessage("2: To Show the Rules and Win-cases");
	displayChatMessage("3: To Show how to Whisper another player");
	displayChatMessage("4: To Submit a Bug Report");
	displayChatMessage("5: To Skip this");	
		switch(x)
		{	
			case 1:	howToPlay();	
			case 2:	rules();
			case 3: whisperInstr();
			case 4: bugReport();
			case 5: break;
			case 6: whyAmIHere();
		}
}

function whisperInstr()
{	
	displayChatMessage("Press / and type whisper then a space and enter the Users name you wish to private message and another space.");	displayChatMessage("Then write your message and press enter.");
	displayChatMessage("Example: /whisper Bob Hello");
}

function whisper(to,from)
{

}
function howToPlay()
{	
	displayChatMessage("iLand is an interactive real-time stratagy game.  To start out you need to build roads from your base.");	
	displayChatMessage("A new road will allow you to build a new outpost at then end of it unless another player has already built one there.");			displayChatMessage("Each outpost can be upgraded to allow you to collect more resources and defend yourself from opposing players.");	
}

function rules()
{		
	displayChatMessage("There are two main ways to win when you are playing."); 	
	displayChatMessage("The first way is domination, if you can take over 90% of the map you will be declared victorious.");	
	displayChatMessage("This is determinied when you achieved control over 90% of the roads and outposts on the map.");	
	displayChatMessage("The second option is resource domination, if you own more then double the resources of all the other players added together then you will be declared victorious.");	
	displayChatMessage("Resources are checked individually, so while you might have a total net resouce worth that is more then double of the other players that will not grant you victory.");	
	displayChatMessage("You must have double the total from the other players in each and every individual resource to be declared the winner.");	
}

function whyAmIHere()
{

}