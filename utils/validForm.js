const valid = (
  firstName,
  lastName,
  userName,
  passWord,
  cfPassWord,
  email,
  phoneNumber
) => {
  if (
    !firstName ||
    !lastName ||
    !userName ||
    !passWord ||
    !cfPassWord ||
    !email ||
    !phoneNumber
  )
    return "Please enter information";
  if (!validateEmail(email)) return "Invalid emails.";
  if (passWord.length < 6) return "Password must be at least 6 characters";
  if (passWord !== cfPassWord) return "Confirm password did not match.";
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};
export default valid;
