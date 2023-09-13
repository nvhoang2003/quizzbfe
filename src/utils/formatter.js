export function formatNumber(number) {
  return number.toLocaleString(); // ví dụ định dạng số
}

export function formatDate(date) {
  return new Date(date).toISOString().slice(0, 10); // ví dụ định dạng ngày tháng
}

export function capitalizeFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}
