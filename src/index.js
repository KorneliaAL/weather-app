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
function formatDay(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm text-center">
                <div class="weather-prediction">
                  <h5 class="card-title monday">${formatDay(forecastDay.dt)}
                  </h5>
                  <div class="emoji"><img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt="#" class="forecast-icon" id="forecast-icon" /></div>
                  <p class="card-text forecast-temp">${Math.round(
                    forecastDay.temp.max
                  )}℃/<span class="temp-min">${Math.round(
          forecastDay.temp.min
        )}℃</span></p>
                </div>
              </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "05aff18b41fdd75e383a4a70b93dcde4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayWeather(response) {
  let icon = document.querySelector("#current-icon");
  celsiusTemp = Math.round(response.data.main.temp);
  document.querySelector(
    "#current-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#current-temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "70f46e7b374a41958649bba5f746057f";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}
function searchCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "05aff18b41fdd75e383a4a70b93dcde4";
  let units = "metric";
  let apiWeb = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiWeb).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
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

let searchNewCity = document.querySelector("#search-form");
searchNewCity.addEventListener("submit", showCity);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Oslo");
