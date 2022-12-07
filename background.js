// create a string to hold the resultant password of length 30
let password = "";

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
      const popupMenu = document.createElement("div");
      popupMenu.style.position = "absolute";
      // make an input field for the user to enter a new password
      const inputField = input.getBoundingClientRect();
      popupMenu.style.left = inputField.left + "px";
      popupMenu.style.top = inputField.bottom + "px";
      popupMenu.style.backgroundColor = "white";
      popupMenu.style.border = "1px solid black";
      popupMenu.style.padding = "10px";
      popupMenu.width = "200px";
      popupMenu.height = "125px";
      popupMenu.style.borderRadius = "5px";

      // create a title
      const title = document.createElement("h3");
      title.innerHTML = "Create a new password for this site";

      // create an add password button
      const addPasswordButton = document.createElement("button");
      addPasswordButton.innerHTML = "Add Password";

      // create a button to close the popupDiv
      const closeButton = document.createElement("button");
      closeButton.innerHTML = "Shut the fuck up!!";

      const { passwords } = await chrome.storage.sync.get("passwords");
      const pagePassword = passwords.find(
        (password) => password.url === location.href
      );

      // if there is a saved password for the current page
      if (pagePassword) {
        // change the title and button text to reflect the saved password
        title.innerHTML = "Saved Password";
        addPasswordButton.innerHTML = "Accept Saved Password";
        closeButton.innerHTML = "Shut the fuck up!!";

        // add elements to popupDiv and popupDiv to the page
        popupMenu.appendChild(title);
        popupMenu.appendChild(addPasswordButton);
        popupMenu.appendChild(closeButton);
        document.body.appendChild(popupMenu);

        // accept the saved password when the button is clicked
        addPasswordButton.addEventListener("click", () => {
          input.value = pagePassword.password;
          popupMenu.style.display = "none";

          // send the user a notification
          chrome.notifications.create("You got this!", {
            type: "basic",
            iconUrl: "happy.png",
            title: "Just wanted to remind you",
            message: "How great you are!",
            contextmessage: "Your new password is: " + password,
            priority: 2,
          });
        });

        // close the popupDiv when the close button is clicked
        closeButton.addEventListener("click", () => {
          popupMenu.style.display = "none";
        });
        return;
      }

      // add the popupDiv to the page
      popupMenu.appendChild(title);
      popupMenu.appendChild(addPasswordButton);
      popupMenu.appendChild(closeButton);
      document.body.appendChild(popupMenu);

      // add a click listener to the add password button
      addPasswordButton.addEventListener("click", () => {
        // change the password field to the new password

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
        // extra stuff at the beginning of password: [object HTMLInputElement]
        password = password.slice(24);

        // save the password to chrome storage
        passwords.push({ url: location.href, password: password });
        chrome.storage.sync.set({ passwords });

        // set the input field to the new password
        input.value = password;

        // send the user a notification of the new password with id of "New Password"
        chrome.notifications.create("New Password${Date.now()}", {
          type: "basic",
          iconUrl: "happy.png",
          title: "New Password",
          message: "Your new password is: " + password,
          contextmessage: "Your new password is: " + password,
          priority: 2,
        });
      });

      closeButton.addEventListener("click", () => {
        popupMenu.style.display = "none";
      });
    }
  }
};
