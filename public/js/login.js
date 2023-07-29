
var emails = document.getElementById('loginBtn').addEventListener("click", validateEmail);
function validateEmail() {
    if (emails == "") {
        document.getElementById('emailtext').innerHTML = " ** Please fill the username field";
        return false;
    }
}