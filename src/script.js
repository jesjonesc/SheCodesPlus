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
    
    
  }
  function showForecast(response) {
    
    let response_data = response.data.daily;
    let forecast_element = document.querySelector("#forecast");
    let forecastHTML = `<div class="row d-flex justify-content-center">`;
    let tomorrow = new Date(now);
    response_data.shift();
    response_data.forEach(function (el, day){
      tomorrow.setDate(tomorrow.getDate() + 1);
      console.log(response_data[day]);
      forecastHTML = forecastHTML + `<div class="col-4 col-lg-2 col-sm-3">
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
          Max: <span class="temperature max-temp">${Math.round(response_data[day].temp.max)}</span
          ><span class="temperature-scale">°C</span> <br />

          Min: <span class="temperature min-temp">${Math.round(response_data[day].temp.min)}</span
          ><span class="temperature-scale">°C</span> <br />

          Wind: <span class="wind">${Math.round(response_data[day].wind_speed)}</span> km/h
        </p>
      </div>
    </div>`;
    });
    forecastHTML=forecastHTML+`</div>`
    forecast_element.innerHTML=forecastHTML;
  }
  
  function forecast(coordinates) {
    let forecastApiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,hourly,minutely,alerts&appid=${weather_appid}&units=${units}`
    console.log(forecastApiURL);
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
  