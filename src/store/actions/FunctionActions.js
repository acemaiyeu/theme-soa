export function convertDateTime(input) {
  const date = new Date(input);
  const pad = (n) => n.toString().padStart(2, "0");

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
}
export function convertTextToMoneyInput(input) {
  if (input === null || input === undefined) return "";

  const str = input.toString().replace(/\D/g, ""); // Loại bỏ ký tự không phải số
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function convertMoneyInputToText(input) {
  if (input === null || input === undefined) return "";

  const str = input.toString().replaceAll(".", "");
  return str;
}
