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