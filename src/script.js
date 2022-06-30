function currentWeather(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_appid}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}
  function changeToCelsius() {
    temp.forEach(
      (element) =>
        (element.innerHTML = Math.round((element.innerHTML - 32) / 1.8))
    );
    units = "metric";
    scale.forEach((element) => (element.innerHTML = "°C"));
    celsius.removeEventListener("click", changeToCelsius);
    fahrenheit.addEventListener("click", changeToFahrenheit);
  }
  function changeToFahrenheit() {
    temp.forEach(
      (element) => (element.innerHTML = Math.round(element.innerHTML * 1.8 + 32))
    );
    units = "imperial";
    scale.forEach((element) => (element.innerHTML = "°F"));
    fahrenheit.removeEventListener("click", changeToFahrenheit);
    celsius.addEventListener("click", changeToCelsius);
  }
  function currentTime(timezone){
    let now = new Date();
    let currentTime = document.querySelector("#current-time");
    let dt = new Date((new Date().getTime())+(timezone+(now.getTimezoneOffset()*60))*1000)
    let day = days[dt.getDay()];
    let month = months[dt.getMonth()];
    let minutes=dt.getMinutes();
    let houres = dt.getHours();
    if (minutes<10){
     minutes = `0${minutes}`;
    }
    if(houres<10){
     houres = `0${houres}`;
    }
    currentTime.innerHTML = `Local time:<br>${day}, ${dt.getDate()} ${month} ${houres}:${minutes}`;  
  }
  
  function showTemperature(response) {

    currentTime(response.data.timezone);
    interval = setInterval(currentTime,1000,response.data.timezone);

    let currentTemp = document.querySelector("#current-temperature");
    let currentWind = document.querySelector("#current-wind");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    currentWind.innerHTML = Math.round(response.data.wind.speed);
    let current_emoji = document.querySelector("#current-emoji");
    let current_min_temp = document.querySelector("#current-min-temp");
    current_min_temp.innerHTML = Math.round(response.data.main.temp_min);
    let current_max_temp = document.querySelector("#current-max-temp");
    current_max_temp.innerHTML = Math.round(response.data.main.temp_max);
    current_emoji.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt="${response.data.weather[0].main}" width=80>`;
    forecast(response.data.coord);
  }
  function showForecastHTML(){
    
    
  }
  function showForecast(response) {
    
    let response_data = response.data.daily;
    let forecast_element = document.querySelector("#forecast");
    let forecastHTML = `<div class="row d-flex justify-content-center">`;
    let now = new Date();
    let tomorrow = new Date(now);
    response_data.shift();
    response_data.forEach(function (el, day){
      tomorrow.setDate(tomorrow.getDate() + 1);
      forecastHTML = forecastHTML + `<div class="col-auto">
      <div class="forecast">
        <h6 class="week-day">${
        days[tomorrow.getDay()]
      }, ${tomorrow.getDate()} ${months[tomorrow.getMonth()]}</h6>
        <h2>
          <span class="temperature forecast-temp">${Math.round(response_data[day].temp.day)}</span
          ><span class="temperature-scale">°C</span>
        </h2>
        <h1 class="clouds-emoji"><img src="https://openweathermap.org/img/wn/${response_data[day].weather[0].icon}@2x.png" alt="${response_data[day].weather[0].main}" width=60></h1>
        <p>
          Max: ${Math.round(response_data[day].temp.max)}<span class="temperature-scale">°C</span> <br />

          Min: ${Math.round(response_data[day].temp.min)}<span class="temperature-scale">°C</span> <br />

          Wind: ${Math.round(response_data[day].wind_speed)} km/h
        </p>
      </div>
    </div>`;
    });
    forecastHTML=forecastHTML+`</div>`
    forecast_element.innerHTML=forecastHTML;
  }
  
  function forecast(coordinates) {
    let forecastApiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,hourly,minutely,alerts&appid=${weather_appid}&units=${units}`
    axios.get(forecastApiURL).then(showForecast);
    axios.get(forecastApiURL).catch((data, status) => {
      console.log("Something is wrong");
    });
  }
  function showCurrentLocation() {
    fetch("https://extreme-ip-lookup.com/json/?key=RwmHPc7UO6BPu8h9UQkb")
      .then((res) => res.json())
      .then((response) => {
        let currentCity = document.querySelector("#current-city");
        currentCity.innerHTML = response.city;
        currentWeather(response.city);
      })
      .catch((data, status) => {
        alert("Please type a city");
      });
  }
  
  function search(event) {
    clearInterval(interval);
    event.preventDefault();
    let current_city = document.querySelector("#current-city");
    let search_field = document.querySelector(".searchField");
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search_field.value}&appid=${weather_appid}&units=${units}`;
    axios
      .get(apiUrl)
      .then(showTemperature)
      .then((current_city.innerHTML = search_field.value))
    axios.get(apiUrl).catch((data, status) => {
      alert("Please type correct city");
      showCurrentLocation();
    });
    search_field.value= "";
  }
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  showCurrentLocation();
  showForecastHTML();
  
  let weather_appid = "c558530bb05c403b5dd2f204254ec041";
  let units = "metric";
  let temp = document.querySelectorAll(".temperature");
  let scale = document.querySelectorAll(".temperature-scale");
  let fahrenheit = document.querySelector("#fahrenheit");
  let celsius = document.querySelector("#celsius");
  
  fahrenheit.addEventListener("click", changeToFahrenheit);
  
  let currentLocation = document.querySelector("#current-location-button");
  currentLocation.addEventListener("click", showCurrentLocation);
  
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let interval = null;