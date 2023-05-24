export function randomCharacters(numCharacters) {
  // create a string to hold the result of length 30
  let password = "";
  // create a string of all possible characters
  const choices =
    "abcdefghijklmnopqrstvxyzABCDEFGHIKLMNOPQRSTVXYZ0123456789!@#$%^&*()-=_+`~|\\?/\"><.,'*][{};:";
  // get the length of the choices string
  const size = numCharacters.length;
  // loop size times
  for (let i = 0; i < size; i++) {
    // get a random number between 0 and size
    const randInt = Math.floor(Math.random() * size);
    // append the character at the random index to the password string
    password += choices[randInt];
  }
  // return the password string
  return password;
}

// call 'password' using ccall and return the result
export default function getPassword() {
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
  // return the password string
  return password;
}

// exported function to encrypt then save the encrypted master password to chrome storage
export function saveMasterPassword() {
  var password = document.getElementById("masterPasswordInput").value;

  // if the password is empty, alert the user
  if (password === "") {
    alert("Please enter a password");
    return;
  }

  // use getPassword() to get a random beginning for password
  var beginHash = getPassword();
  var endHash = getPassword();
  // save beginHash and endHash to chrome storage
  chrome.storage.sync.set({ beginHash: beginHash });
  chrome.storage.sync.set({ endHash: endHash });
  // hash the password
  password = crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(password)
  );
  // hash the beginning and end of the password
  beginHash = crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(beginHash)
  );
  endHash = crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(endHash)
  );
  // combine the password with the beginning and end of the password
  password = beginHash + password + endHash;
  // save the password to chrome storage
  chrome.storage.sync.set({ masterPassword: password });
  return password;
}
