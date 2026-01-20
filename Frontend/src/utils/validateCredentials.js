export function validateCredentials(email, password) {
  const result = {
    isEmailValid: false,
    isPasswordStrong: false,
    message: ""
  };

  if (!email.trim() || !password.trim()) {
    result.message = "Email or password is missing.";
    return result;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  result.isEmailValid = emailRegex.test(email);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  result.isPasswordStrong = passwordRegex.test(password);

  if (!result.isEmailValid) {
    result.message = "Invalid email format.";
  } else if (!result.isPasswordStrong) {
    result.message = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
  } else {
    result.message = "Credentials are valid.";
  }

  return result;
}
