import getPassword from "./password.js";

document.getElementById("getPasswordButton").addEventListener("click", () => {
  document.getElementById("password").innerHTML = getPassword();
});
