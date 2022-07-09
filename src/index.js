function formatDate(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let nowDate = new Date();
  let day = days[nowDate.getDay()];
  let hour = nowDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = nowDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let clock = `${hour}:${minute}`;
  let fullDate = `${day} ${clock}`;
  return fullDate;
}
let date = document.querySelector("#weather-date");
date.innerHTML = formatDate();
