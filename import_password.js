import getPassword from "./password.js";
import saveMasterPassword from "./password.js";

document.getElementById("getPasswordButton").addEventListener("click", () => {
  document.getElementById("password").innerHTML = getPassword();
});

document.getElementById("setPasswordButton").addEventListener("click", () => {
  const masterPassword = saveMasterPassword();
  // save the masterPassword to chrome storage
  chrome.storage.sync.set({ masterPassword }, () => {
    alert(masterPassword);
  });
});