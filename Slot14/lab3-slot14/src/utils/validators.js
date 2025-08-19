export const isEmail = (s) => /\S+@\S+\.\S+/.test(s);

export function isStrongPassword(pw) {
  if (!pw) return false;
  const lengthOK = pw.length >= 8;
  const upperOK = /[A-Z]/.test(pw);
  const numberOK = /\d/.test(pw);
  const specialOK = /[^A-Za-z0-9]/.test(pw);
  return lengthOK && upperOK && numberOK && specialOK;
}
