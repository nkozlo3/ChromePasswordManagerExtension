chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ passwords: [] });
});

chrome.webNavigation.onCompleted.addListener(({ tabId, frameId }) => {
  if (frameId !== 0) return;

  chrome.scripting.executeScript({
    target: { tabId },
    function: newPageLoad,
  });
});

// on new page load or tab change
const newPageLoad = async () => {
  // get all password fields
  let inputFields = document.getElementsByTagName("input");

  // get the first password field
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields.item(i).type === "password") {
      const input = inputFields.item(i);
      // create a popupDiv centered under the first password field
      const popupDiv = document.createElement("div");
      popupDiv.style.position = "absolute";
      // make an input field for the user to enter a new password
      const inputField = input.getBoundingClientRect();
      popupDiv.style.left = inputField.left + "px";
      popupDiv.style.top = inputField.bottom + "px";
      popupDiv.style.backgroundColor = "white";
      popupDiv.style.border = "1px solid black";
      popupDiv.style.padding = "10px";
      popupDiv.width = "200px";
      popupDiv.height = "125px";
      popupDiv.style.borderRadius = "5px";

      // create a title
      const title = document.createElement("h3");
      title.innerHTML = "Create a new password for this site";
      popupDiv.appendChild(title);

      // create an add password button
      const addPasswordButton = document.createElement("button");
      addPasswordButton.innerHTML = "Add Password";
      popupDiv.appendChild(addPasswordButton);

      // create a button to close the popupDiv
      const closeButton = document.createElement("button");
      closeButton.innerHTML = "Fuck off!!";
      popupDiv.appendChild(closeButton);

      // add the popupDiv to the page
      document.body.appendChild(popupDiv);

      // add a click listener to the add password button
      addPasswordButton.addEventListener("click", () => {
        // change the password field to the new password
        // create a string to hold the result of length 30
        let password = "";
        // create a string of all possible characters
        const choices =
          "abcdefghijklmnopqrstvxyzABCDEFGHIKLMNOPQRSTVXYZ0123456789!@#$%^&*()-=_+`~|\\?/\"><.,'*][{};:";
        // get the length of the choices string
        const size = choices.length;
        // loop 30 times
        for (let i = 0; i < 30; i++) {
          // get a random number between 0 and size
          const randInt = Math.floor(Math.random() * size);
          // append the character at the random index to the password string
          password += choices[randInt];
        }
        input.value = password;
        // alert the user of the new password
        alert("Your new password is: " + password);
      });

      closeButton.addEventListener("click", () => {
        popupDiv.style.display = "none";
      });
    }
  }
};
