export function formatRegisterError(err) {
  let message = err.message;
  if (err.code === "auth/weak-password") {
    message = "Password should be at least 6 characters";
  }
  if (err.code === "auth/invalid-email") {
    message = "Email already registered";
  }
  throw new Error(message);
}
export function formatLoginError(err) {
  let message = err.message;
  if (err.code === "auth/invalid-email") {
    message = "Something wrong with email";
  }
  if (err.code === "auth/wrong-password") {
    message = "Credentials are not valid";
  }
  throw new Error(message);
}
export function formatGoogleLoginError(err) {
  let message = err.message;
  if (err.code === "auth/popup-closed-by-user") {
    message = "Pop up closed by user";
  }
  if (err.code === "auth/unauthorized-comain") {
    message = "Credentials are not valid";
  }
  return message;
}
