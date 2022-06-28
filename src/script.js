function currentWeather(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_appid}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
    forecast(city);
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
    if (response.data.clouds.all < 20) {
      if (response.data.weather[0].main === "Rain") {
        current_emoji.innerHTML = "🌧";
        console.log("hi");
      }
      current_emoji.innerHTML = "☀️";
    } else if (response.data.clouds.all > 20 && response.data.clouds.all < 80) {
      current_emoji.innerHTML = "🌤";
    } else {
      current_emoji.innerHTML = "☁️";
    }
  }
  function showForecast(response) {
    let forecast_temp = document.querySelectorAll(".forecast-temp");
    let forecast_min_temp = document.querySelectorAll(".min-temp");
    let forecast_max_temp = document.querySelectorAll(".max-temp");
    let forecast_wind = document.querySelectorAll(".wind");
    let new_day = new Date(now);
    let clouds_emoji = document.querySelectorAll(".clouds-emoji");
    let new_month = null;
    let new_date = null;
    for (let i = 0; i < 5; i++) {
      new_day.setDate(new_day.getDate() + 1);
  
      if (new_day.getMonth() < 9) {
        new_month = `0${new_day.getMonth() + 1}`;
      } else {
        new_month = new_day.getMonth() + 1;
      }
      if (new_day.getDate() < 10) {
        new_date = `0${new_day.getDate()}`;
      } else {
        new_date = new_day.getDate();
      }
      response.data.list.forEach(function (day, index) {
        if (
          response.data.list[index].dt_txt ===
          `${new_day.getFullYear()}-${new_month}-${new_date} 12:00:00`
        ) {
          forecast_temp[i].innerHTML = Math.round(
            response.data.list[index].main.temp
          );
          forecast_wind[i].innerHTML = Math.round(
            response.data.list[index].wind.speed
          );
  
          let min_temp = [];
          let max_temp = [];
          for (let j = 0; j < 8; j++) {
            min_temp[j] = response.data.list[index - 4 + j].main.temp_min;
          }
          for (let j = 0; j < 8; j++) {
            max_temp[j] = response.data.list[index - 4 + j].main.temp_max;
          }
  
          forecast_min_temp[i].innerHTML = Math.round(Math.min(...min_temp));
          forecast_max_temp[i].innerHTML = Math.round(Math.max(...max_temp));
          if (response.data.list[index].clouds.all > 80) {
            if (response.data.list[index].weather.main === "Rain") {
              clouds_emoji[i].innerHTML = "🌧";
            }
            clouds_emoji[i].innerHTML = "☁️";
          } else if (
            response.data.list[index].clouds.all > 20 &&
            response.data.list[index].clouds.all < 80
          ) {
            clouds_emoji[i].innerHTML = "🌤";
          } else {
            clouds_emoji[i].innerHTML = "☀️";
          }
        }
      });
    }
  }
  function forecast(city_name) {
    let forecastApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${weather_appid}&units=${units}`;
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
      .then(forecast(search_field.value));
    axios.get(apiUrl).catch((data, status) => {
      alert("Please type correct city");
      showCurrentLocation();
    });
  }
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  showCurrentLocation();
  
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
  currentTime.innerHTML = `${day}, ${now.getDate()} ${month}`;
  
  let tomorrow = new Date(now);
  let weekDay = document.querySelectorAll(".week-day");
  
  weekDay.forEach(function (day, index) {
    tomorrow.setDate(tomorrow.getDate() + 1);
    weekDay[index].innerHTML = `${
      days[tomorrow.getDay()]
    }, ${tomorrow.getDate()} ${months[tomorrow.getMonth()]}`;
  });
  