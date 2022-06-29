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
  function showTemperature(response) {
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
    let forecast_element = document.querySelector("#forecast");
    let forecastHTML = `<div class="row d-flex justify-content-center">`;
    for(i=0;i<6;i++){
      forecastHTML = forecastHTML + `<div class="col-4 col-md-3 col-lg-2">
      <div class="forecast">
        <h6 class="week-day"></h6>
        <h2>
          <span class="temperature forecast-temp"></span
          ><span class="temperature-scale">°C</span>
        </h2>
        <h1 class="clouds-emoji"></h1>
        <p>
          Max: <span class="temperature max-temp"></span
          ><span class="temperature-scale">°C</span> <br />

          Min: <span class="temperature min-temp"></span
          ><span class="temperature-scale">°C</span> <br />

          Wind: <span class="wind"></span> km/h
        </p>
      </div>
    </div>`;
    }
    forecastHTML=forecastHTML+`</div>`
    forecast_element.innerHTML=forecastHTML;
    
  }
  function showForecast(response) {
    let forecast_temp = document.querySelectorAll(".forecast-temp");
    let forecast_min_temp = document.querySelectorAll(".min-temp");
    let forecast_max_temp = document.querySelectorAll(".max-temp");
    let forecast_wind = document.querySelectorAll(".wind");
    let clouds_emoji = document.querySelectorAll(".clouds-emoji");
    forecast_temp.forEach(function(el,day){
      let response_data = response.data.daily[day];
          forecast_temp[day].innerHTML = Math.round(response_data.temp.day);
          forecast_wind[day].innerHTML = Math.round(response_data.wind_speed);
          forecast_min_temp[day].innerHTML = Math.round(response_data.temp.min);
          forecast_max_temp[day].innerHTML = Math.round(response_data.temp.max);
          clouds_emoji[day].innerHTML = `<img src="https://openweathermap.org/img/wn/${response_data.weather[0].icon}@2x.png" alt="${response_data.weather[0].main}" width=60>`;
    
    }
  )}
  function forecast(coordinates) {
    let forecastApiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely&appid=${weather_appid}&units=${units}`
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
  
  let now = new Date();
  
  let currentTime = document.querySelector("#current-time");
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  currentTime.innerHTML = `Last updated:<br>${day}, ${now.getDate()} ${month} ${now.getHours()}:${now.getMinutes()}`;
  
  let tomorrow = new Date(now);
  let weekDay = document.querySelectorAll(".week-day");
  
  weekDay.forEach(function (day, index) {
    tomorrow.setDate(tomorrow.getDate() + 1);
    weekDay[index].innerHTML = `${
      days[tomorrow.getDay()]
    }, ${tomorrow.getDate()} ${months[tomorrow.getMonth()]}`;
  });
  