let now = new Date();
let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Satuday']
let day = days[now.getUTCDay()];
let date = now.getDate();
let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December']
let month = months[now.getUTCMonth()];
let year = now.getFullYear();
let hours = now.getUTCHours();
let minutes = now.getUTCMinutes();

hours = (hours < 10) ? '0' + hours : hours;
minutes = (minutes < 10) ? '0' + minutes : minutes;

let currentDate = document.querySelector("#current_date");
currentDate.innerHTML = ` ${hours}:${minutes} ${day}, ${date} ${month} ${year} year `; //  пятница, 2 сентября 


// weather for a week


// Search City + Weather after the user submits the form.
function showWeather(response){
      console.log(response.data);

    temperatureCelsius = response.data.main.temp;
  
    document.querySelector("#current_town").innerHTML = response.data.name;
    document.querySelector('#temperature').innerHTML = Math.round(response.data.main.temp);
    document.querySelector('#description').innerHTML = response.data.weather[0].main;
    document.querySelector('#speed').innerHTML = response.data.wind.speed;
    document.querySelector('#humidity').innerHTML = response.data.main.humidity;
    document.querySelector('#deg').innerHTML = response.data.wind.deg;
    document.querySelector('#max').innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector('#min').innerHTML = Math.round(response.data.main.temp_min);
    document.querySelector('#pressure').innerHTML = response.data.main.pressure;
    document.querySelector('#emoji').setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    
    getForecast(response.data.coord);
    }


    function dayFormat(timestamp) {
      let date = new Date(timestamp * 1000);
      let day = date.getDay();
      let days = [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
      ];
      return days[day];
    }

    function getForecast(coordinates) {
    //  console.log(coordinates);
      let units = 'metric';
      let apiKey = '6a0bac9dced487830ce6066218a5481c';
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(displayForecast);
  }
  
    function searchCity(city) {
      let units = "metric";
      let apiKey = '6a0bac9dced487830ce6066218a5481c';
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(showWeather);
  }
  function showCity(event) {
    event.preventDefault();
    let city = document.querySelector("#input_city").value;
    searchCity(city);
   }
       
let form = document.querySelector("#form_city");
  form.addEventListener("submit", showCity);
  
  searchCity('Berlin');
  
  
     // geolocation
  
  function showLocation(position) {
    let currentLatitude = position.coords.latitude;
    let currentLongitude = position.coords.longitude;
    let units = "metric";
    let apiKey = '6a0bac9dced487830ce6066218a5481c';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }
  function getCurrentLocation(event) {
      event.preventDefault();
      navigator.geolocation.getCurrentPosition(showLocation);
  }
  let currentLocationButton = document.querySelector('#geolocation');
  currentLocationButton.addEventListener('click', getCurrentLocation);

// temperature in Celsius and Fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureFarhrenheit = (temperatureCelsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(temperatureFarhrenheit);
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let temperatureCelsius = null;

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(temperatureCelsius);
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function displayForecast(response){
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<ul >`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
        forecastHTML = forecastHTML + `
        <li class="week"  >
        <div class="sat">
            <div class = "forecast_date">${dayFormat(forecastDay.dt)}</div>
            <img src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt = "clear" id ="emoji"/>
            <div class = "forecast_temperature">
                <span id= "temperature">min ${Math.round(forecastDay.temp.min)}C°</span>
                <span class = "temperature_max">max ${Math.round(forecastDay.temp.max)}C°</span>
            </div>
        </div>
        </li>`
        };
});
forecastHTML = forecastHTML + `</ul>`;
forecastElement.innerHTML = forecastHTML;
}
displayForecast();