// add a listener to tabId and changeInfo
chrome.webNavigation.onCompleted.addListener(
  ({ tabId, changeInfo, frameId }) => {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: newPageLoad,
    });
  }
);

// on new page load or tab change
const onUpdated = async () => {
  // find input fields
  let inputs = document.getElementsByName("input");

  // loop through input fields
  for (let i = 0; i < inputs.length; i++) {
    // check if input field is password
    // if (inputs.item(i).type === "password") {
      // if so, put a random string in it
      // inputs.item(i).value = "Fuck off!";
      const popupDiv = document.createElement("div");
      popupDiv.style.position = "absolute";
      popupDiv.style.top = "0";
      popupDiv.style.left = "0";
      popupDiv.style.width = "100%";
      popupDiv.style.height = "100%";
      
    // }
  }
};
