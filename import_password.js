import getPassword from "./password.js";
import { saveMasterPassword } from "./password.js";

document.getElementById("getPasswordButton").addEventListener("click", () => {
  document.getElementById("password").innerHTML = getPassword();
});

document.getElementById("setPasswordButton").addEventListener("click", () => {
  saveMasterPassword();

  // alert the user of the saved password stored in chrome storage as 'masterPassword'
  alert("Master Password Saved");
  // alert master password for testing purposes
  chrome.storage.sync.get(["masterPassword"], function (data) {
    var masterPassword = data.masterPassword;

    alert(masterPassword);
  });
});
