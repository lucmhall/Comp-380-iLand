
$(document).ready(function(){


//When a user attempts to log in
$("#loginForm").submit(function(){
username = $("#username").val();
password = $("#password").val();


$.post("ajax/login.php",{
		password : ""+password+"",
		username : ""+username+""
		},function(data){
	
	if(data =="1"){
		$("#login").fadeOut(300);	
	}else{
	window.alert("Invalid Username/password. Please try again");
	}	
		});
		
	});
	
});
