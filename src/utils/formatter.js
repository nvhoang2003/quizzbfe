export function formatNumber(number) {
  return number.toLocaleString(); // ví dụ định dạng số
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString(); // ví dụ định dạng ngày tháng
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatedNullString = (value) => {
  return !value || value == null || value == "" ? "---" : value;
};

export const formatedNullDate = (value) => {
  return !value || value == null || value == ""
    ? "--/--/----"
    : new Date(value).toLocaleDateString();
};

export const formatedNullDateTime = (value) => {
  return !value || value == null || value == ""
    ? {
        date: "--/--/----",
        time: "--:--:--",
      }
    : {
        date: new Date(value).toLocaleDateString(),
        time: new Date(value).toLocaleTimeString(),
      };
};
