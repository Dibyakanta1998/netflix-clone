export const checkValidData = (
  email: string = "",
  password: string = ""
): string | null => {
  const isEmailVaid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailVaid) return "Email ID is not Valid";
  if (!isPasswordValid) return "Password is not Valid";

  return null;
};
