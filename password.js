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

function randomCharacters(numCharacters) {
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

// exported function to encrypt then save the encrypted master password to chrome storage
export function saveMasterPassword() {
  // get the master password from password.html file's input field with the id of 'masterPasswordInput'
  const password = document.getElementById("masterPasswordInput").value;

  // check if the password is empty
  if (password === "") {
    // alert the user that the password cannot be empty
    alert("Password cannot be empty");
    // return
    return;
  }

  // salt the password by adding random characters to the beginning and end of the password
  password = randomCharacters(17) + password + randomCharacters(21);
  // now hash the salted password
  password = CryptoJS.SHA512(password);

  return password;
}
