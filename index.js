function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return `Last Updated: ${day}, ${hour}:${minutes}`;
}

let timeHeading = document.querySelector("#current-date");
let now = new Date();
timeHeading.innerHTML = formatDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.time
            )}</div>
            <img
              class="weather-forecast-icon"
              src= ${forecastDay.condition.icon_url}
              alt="Weather icon"
              width = "50"
              height = "40"
            />
            <div class="weather-forecast-temp">
              <span class="weather-forecast-temp-max">${Math.round(
                forecastDay.temperature.maximum
              )}°</span> |
              <span class="weather-forecast-temp-min">${Math.round(
                forecastDay.temperature.minimum
              )}°</span>
            </div>
          </div>
        `;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "ebt34064724a3a2573a40cf101o5b283";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function currentTemp(response) {
  celsiusTemperature = Math.round(response.data.temperature.current);

  let h1 = document.querySelector("#city-name");
  h1.innerHTML = response.data.city;

  let h3 = document.querySelector("#current-temp");
  h3.innerHTML = celsiusTemperature;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  icon.setAttribute("src", response.data.condition.icon_url);

  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} m/H`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  getForecast(response.data.city);
}

function citySearch(city) {
  let apiKey = "ebt34064724a3a2573a40cf101o5b283";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  citySearch(city.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = celsiusTemperature;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let search = document.querySelector("#search-bar");
search.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

citySearch("London");
