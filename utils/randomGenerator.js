export function generateTrialPassword(companyName) {
  // clean company name (first word only)
  const cleanName = companyName
    .trim()
    .split(" ")[0]
    .replace(/[^a-zA-Z]/g, "");

  const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4 digits
  const symbols = "@#$_!";
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z

  return `${cleanName}${randomSymbol}${randomNumber}${randomChar}`;
}
