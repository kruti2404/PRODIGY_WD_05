function FindlocationWeather() {
    console.log("The submit button is clicked!! ");
    let apiKey = "08277300fb54a0044ed2aeef7e54d5fc";
    let city = document.getElementById("city").value;
    if (!city) {
        alert("Enter a valid city name!");
        return;
    }

    let currentWeatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    let foreCastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherurl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            document.getElementById("city").value = "";
        })
        .catch(error => {
            console.log("Error while fetching weather ", error);
            alert("Error fetching data");
        });

    fetch(foreCastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data);
        })
        .catch(error => {
            console.log("Error while fetching weather ", error);
            alert("Error fetching data");
        });
}

function displayWeather(data) {
    let weatherInfo = document.getElementById("weather-info");
    let hourlyForecast = document.getElementById("hourly-forecast");
    let hourlyHead = document.getElementById("hourlyHead");

    hourlyHead.innerHTML = "";
    hourlyForecast.innerHTML = "";
    weatherInfo.innerHTML = "";

    if (data.cod === '404') {
        console.log("City not found");
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        let cityName = data.name;
        let temp = Math.round(data.main.temp - 273.15);
        let description = data.weather[0].description;
        let windSpeed = Math.round(data.wind.speed * 3.6);


        weatherInfo.innerHTML = `
            <div class="partition">
                <span>${temp}℃</span>
                
            </div>
            <div class="partition">
                <p>${description}</p>
                
                <p>City: ${cityName} </p>
                <p>Wind Speed: ${windSpeed} Kmph </p>
            </div>
        `;
    }
}

function displayHourlyForecast(hourlyData) {
    let hourlyForecast = document.getElementById("hourly-forecast");
    let hourlyHead = document.getElementById("hourlyHead");

    const next8Hours = hourlyData.list.slice(0, 8);

    hourlyHead.innerHTML = `<div id="hourly-heading">Hourly Forecast</div>`;

    next8Hours.forEach(element => {
        const dateTime = new Date(element.dt * 1000);
        const hour = dateTime.getHours();
        const temp = Math.round(element.main.temp - 273.15);
        const iconCode = element.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-items">
                <img src="${iconUrl}" alt="Hourly Weather icon">
                <div>
                    <span>${hour}:00</span> <br>
                    <span>${temp}℃</span>
                </div>
            </div>
        `;
        hourlyForecast.innerHTML += hourlyItemHtml;
    });
}
