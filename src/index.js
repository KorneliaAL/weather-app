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
function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function searchCity(city) {
  let apiKey = "70f46e7b374a41958649bba5f746057f";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}


function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${city}`;
  searchCity(city);
}

let date = document.querySelector("#weather-date");
date.innerHTML = formatDate();
