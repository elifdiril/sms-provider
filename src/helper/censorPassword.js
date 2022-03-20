const censorPassword = (passwordLength) => {
  let result = "";
  for (let index = 0; index < passwordLength; index++) {
    result += "*";
  }
  return result;
};

export default censorPassword;