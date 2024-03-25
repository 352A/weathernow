// map section //

navigator.geolocation.getCurrentPosition((position) => {
  long = position.coords.longitude;
  lat = position.coords.latitude;

  var mymap = L.map("mapid").setView([lat, long], 12);
  const myKey = "9fd7e84f84626f28199be3bc384da8f9";

  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);

  var popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("Weather at " + e.latlng.toString())
      .openOn(mymap);
    latitude = e.latlng.lat;
    longitude = e.latlng.lng;

    api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${myKey}`;
    apix = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${myKey}`;

    weatherUpdate();
  }

  mymap.on("click", onMapClick);
});

// search section //

let weather = {
  apiKey: "9fd7e84f84626f28199be3bc384da8f9",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { lat, lon } = data.coord;
    const { name } = data;

    let latitude = lat;
    let longitude = lon;

    document.querySelector(".location-name").innerText = name;
    // document.querySelector(".location-temp").innerText = Math.floor(temp);

    api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${this.apiKey}`;

    weatherUpdate();
  },

  search: function () {
    this.fetchWeather(document.querySelector(".input-search-bar").value);
    document.querySelector(".input-search-bar").value = "";
  },
};

document.querySelector(".search-btn").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".input-search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

function weatherUpdate() {
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let temperatureDescription = document.querySelector(".description");
      let temperatureDegree = document.querySelector(".location-temp");
      let locationTimezone = document.querySelector(".date");
      let temperatureSection = document.querySelector(".temperature-section");
      const temperatureSpan = document.querySelector(".temperature-unit");
      const cloudsVisible = document.querySelector(".clouds");
      const humidityLevel = document.querySelector(".humidity");
      const pressureLevel = document.querySelector(".pressure");
      const uvIndex = document.querySelector(".summary-uv");
      const visibilityLevel = document.querySelector(".summary-visibility");
      const windDegree = document.querySelector(".summary-wind__degree");
      const windDir = document.querySelector(".summary-wind__direction");
      const windSpeed = document.querySelector(".summary-wind__speed");
      const feelsLike = document.querySelector(".feels-like");
      const locationTime = document.querySelector(".date");
      const maxDeg = document.querySelector(".max-deg");
      const minDeg = document.querySelector(".min-deg");
      const locationCountry = document.querySelector(".location-name");
      const maxTemp = document.querySelector(".summary-temperature__max");
      const todayMin = document.querySelector(".today-min");
      const todayMax = document.querySelector(".today-max");
      const cloudsToday = document.querySelector(".clouds-today");
      const humidityToday = document.querySelector(".humidity-today");

      const tomorrowMin = document.querySelector(".tomorrow-min");
      const tomorrowMax = document.querySelector(".tomorrow-max");
      const cloudsTomorrow = document.querySelector(".clouds-tomorrow");
      const humidityTomorrow = document.querySelector(".humidity-tomorrow");

      const thirdMin = document.querySelector(".third-min");
      const thirdMax = document.querySelector(".third-max");
      const cloudsThird = document.querySelector(".clouds-third");
      const humidityThird = document.querySelector(".humidity-third");

      const fourthMin = document.querySelector(".fourth-min");
      const fourthMax = document.querySelector(".fourth-max");
      const cloudsFourth = document.querySelector(".clouds-fourth");
      const humidityFourth = document.querySelector(".humidity-fourth");

      const fifthMin = document.querySelector(".fifth-min");
      const fifthMax = document.querySelector(".fifth-max");
      const cloudsFifth = document.querySelector(".clouds-fifth");
      const humidityFifth = document.querySelector(".humidity-fifth");

      const sixthMin = document.querySelector(".sixth-min");
      const sixthMax = document.querySelector(".sixth-max");
      const cloudsSixth = document.querySelector(".clouds-sixth");
      const humiditySixth = document.querySelector(".humidity-sixth");

      const seventhMin = document.querySelector(".seventh-min");
      const seventhMax = document.querySelector(".seventh-max");
      const cloudsSeventh = document.querySelector(".clouds-seventh");
      const humiditySeventh = document.querySelector(".humidity-seventh");

      const {
        temp,
        clouds,
        humidity,
        pressure,
        feels_like,
        wind_speed,
        wind_deg,
        uvi,
        dt,
        visibility,
      } = data.current;
      const { description, icon } = data.current.weather[0];
      const { max, min } = data.daily[0].temp;
      const { timezone } = data;

      //Set DOM elements
      temperatureDegree.textContent = Math.floor(temp);
      temperatureDescription.textContent = capitalizeFirstLetter(description);
      locationTimezone.textContent = data.timezone;
      cloudsVisible.textContent = clouds + "%";
      humidityLevel.textContent = humidity + "%";
      pressureLevel.textContent = pressure;
      windSpeed.textContent = wind_speed + " Km/h";
      windDegree.textContent = wind_deg + "°";
      uvIndex.textContent = uvi;
      feelsLike.textContent = "Feels like: " + Math.floor(feels_like) + "°";
      maxDeg.textContent = Math.floor(max) + "°";
      minDeg.textContent = Math.floor(min) + "°/";
      locationTime.textContent = timeConverter(dt);
      visibilityLevel.textContent = visibility;
      locationCountry.textContent = timezone;
      maxTemp.textContent = Math.floor(max) + "°";

      todayMin.textContent = Math.floor(data.daily[0].temp.min) + "°/";
      todayMax.textContent = Math.floor(data.daily[0].temp.max) + "°";
      cloudsToday.textContent = data.daily[0].clouds + "%";
      humidityToday.textContent = humidity + "%";

      tomorrowMin.textContent = Math.floor(data.daily[1].temp.min) + "°/";
      tomorrowMax.textContent = Math.floor(data.daily[1].temp.max) + "°";
      cloudsTomorrow.textContent = data.daily[1].clouds + "%";
      humidityTomorrow.textContent = data.daily[1].humidity + "%";

      thirdMin.textContent = Math.floor(data.daily[2].temp.min) + "°/";
      thirdMax.textContent = Math.floor(data.daily[2].temp.max) + "°";
      cloudsThird.textContent = data.daily[2].clouds + "%";
      humidityThird.textContent = data.daily[2].humidity + "%";

      fourthMin.textContent = Math.floor(data.daily[3].temp.min) + "°/";
      fourthMax.textContent = Math.floor(data.daily[3].temp.max) + "°";
      cloudsFourth.textContent = data.daily[3].clouds + "%";
      humidityFourth.textContent = data.daily[3].humidity + "%";

      fifthMin.textContent = Math.floor(data.daily[4].temp.min) + "°/";
      fifthMax.textContent = Math.floor(data.daily[4].temp.max) + "°";
      cloudsFifth.textContent = data.daily[4].clouds + "%";
      humidityFifth.textContent = data.daily[4].humidity + "%";

      sixthMin.textContent = Math.floor(data.daily[5].temp.min) + "°/";
      sixthMax.textContent = Math.floor(data.daily[5].temp.max) + "°";
      cloudsSixth.textContent = data.daily[5].clouds + "%";
      humiditySixth.textContent = data.daily[5].humidity + "%";

      seventhMin.textContent = Math.floor(data.daily[6].temp.min) + "°/";
      seventhMax.textContent = Math.floor(data.daily[6].temp.max) + "°";
      cloudsSeventh.textContent = data.daily[6].clouds + "%";
      humiditySeventh.textContent = data.daily[6].humidity + "%";

      //Set icon
      setIcons(icon, document.querySelector(".icon"));
      setIcons("03d", document.querySelector(".icon__cloud"));
      setIcons("50d", document.querySelector(".icon__pressure"));
      setIcons("09d", document.querySelector(".icon__humidity"));

      let Farenheit = (temp * 9) / 5 + 32;
      let FarenheitMin = (min * 9) / 5 + 32;
      let FarenheitMax = (max * 9) / 5 + 32;
      let FarenheitFeels = (feels_like * 9) / 5 + 32;
      let FarenheitMaxTemp = (max * 9) / 5 + 32;

      let FarenheitTodayMin = FarenheitTo(data.daily[0].temp.min);
      let FarenheitTodayMax = FarenheitTo(data.daily[0].temp.max);

      let FarenheitTomorrowMin = FarenheitTo(data.daily[1].temp.min);
      let FarenheitTomorrowMax = FarenheitTo(data.daily[1].temp.max);

      let FarenheitThirdMin = FarenheitTo(data.daily[2].temp.min);
      let FarenheitThirdMax = FarenheitTo(data.daily[2].temp.max);

      let FarenheitFourthMin = FarenheitTo(data.daily[3].temp.min);
      let FarenheitFourthMax = FarenheitTo(data.daily[3].temp.max);

      let FarenheitFifthMin = FarenheitTo(data.daily[4].temp.min);
      let FarenheitFifthMax = FarenheitTo(data.daily[4].temp.max);

      let FarenheitSixthMin = FarenheitTo(data.daily[5].temp.min);
      let FarenheitSixthMax = FarenheitTo(data.daily[5].temp.max);

      let FarenheitSeventhMin = FarenheitTo(data.daily[6].temp.min);
      let FarenheitSeventhMax = FarenheitTo(data.daily[6].temp.max);

      //Switch between Celsius/Farenheit
      temperatureSection.addEventListener("click", () => {
        if (temperatureSpan.textContent === "°C") {
          temperatureSpan.textContent = "°F";
          temperatureDegree.textContent = Math.floor(Farenheit);
          minDeg.textContent = Math.floor(FarenheitMin) + "°/";
          maxDeg.textContent = Math.floor(FarenheitMax) + "°";
          feelsLike.textContent =
            "Feels like: " + Math.floor(FarenheitFeels) + "°";
          maxTemp.textContent = Math.floor(FarenheitMaxTemp) + "°";
          todayMin.textContent = Math.floor(FarenheitTodayMin) + "°/";
          todayMax.textContent = Math.floor(FarenheitTodayMax) + "°";
          tomorrowMin.textContent = Math.floor(FarenheitTomorrowMin) + "°/";
          tomorrowMax.textContent = Math.floor(FarenheitTomorrowMax) + "°";
          thirdMin.textContent = Math.floor(FarenheitThirdMin) + "°/";
          thirdMax.textContent = Math.floor(FarenheitThirdMax) + "°";
          fourthMin.textContent = Math.floor(FarenheitFourthMin) + "°/";
          fourthMax.textContent = Math.floor(FarenheitFourthMax) + "°";
          fifthMin.textContent = Math.floor(FarenheitFifthMin) + "°/";
          fifthMax.textContent = Math.floor(FarenheitFifthMax) + "°";
          sixthMin.textContent = Math.floor(FarenheitSixthMin) + "°/";
          sixthMax.textContent = Math.floor(FarenheitSixthMax) + "°";
          seventhMin.textContent = Math.floor(FarenheitSeventhMin) + "°/";
          seventhMax.textContent = Math.floor(FarenheitSeventhMax) + "°";
        } else {
          temperatureSpan.textContent = "°C";
          temperatureDegree.textContent = Math.floor(temp);
          minDeg.textContent = Math.floor(min) + "°/";
          maxDeg.textContent = Math.floor(max) + "°";
          maxTemp.textContent = Math.floor(max) + "°";
          feelsLike.textContent = "Feels like: " + Math.floor(feels_like) + "°";
          todayMin.textContent = Math.floor(data.daily[0].temp.min) + "°/";
          todayMax.textContent = Math.floor(data.daily[0].temp.max) + "°";
          tomorrowMin.textContent = Math.floor(data.daily[1].temp.min) + "°/";
          tomorrowMax.textContent = Math.floor(data.daily[1].temp.max) + "°";
          thirdMin.textContent = Math.floor(data.daily[2].temp.min) + "°/";
          thirdMax.textContent = Math.floor(data.daily[2].temp.max) + "°";
          fourthMin.textContent = Math.floor(data.daily[3].temp.min) + "°/";
          fourthMax.textContent = Math.floor(data.daily[3].temp.max) + "°";
          fifthMin.textContent = Math.floor(data.daily[4].temp.min) + "°/";
          fifthMax.textContent = Math.floor(data.daily[4].temp.max) + "°";
          sixthMin.textContent = Math.floor(data.daily[5].temp.min) + "°/";
          sixthMax.textContent = Math.floor(data.daily[5].temp.max) + "°";
          seventhMin.textContent = Math.floor(data.daily[6].temp.min) + "°/";
          seventhMax.textContent = Math.floor(data.daily[6].temp.max) + "°";
        }
      });
    });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
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
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours() < 10 ? "0" + a.getHours() : a.getHours();
  var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
  var time = date + " " + month + " " + year + " " + hour + ":" + min;
  return time;
}

function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: "white" });
  let checkIcon = icon;
  let currentIcon;

  if (checkIcon == "01d" || checkIcon == "01n") {
    currentIcon = "CLEAR_DAY";
  } else if (checkIcon == "02d" || checkIcon == "02n") {
    currentIcon = "PARTLY_CLOUDY_DAY";
  } else if (checkIcon == "03d" || checkIcon == "03n") {
    currentIcon = "CLOUDY";
  } else if (checkIcon == "04d" || checkIcon == "04n") {
    currentIcon = "CLOUDY";
  } else if (checkIcon == "09d") {
    currentIcon = "RAIN";
  } else if (checkIcon == "10d") {
    currentIcon = "RAIN";
  } else if (checkIcon == "11d") {
    currentIcon = "SLEET";
  } else if (checkIcon == "13d") {
    currentIcon = "SNOW";
  } else if (checkIcon == "50d") {
    currentIcon = "FOG";
  }
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}

function FarenheitTo(Deg) {
  let Farenheit = (Deg * 9) / 5 + 32;
  return Farenheit;
}
