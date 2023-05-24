import getPassword from "./password.js";
// if a textbox is clicked
if (isTextboxClicked()) {
  // get the password
  const password = getPassword();
  // get the active element
  const activeElement = document.activeElement;
  // set the value of the active element to the password
  activeElement.value = password;
}
