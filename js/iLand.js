
$(document).ready(function(){
	sizeW = (window.innerWidth/2)-100;
	sizeW = sizeW+"px";
	sizeH = (window.innerHeight/2)-100;
	sizeH = sizeH+"px";
	
	$("#loginForm").css({"margin-left":sizeW});
	$("#loginForm").css({"margin-top":sizeH});




	$("#login").css({"width":window.innerWidth});
	$("#login").css({"height":window.innerHeight});
	$("#username").focus(); 
//When a user attempts to log in
$("#loginForm").submit(function(){
username = $("#username").val();
password = $("#password").val();


$.post("ajax/login.php",{
		password : ""+password+"",
		username : ""+username+""
		},function(data){
	$("#password").val("");
	if(data =="1"){
		
		$("#login").fadeOut(300);	
	}else{
	window.alert("Invalid Username/password. Please try again");
	
	$("#username").val("");
	$("#username").focus(); 
	}	
		});
		
	});
	
});
