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

let celciusTemp = null;

function currentTemp(response) {
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = response.data.city;

  let h3 = document.querySelector("#current-temp");
  h3.innerHTML = `${Math.round(response.data.temperature.current)}`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  icon.setAttribute("src", response.data.condition.icon_url);

  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} m/H`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  celciusTemp = Math.round(response.data.temperature.current);
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let apiKey = "ebt34064724a3a2573a40cf101o5b283";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(currentTemp);
}

let search = document.querySelector("#search-bar");
search.addEventListener("submit", citySearch);
