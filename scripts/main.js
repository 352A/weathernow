class App {
  date = new Date();

  constructor() {
    this._updateUI();
    this._getPosition();
    this._queryDOMElements();
  }

  _queryDOMElements() {
    // temperature card variables
    this.locationSpecific = document.querySelector(".location-name");
    this.locationTimezone = document.querySelector(".date");
    this.locationTime = document.querySelector(".date");
    this.temperatureDegree = document.querySelector(".location-temp");
    this.temperatureSection = document.querySelector(".temperature-section");
    this.temperatureSpan = document.querySelector(".temperature-unit");
    this.temperatureDescription = document.querySelector(".description");
    this.maxDeg = document.querySelector(".max-deg");
    this.minDeg = document.querySelector(".min-deg");
    this.feelsLike = document.querySelector(".feels-like");

    // Cloud, humidity, presssure cards
    this.cloudsVisible = document.querySelector(".clouds");
    this.humidityLevel = document.querySelector(".humidity");
    this.pressureLevel = document.querySelector(".pressure");

    // Summary variables
    this.uvIndex = document.querySelector(".summary-uv");
    this.windSpeed = document.querySelector(".summary-wind__speed");
    this.windDegree = document.querySelector(".summary-wind__degree");
    this.visibilityLevel = document.querySelector(".summary-visibility");
    this.maxTemp = document.querySelector(".summary-temperature__max");

    // Today summary
    this.todayMin = document.querySelector(".today-min");
    this.todayMax = document.querySelector(".today-max");
    this.cloudsToday = document.querySelector(".clouds-today");
    this.humidityToday = document.querySelector(".humidity-today");

    // Tomorrow summary
    this.tomorrowMin = document.querySelector(".tomorrow-min");
    this.tomorrowMax = document.querySelector(".tomorrow-max");
    this.cloudsTomorrow = document.querySelector(".clouds-tomorrow");
    this.humidityTomorrow = document.querySelector(".humidity-tomorrow");

    // Third day summary
    this.thirdMin = document.querySelector(".third-min");
    this.thirdMax = document.querySelector(".third-max");
    this.cloudsThird = document.querySelector(".clouds-third");
    this.humidityThird = document.querySelector(".humidity-third");

    // Forth day summary
    this.fourthMin = document.querySelector(".fourth-min");
    this.fourthMax = document.querySelector(".fourth-max");
    this.cloudsFourth = document.querySelector(".clouds-fourth");
    this.humidityFourth = document.querySelector(".humidity-fourth");

    // Fifth day summary
    this.fifthMin = document.querySelector(".fifth-min");
    this.fifthMax = document.querySelector(".fifth-max");
    this.cloudsFifth = document.querySelector(".clouds-fifth");
    this.humidityFifth = document.querySelector(".humidity-fifth");

    // Sixth day summary
    this.sixthMin = document.querySelector(".sixth-min");
    this.sixthMax = document.querySelector(".sixth-max");
    this.cloudsSixth = document.querySelector(".clouds-sixth");
    this.humiditySixth = document.querySelector(".humidity-sixth");

    // Seventh day summary
    this.seventhMin = document.querySelector(".seventh-min");
    this.seventhMax = document.querySelector(".seventh-max");
    this.cloudsSeventh = document.querySelector(".clouds-seventh");
    this.humiditySeventh = document.querySelector(".humidity-seventh");

    // Weekdays
    this.today = document.querySelector(".today");
    this.tomorrow = document.querySelector(".tomorrow");
    this.thirdDay = document.querySelector(".third-day");
    this.fourthDay = document.querySelector(".fourth-day");
    this.fifthDay = document.querySelector(".fifth-day");
    this.sixthDay = document.querySelector(".sixth-day");
    this.seventhDay = document.querySelector(".seventh-day");

    // Search
    document.querySelector(".search-btn").addEventListener("click", () => {
      this._fetchWeather(document.querySelector(".input-search-bar").value);
      document.querySelector(".input-search-bar").value = "";
    });

    document
      .querySelector(".input-search-bar")
      .addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
          this._fetchWeather(document.querySelector(".input-search-bar").value);
          document.querySelector(".input-search-bar").value = "";
        }
      });

    // API key
    this.myKey = "9fd7e84f84626f28199be3bc384da8f9";

    // loader
    // this.loadingIndicator = document.createElement("div");
    this.loadingIndicator = document.querySelector(".js-loader");
  }

  _getPosition() {
    // Get location
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Please allow location access on your device.");
        }
      );
  }

  _loadMap(position) {
    this.long = position.coords.longitude;
    this.lat = position.coords.latitude;
    this.weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.long}&exclude=hourly,minutely&units=metric&appid=${this.myKey}`;
    this.locationApi = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&exclude=hourly,minutely&units=metric&appid=${this.myKey}`;

    // map
    const coords = [this.lat, this.long];
    this.map = L.map("mapid").setView(coords, 12);

    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    let marker = null;
    marker = L.marker(coords)
      .addTo(this.map)
      .bindPopup(
        `You're Here! \n
        Click anywhere on the map.`
      )
      .openPopup();

    const popup = L.popup();

    const onMapClick = (e) => {
      const { lat, lng } = e.latlng;
      this.weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.long}&exclude=hourly,minutely&units=metric&appid=${this.myKey}`;
      this.locationApi = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&exclude=hourly,minutely&units=metric&appid=${this.myKey}`;
      if (marker !== null) {
        this.map.removeLayer(marker);
      }

      marker = L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup("Weather Here!")
        .openPopup();

      popup
        .setLatLng(e.latlng)
        .setContent("Weather at " + e.latlng.toString())
        .openOn(this.map);
      this.lat = e.latlng.lat;
      this.long = e.latlng.lng;
      this._weatherUpdate(this.weatherApi);
    };
    this.map.on("click", onMapClick);

    // Weather update
    this._weatherUpdate(this.weatherApi);
    this._weekdays();

    // Remove loader when done
    setTimeout(() => {
      if (this.loadingIndicator)
        this.loadingIndicator.classList.remove("loader");
    }, 500);
  }

  _fetchWeather(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.myKey
    )
      .then((response) => response.json())
      .then((data) => displayWeather(data));

    const displayWeather = (data) => {
      const { lat: latitude, lon: longitude } = data.coord;
      // const { name } = data;

      this.searchApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${this.myKey}`;
      this.locationApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${this.myKey}`;

      this.position = {
        coords: {
          latitude,
          longitude,
        },
      };

      this._weatherUpdate(this.searchApi);

      // Remove existing map
      if (this.map !== null) {
        this.map.remove();
        this.map = null;
      }

      // Reload map
      this._loadMap(this.position);
    };
  }

  _weatherUpdate(weatherApi) {
    fetch(weatherApi)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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

        const capitalizedDescription =
          description.charAt(0).toUpperCase() + description.slice(1);
        const roundedTemp = Math.floor(temp);
        const roundedFeelsLike = Math.floor(feels_like);
        const roundedMax = Math.floor(max);
        const roundedMin = Math.floor(min);

        // Update DOM elements
        this.temperatureDegree.textContent = roundedTemp;
        this.temperatureDescription.textContent = capitalizedDescription;
        this.locationTimezone.textContent = timezone;
        this.cloudsVisible.textContent = clouds + "%";
        this.humidityLevel.textContent = humidity + "%";
        this.pressureLevel.textContent = pressure;
        this.windSpeed.textContent = wind_speed + " Km/h";
        this.windDegree.textContent = wind_deg + "°";
        this.uvIndex.textContent = uvi;
        this.feelsLike.textContent = "Feels like: " + roundedFeelsLike + "°";
        this.maxDeg.textContent = roundedMax + "°";
        this.maxTemp.textContent = roundedMax + "°";
        this.minDeg.textContent = roundedMin + "°/";
        this.locationTime.textContent = this._timeConverter(dt);
        this.visibilityLevel.textContent = visibility;

        this.dayElements = [
          {
            minTemp: this.todayMin,
            maxTemp: this.todayMax,
            clouds: this.cloudsToday,
            humidity: this.humidityToday,
          },
          {
            minTemp: this.tomorrowMin,
            maxTemp: this.tomorrowMax,
            clouds: this.cloudsTomorrow,
            humidity: this.humidityTomorrow,
          },
          {
            minTemp: this.thirdMin,
            maxTemp: this.thirdMax,
            clouds: this.cloudsThird,
            humidity: this.humidityThird,
          },
          {
            minTemp: this.fourthMin,
            maxTemp: this.fourthMax,
            clouds: this.cloudsFourth,
            humidity: this.humidityFourth,
          },
          {
            minTemp: this.fifthMin,
            maxTemp: this.fifthMax,
            clouds: this.cloudsFifth,
            humidity: this.humidityFifth,
          },
          {
            minTemp: this.sixthMin,
            maxTemp: this.sixthMax,
            clouds: this.cloudsSixth,
            humidity: this.humiditySixth,
          },
          {
            minTemp: this.seventhMin,
            maxTemp: this.seventhMax,
            clouds: this.cloudsSeventh,
            humidity: this.humiditySeventh,
          },
        ];

        const days = data.daily.slice(0, 7);
        days.forEach((day, index) => {
          const { minTemp, maxTemp, clouds, humidity } =
            this.dayElements[index];
          if (minTemp && maxTemp && clouds && humidity) {
            minTemp.textContent = Math.floor(day.temp.min) + "°/";
            maxTemp.textContent = Math.floor(day.temp.max) + "°";
            clouds.textContent = day.clouds + "%";
            humidity.textContent = day.humidity + "%";
          }
        });

        //Set icon
        setIcons(icon, document.querySelector(".icon"));
        setIcons("03d", document.querySelector(".icon__cloud"));
        setIcons("50d", document.querySelector(".icon__pressure"));
        setIcons("09d", document.querySelector(".icon__humidity"));
      });

    fetch(this.locationApi)
      .then((response) => {
        return response.json();
      })
      .then((locationData) => {
        this.locationSpecific.textContent = locationData.name;
      });

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
  }

  _toFahrenheit(deg) {
    return (deg * 9) / 5 + 32;
  }

  _updateUI() {
    const appBody = document.querySelector(".app");
    appBody.innerHTML = `
    <div class="card card__main animate__animated animate__zoomInDown">
      <div class="heading">
        <h2 class="location-name">Loading..</h2>
        <p class="date">Please allow location access in your browser.</p>
      </div>
      <div class="temperature-section">
        <div class="temperature">
          <canvas class="icon" width="128" height="128"></canvas>
          <span class="location-temp"></span
          ><span class="temperature-unit">°C</span>
        </div>
        <div class="location-info">
          <p class="description"></p>
          <span class="min-deg"></span><span class="max-deg"></span>
          <p class="feels-like"></p>
        </div>
      </div>
    </div>
  
    <div class="card card__clouds" data-aos="flip-left">
      <h3>Clouds</h3>
      <h3 class="clouds">N/A</h3>
      <canvas class="icon__cloud"></canvas>
    </div>
  
    <div class="card card__humidity" data-aos="flip-right">
      <h3>Humidity</h3>
      <h3 class="humidity">N/A</h3>
      <canvas class="icon__humidity"></canvas>
    </div>
  
    <div class="card card__search animate__animated animate__flipInX">
      <h2>Search for a city..</h2>
      <div class="search-container">
        <input
          class="input-search-bar"
          placeholder="Enter a city name.."
          type="text"
          id="nameInput"
          onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode == 32))"
        />
        <button class="search-btn">
          <svg
            class="search-btn-icon"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            version="1.1"
            viewBox="0 0 16 16"
            height="1.6em"
            width="1.6em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0c-2.761 0-5 2.239-5 5 0 5 5 11 5 11s5-6 5-11c0-2.761-2.239-5-5-5zM8 8.063c-1.691 0-3.063-1.371-3.063-3.063s1.371-3.063 3.063-3.063 3.063 1.371 3.063 3.063-1.371 3.063-3.063 3.063zM6.063 5c0-1.070 0.867-1.938 1.938-1.938s1.938 0.867 1.938 1.938c0 1.070-0.867 1.938-1.938 1.938s-1.938-0.867-1.938-1.938z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  
    <div class="card card__pressure" data-aos="flip-up">
      <h3>Pressure</h3>
      <h3 class="pressure">N/A</h3>
      <canvas class="icon__pressure"></canvas>
    </div>
  
    <div class="card card__summary" data-aos="flip-down">
      <div class="liner">
        <h3>UV Index</h3>
        <span class="summary-uv">N/A</span>
      </div>
  
      <div class="liner">
        <h3>Max. Temperature</h3>
        <span class="summary-temperature__max">N/A</span>
      </div>
  
      <div class="liner">
        <h3>Wind Speed</h3>
        <span class="summary-wind__speed">N/A</span>
      </div>
  
      <div class="liner">
        <h3>Wind Degree</h3>
        <span class="summary-wind__degree">N/A</span>
      </div>
  
      <div class="liner">
        <h3>Visibility</h3>
        <span class="summary-visibility">N/A</span>
      </div>
    </div>
  
  <div class="weekdays" data-aos="flip-left"
  data-aos-anchor-placement="top-bottom">
      <div class="weekdays-container">
          <!-- today -->
          <div class="weekday-section card card__weekday">
              <h4 class="today day-title spaceleft"></h4>
              <div class="degrees">
              <span class="banner-text today-min"></span><span class="banner-text today-max"></span>
          </div>
          <img
              style="width: 2.5rem"
              src="https://openweathermap.org/img/wn/03d.png"
              alt=""
          />
          <p class="banner-text clouds-today spaceleft"></p>
          <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.1"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
          >
              <path
              d="M13.51 7.393c-1.027-2.866-3.205-5.44-5.51-7.393-2.305 1.953-4.482 4.527-5.51 7.393-0.635 1.772-0.698 3.696 0.197 5.397 1.029 1.955 3.104 3.21 5.313 3.21s4.284-1.255 5.313-3.21c0.895-1.701 0.832-3.624 0.197-5.397zM11.543 11.859c-0.684 1.301-2.075 2.141-3.543 2.141-0.861 0-1.696-0.29-2.377-0.791 0.207 0.027 0.416 0.041 0.627 0.041 1.835 0 3.573-1.050 4.428-2.676 0.701-1.333 0.64-2.716 0.373-3.818 0.227 0.44 0.42 0.878 0.576 1.311 0.353 0.985 0.625 2.443-0.084 3.791z"></path>
          </svg>
          <p class="banner-text humidity-today spaceleft"></p>
          </div>
          <!-- tomorrow -->
          <div class="weekday-section card card__weekday">
          <h4 class="tomorrow day-title spaceleft"></h4>
          <div class="degrees">
          <span class="banner-text tomorrow-min"></span><span class="banner-text tomorrow-max"></span>
      </div>
      <img
          style="width: 2.5rem"
          src="https://openweathermap.org/img/wn/03d.png"
          alt=""
      />
      <p class="banner-text clouds-tomorrow spaceleft"></p>
      <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          version="1.1"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
      >
          <path
          d="M13.51 7.393c-1.027-2.866-3.205-5.44-5.51-7.393-2.305 1.953-4.482 4.527-5.51 7.393-0.635 1.772-0.698 3.696 0.197 5.397 1.029 1.955 3.104 3.21 5.313 3.21s4.284-1.255 5.313-3.21c0.895-1.701 0.832-3.624 0.197-5.397zM11.543 11.859c-0.684 1.301-2.075 2.141-3.543 2.141-0.861 0-1.696-0.29-2.377-0.791 0.207 0.027 0.416 0.041 0.627 0.041 1.835 0 3.573-1.050 4.428-2.676 0.701-1.333 0.64-2.716 0.373-3.818 0.227 0.44 0.42 0.878 0.576 1.311 0.353 0.985 0.625 2.443-0.084 3.791z"></path>
      </svg>
      <p class="banner-text humidity-tomorrow spaceleft"></p>
          </div>
          <!-- third day -->
          <div class="weekday-section card card__weekday">
                  <h4 class="third-day day-title spaceleft"></h4>
                  <div class="degrees">
                  <span class="banner-text third-min"></span><span class="banner-text third-max"></span>
                  </div>
              <img
                  style="width: 2.5rem"
                  src="https://openweathermap.org/img/wn/03d.png"
                  alt=""
              />
              <p class="banner-text clouds-third spaceleft"></p>
              <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  version="1.1"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                  d="M13.51 7.393c-1.027-2.866-3.205-5.44-5.51-7.393-2.305 1.953-4.482 4.527-5.51 7.393-0.635 1.772-0.698 3.696 0.197 5.397 1.029 1.955 3.104 3.21 5.313 3.21s4.284-1.255 5.313-3.21c0.895-1.701 0.832-3.624 0.197-5.397zM11.543 11.859c-0.684 1.301-2.075 2.141-3.543 2.141-0.861 0-1.696-0.29-2.377-0.791 0.207 0.027 0.416 0.041 0.627 0.041 1.835 0 3.573-1.050 4.428-2.676 0.701-1.333 0.64-2.716 0.373-3.818 0.227 0.44 0.42 0.878 0.576 1.311 0.353 0.985 0.625 2.443-0.084 3.791z"></path>
              </svg>
              <p class="banner-text humidity-third spaceleft"></p>
          </div>
          <!-- fourth day -->
          <div class="weekday-section card card__weekday">
              <h4 class="fourth-day day-title spaceleft"></h4>
              <div class="degrees">
              <span class="banner-text fourth-min"></span><span class="banner-text fourth-max"></span>
          </div>
          <img
              style="width: 2.5rem"
              src="https://openweathermap.org/img/wn/03d.png"
              alt=""
          />
          <p class="banner-text clouds-fourth spaceleft"></p>
          <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.1"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
          >
              <path
              d="M13.51 7.393c-1.027-2.866-3.205-5.44-5.51-7.393-2.305 1.953-4.482 4.527-5.51 7.393-0.635 1.772-0.698 3.696 0.197 5.397 1.029 1.955 3.104 3.21 5.313 3.21s4.284-1.255 5.313-3.21c0.895-1.701 0.832-3.624 0.197-5.397zM11.543 11.859c-0.684 1.301-2.075 2.141-3.543 2.141-0.861 0-1.696-0.29-2.377-0.791 0.207 0.027 0.416 0.041 0.627 0.041 1.835 0 3.573-1.050 4.428-2.676 0.701-1.333 0.64-2.716 0.373-3.818 0.227 0.44 0.42 0.878 0.576 1.311 0.353 0.985 0.625 2.443-0.084 3.791z"></path>
          </svg>
          <p class="banner-text humidity-fourth spaceleft"></p>
          </div>
          <!-- fifth day -->
          <div class="weekday-section card card__weekday">
              <h4 class="fifth-day day-title spaceleft"></h4>
              <div class="degrees">
              <span class="banner-text fifth-min"></span><span class="banner-text fifth-max"></span>
          </div>
          <img
              style="width: 2.5rem"
              src="https://openweathermap.org/img/wn/03d.png"
              alt=""
          />
          <p class="banner-text clouds-fifth spaceleft"></p>
          <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.1"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
          >
              <path
              d="M13.51 7.393c-1.027-2.866-3.205-5.44-5.51-7.393-2.305 1.953-4.482 4.527-5.51 7.393-0.635 1.772-0.698 3.696 0.197 5.397 1.029 1.955 3.104 3.21 5.313 3.21s4.284-1.255 5.313-3.21c0.895-1.701 0.832-3.624 0.197-5.397zM11.543 11.859c-0.684 1.301-2.075 2.141-3.543 2.141-0.861 0-1.696-0.29-2.377-0.791 0.207 0.027 0.416 0.041 0.627 0.041 1.835 0 3.573-1.050 4.428-2.676 0.701-1.333 0.64-2.716 0.373-3.818 0.227 0.44 0.42 0.878 0.576 1.311 0.353 0.985 0.625 2.443-0.084 3.791z"></path>
          </svg>
          <p class="banner-text humidity-fifth spaceleft"></p>
          </div>
          <!-- sixth day -->
          <div class="weekday-section card card__weekday">
              <h4 class="sixth-day day-title spaceleft"></h4>
              <div class="degrees">
              <span class="banner-text sixth-min"></span><span class="banner-text sixth-max"></span>
          </div>
          <img
              style="width: 2.5rem"
              src="https://openweathermap.org/img/wn/03d.png"
              alt=""
          />
          <p class="banner-text clouds-sixth spaceleft"></p>
          <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.1"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
          >
              <path
              d="M13.51 7.393c-1.027-2.866-3.205-5.44-5.51-7.393-2.305 1.953-4.482 4.527-5.51 7.393-0.635 1.772-0.698 3.696 0.197 5.397 1.029 1.955 3.104 3.21 5.313 3.21s4.284-1.255 5.313-3.21c0.895-1.701 0.832-3.624 0.197-5.397zM11.543 11.859c-0.684 1.301-2.075 2.141-3.543 2.141-0.861 0-1.696-0.29-2.377-0.791 0.207 0.027 0.416 0.041 0.627 0.041 1.835 0 3.573-1.050 4.428-2.676 0.701-1.333 0.64-2.716 0.373-3.818 0.227 0.44 0.42 0.878 0.576 1.311 0.353 0.985 0.625 2.443-0.084 3.791z"></path>
          </svg>
          <p class="banner-text humidity-sixth spaceleft"></p>
          </div>
          <!-- seventh day -->
          <div class="weekday-section card card__weekday">
              <h4 class="seventh-day day-title spaceleft"></h4>
              <div class="degrees">
              <span class="banner-text seventh-min"></span><span class="banner-text seventh-max"></span>
          </div>
          <img
              style="width: 2.5rem"
              src="https://openweathermap.org/img/wn/03d.png"
              alt=""
          />
          <p class="banner-text clouds-seventh spaceleft"></p>
          <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.1"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
          >
              <path
              d="M13.51 7.393c-1.027-2.866-3.205-5.44-5.51-7.393-2.305 1.953-4.482 4.527-5.51 7.393-0.635 1.772-0.698 3.696 0.197 5.397 1.029 1.955 3.104 3.21 5.313 3.21s4.284-1.255 5.313-3.21c0.895-1.701 0.832-3.624 0.197-5.397zM11.543 11.859c-0.684 1.301-2.075 2.141-3.543 2.141-0.861 0-1.696-0.29-2.377-0.791 0.207 0.027 0.416 0.041 0.627 0.041 1.835 0 3.573-1.050 4.428-2.676 0.701-1.333 0.64-2.716 0.373-3.818 0.227 0.44 0.42 0.878 0.576 1.311 0.353 0.985 0.625 2.443-0.084 3.791z"></path>
          </svg>
          <p class="banner-text humidity-seventh spaceleft"></p>
          </div>
      </div>
  </div>
        
  
       
  
        <div id="mapid" class="card card__map" data-aos="flip-up"></div>
      </div>
    </div>`;
  }

  _timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = [
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
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours() < 10 ? "0" + a.getHours() : a.getHours();
    const min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    const time = date + " " + month + " " + year + " " + hour + ":" + min;
    return time;
  }

  _weekdays() {
    const d = new Date();
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    this.today.textContent = "Today";
    this.tomorrow.textContent = "Tomorrow";
    this.thirdDay.textContent = weekday[d.getDay() + 2];
    this.fourthDay.textContent = weekday[d.getDay() + 3];
    this.fifthDay.textContent = weekday[d.getDay() + 4];
    this.sixthDay.textContent = weekday[d.getDay() + 5];
    this.seventhDay.textContent = weekday[d.getDay() + 6];
  }
}

document.querySelector(".js-button").addEventListener("click", () => {
  const app = new App();
  app.loadingIndicator.classList.add("loader");
  // const buttonElem = document.querySelector(".btn-start");
  // buttonElem.appendChild(app.loadingIndicator);
});
