//==============================================================================

// VARIABLES

//==============================================================================




/***********Javascript Functions*****************************/

// Used to make user confirm before refresh. 
// Should remove this comment after development
//window.onbeforeunload = function() { return "If you refresh, your data will be lost."; }

//All javascript that will be run when the page loads goes here.
function pageLoad(){
	ww = window.innerWidth-560;
    ww2 = window.innerWidth-560-350;
	sizeW = (window.innerWidth/2)-100;
	hh = (window.innerHeight/2)-150;
    logo = (window.innerWidth/2 - 157)+"px";
	
	$("#logo").css({"margin-left":logo});
    //$("#description").css({"margin-top":hh});
	$("#loginForm").css({"margin-left":ww});
	$("#loginForm").css({"margin-top":hh});
	$("#changeAccountForm").css({"margin-left":ww});
	$("#changeAccountForm").css({"margin-top":hh});
    $("#deleteAccountForm").css({"margin-left":ww2});
	$("#deleteAccountForm").css({"margin-top":hh});
	$("#edit").css({"width":window.innerWidth});
	$("#edit").css({"height":window.innerHeight});
	$("#username").focus(); 
	
	
}

//Window the window is resized, run these functions to keep ratios right.
window.onresize = resize;
function resize()
{
sizeW = sizeW+"px";
	ww = window.innerWidth-460;
    ww2 = window.innerWidth-460-350;
	hh = (window.innerHeight/2)-150;
	$("#loginForm").css({"margin-left":ww});
	$("#loginForm").css({"margin-top":hh});
	$("#changeAccountForm").css({"margin-left":ww});
	$("#changeAccountForm").css({"margin-top":hh});
    $("#deleteAccountForm").css({"margin-left":ww2});
	$("#deleteAccountForm").css({"margin-top":hh});
	$("#edit").css({"width":window.innerWidth});
	$("#edit").css({"height":window.innerHeight});
	$("#username").focus(); 
}


/************Jquery**************************************/
//All JQuery goes here.
$(document).ready(function()
{
    pageLoad();
    $("#un").val(username);
    //User Password Change
    $("#changeAcct").submit(function () 
    {
        if (($("#un").val() != 0) &&
        ($("#newPass").val() != 0) &&
        ($("#newPass2").val() != 0))
        {
            un = $("#un").val();
            pass = $("#pass").val();
            newPass = $("#newPass").val();
            newPass2 = $("#newPass2").val();
            
            if (newPass != newPass2) 
            {
                window.alert("New Passwords do not match");
                $("#newPass,#newPass2").val('');
                $("#newPass").focus();
            } 
            else 
            {
                $.post("../ajax/changePassword.php", {
                    newPass: "" + newPass + "",
                    pass: "" + pass + "",
                    un: "" + un + ""
                }, function (data) {
                    if (data == 1) {
                        window.alert("Password Updated!");
                        window.location = '../';
                    } 
                    else if (data == 2) 
                    {                        
                        window.alert("Username does not exists. Please enter a valid user name.");
                        $("#un,#pass,#newPass,#newPass2").val('asdfasdf');
                        $("#un").focus();
                    }
                    else if (data == 3)
                    {
                        window.alert("Cannot connect to Database. Retry Later, or check your internet connection.");
                        $("#un,#pass,#newPass,#newPass2").val('');
                        $("#un").focus();
                    }
                    else if (data == 4)
                    {
                        window.alert("Wrong Password. Try again");
                        $("#pass").val('');
                        $("#pass").focus();
                    }
                });
            }
            
        } else {
            window.alert("One of the fields are left blank");
        }
    });//End User change password
    
    
    
    $("#deleteAcct").submit(function () 
    {
        if ($("#delpass").val() != '')
        {
            pass = $("#delpass").val();
            //window.alert(username);

            $.post("../ajax/deleteAccount.php", {
                pass: "" + pass + "",
                username: "" + username + ""
            }, function (data) {
                if (data == 1) 
                {
                    window.alert("Account Deleted!");
                    window.location = '../';
                } 
                else if (data == 2) 
                {                        
                    window.alert("Username does not exists. Please enter a valid user name.");
                    $("#un,#pass,#newPass,#newPass2").val('');
                    $("#un").focus();
                }
                else if (data == 3)
                {
                    window.alert("Cannot connect to Database. Retry Later, or check your internet connection.");
                    $("#un,#pass,#newPass,#newPass2").val('');
                    $("#un").focus();
                }
                else if (data == 4)
                {
                    window.alert("Wrong Password. Try again");
                    $("#pass").val('');
                    $("#pass").focus();
                }
            });
        } 
        else 
        {
            window.alert("Please enter your password");
        }
    });//User DELETE account
    
    
});
	
	

