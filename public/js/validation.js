

var user = document.getElementById('name').value;
var pass = document.getElementById('Password1').value;
var confirmpass = document.getElementById('Password2').value;
var mobileNumber = document.getElementById('phoneNo').value;
var emails = document.getElementById('email').value;


if (user == "") {
    document.getElementById('name1').innerHTML = " ** Please fill the username field";
    return false;
}
if ((user.length <= 2) || (user.length > 20)) {
    document.getElementById('name1').innerHTML = " ** Username lenght must be between 2 and 20";
    return false;
}
if (!isNaN(user)) {
    document.getElementById('name1').innerHTML = " ** only characters are allowed";
    return false;
}







if (pass == "") {
    document.getElementById('Password11').innerHTML = " ** Please fill the password field";
    return false;
}
if ((pass.length <= 5) || (pass.length > 20)) {
    document.getElementById('Password11').innerHTML = " ** Passwords lenght must be between  5 and 20";
    return false;
}


if (pass != confirmpass) {
    document.getElementById('Password21').innerHTML = " ** Password does not match the confirm password";
    return false;
}



if (confirmpass == "") {
    document.getElementById('Password11').innerHTML = " ** Please fill the confirmpassword field";
    return false;
}




if (mobileNumber == "") {
    document.getElementById('phoneNo1').innerHTML = " ** Please fill the mobile NUmber field";
    return false;
}
if (isNaN(mobileNumber)) {
    document.getElementById('phoneNo1').innerHTML = " ** user must write digits only not characters";
    return false;
}
if (mobileNumber.length != 10) {
    document.getElementById('phoneNo1').innerHTML = " ** Mobile Number must be 10 digits only";
    return false;
}



if (emails == "") {
    document.getElementById('email1').innerHTML = " ** Please fill the email idx` field";
    return false;
}
if (emails.indexOf('@') <= 0) {
    document.getElementById('email1').innerHTML = " ** @ Invalid Position";
    return false;
}

if ((emails.charAt(emails.length - 4) != '.') && (emails.charAt(emails.length - 3) != '.')) {
    document.getElementById('email1').innerHTML = " ** . Invalid Position";
    return false;
}
