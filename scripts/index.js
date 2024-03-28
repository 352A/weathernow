// const button = document.createElement("button");
// button.innerHTML = `<h1>Weather Now</h1><img class="logo" src="images/cloud-black-shape-svgrepo-com.svg" alt="">`;
// button.classList.add("btn", "animate__animated", "animate__pulse");
// button.onclick = () => Refresh();

// const buttonElement = document.querySelector(".js-button");
// buttonElement.appendChild(button);

document.querySelector(".js-button").addEventListener("click", () => {
  updateUI();
  getWeather();
  weekdays();
  displayMap();
});

function updateUI() {
  const appBody = document.querySelector(".app");
  appBody.innerHTML = `
  <div class="card animate__animated animate__zoomInDown">
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
            src="http://openweathermap.org/img/wn/03d.png"
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
        src="http://openweathermap.org/img/wn/03d.png"
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
                src="http://openweathermap.org/img/wn/03d.png"
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
            src="http://openweathermap.org/img/wn/03d.png"
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
            src="http://openweathermap.org/img/wn/03d.png"
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
            src="http://openweathermap.org/img/wn/03d.png"
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
            src="http://openweathermap.org/img/wn/03d.png"
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

/* <button class="btn animate__animated animate__pulse" onclick="Refresh()">
      <h1>Weather Now</h1>
      <img class="logo" src="images/cloud-black-shape-svgrepo-com.svg" alt="" />
    </button>

    <div class="container">
      <div class="card animate__animated animate__zoomInDown">
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
                src="http://openweathermap.org/img/wn/03d.png"
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
            src="http://openweathermap.org/img/wn/03d.png"
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
                    src="http://openweathermap.org/img/wn/03d.png"
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
                src="http://openweathermap.org/img/wn/03d.png"
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
                src="http://openweathermap.org/img/wn/03d.png"
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
                src="http://openweathermap.org/img/wn/03d.png"
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
                src="http://openweathermap.org/img/wn/03d.png"
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
      </div>
    </div> */
