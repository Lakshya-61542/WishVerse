export function authErrorMessage(error) {
  const message = (error?.message || "").toLowerCase();

  if (message.includes("invalid login credentials")) {
    return "The email or password is incorrect.";
  }
  if (message.includes("email not confirmed")) {
    return "Please confirm your email before signing in.";
  }
  if (message.includes("user already registered")) {
    return "An account with this email already exists. Try signing in instead.";
  }
  if (message.includes("password should be at least")) {
    return "Use a password with at least 8 characters.";
  }
  if (message.includes("rate limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (message.includes("provider is not enabled")) {
    return "Google sign-in is not enabled yet. Enable Google in Supabase Authentication → Providers.";
  }
  if (message.includes("signup is disabled")) {
    return "New account creation is temporarily unavailable.";
  }

  return error?.message || "Something went wrong. Please try again.";
}
