import getPassword from "./password.js";

// call getPassword and log the result
// call getPassword and make it the header of the page
//<button id="getPasswordButton">Get Password</button>
// if the above button from password.html is clicked, call getPassword
// and make it the header of the page
document.getElementById("getPasswordButton").addEventListener("click", () => {
  document.getElementById("password").innerHTML = getPassword();
});