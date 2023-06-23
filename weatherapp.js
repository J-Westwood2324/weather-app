function currentTemp(response) {
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = response.city;
  let h3 = document.querySelector("#current-temp");
  h3.innerHTML = `${Math.round(response.temperature.current)}`;
  let description = document.querySelector("#description");
  description.innerHTML = response.condition.description;
  let icon = document.querySelector("#icon");
  icon.innerHTML = response.condition.icon_url;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind speed: ${Math.round(response.wind.speed)} m/H`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.temperature.humidity}%`;
  celciusTemp = response.data.main.temp;
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input".value);
  let apiKey = "debt34064724a3a2573a40cf101o5b283";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(currentTemp);
}

let search = document.querySelector("#search-bar");
search.addEventListener("submit", citySearch);

let celciusTemp = null;

function showTemp(response) {
  let heading = document.querySelector("h1");
  heading.innerHTML = response.data.name;
  let locationTemp = document.querySelector("h3");
  locationTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind speed: ${Math.round(response.data.wind.speed)} Km/H`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  celciusTemp = response.data.main.temp;
}

function displayFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  tempElement.innerHTML = Math.round(celciusTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displayCelcius);

navigator.geolocation.getCurrentPosition(showPosition);
let currentPosition = document.querySelector("#current-position");
currentPosition.addEventListener("click", showPosition);
citySearch("new york");
