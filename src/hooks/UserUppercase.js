export function useUppercase(str) {
  let firstName = str[0];
  let remainingName = str.substring(1);
  let sentence = firstName.toUpperCase() + remainingName.toLowerCase();
  return sentence;
}
