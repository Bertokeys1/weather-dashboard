// Print/render the weather data to the page.

// From the <form> element, listen to the "submit"
// From the <button> element, listen to the "click"

    // Select <input>, get its value, and provide it to the geo API

// From the <button> container element, listen to the <button> "click"

    // Get the vity from the button's data attribute


var currentWeather = $("#currentWeather")
var searchBtn = $("#search-btn")
var fiveDayEl = $("#fiveDay")
var cityList = [];
var historyEl = $("#history")
if (localStorage.getItem("cityList")) {
    cityList = JSON.parse(localStorage.getItem("cityList"))
}

searchBtn.on("click", cityName);

function displayCity() {
    historyEl.empty()
    for (let i = 0; i < cityList.length; i++) {
        historyEl.append(`<p>${cityList[i]}</p>`)
        
    }
}
displayCity()
function cityName() {
    var location = $("#search").val();
    geoData(location);
}

// Fetch the geo data (lat, lon)
function geoData(cityName) {

    //build url
    var APIKey = "5f0de267b85fd710a6d2a256aad58f56";
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;
    // var url = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5f0de267b85fd710a6d2a256aad58f56`;

    fetch( weatherUrl )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;

            // console.log(lat, lon);

            oneCall( lat, lon, data)

        });

}

    // q = Name of the city

    // limit = 5 (optional)

    // appid = Your custome API key

// Fetch the one call weather data
function oneCall(lat,lon, currentData) {

    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=5f0de267b85fd710a6d2a256aad58f56&units=imperial`;

    fetch( url )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(currentData)
            console.log( data );
            currentWeather.html(`            <div class="city">city: ${currentData.city.name} ${moment(data.current.dt,"X").format("MM/DD/YYYY")} <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png"></div>
            <div class="topTemp">temp: ${data.current.temp}</div>
            <div class="topwind">wind speed: ${data.current.wind_speed}</div>
            <div class="tophum">Humidity:${data.current.humidity}</div>
            <div class="uv">UV:${data.current.uvi}</div>`)
            
            cityList.push(currentData.city.name)
            localStorage.setItem("cityList", JSON.stringify(cityList))
            displayCity()
            // Render to page.
            fiveDay(data);
        });
    
}

const cardTemp = document.getElementById("temp");
const cardWind = document.getElementById("wind");
const cardHum = document.getElementById("hum");
const cardIcon = document.getElementById("icon");
const cardDate = document.getElementById("date");

    function fiveDay(data) {
        console.log(data.daily);
        fiveDayEl.empty()
        for (let i = 1; i < 6; i++) {
            const temp = data.daily[i].temp.day;
            const wind = data.daily[i].wind_speed;
            const hum = data.daily[i].humidity;
            const icon = data.daily[i].weather[0].icon;
            const date = data.daily[i].temp.day;
            console.log(temp, wind, hum, icon, date)
            var fer = kelvinConvert(temp);
            console.log(fer)
            // append to html
            fiveDayEl.append(`
            <div class="weather card col-md m-2">
            <div class="card-body">
              <div class="date">Date: ${moment(data.daily[i].dt,"X").format("MM/DD/YYYY")}</div>
              <div class="icon"><img src="http://openweathermap.org/img/wn/${icon}@2x.png"></div>
              <div class="temp">Temperature: ${temp}</div>
              <div class="wind">Wind: ${wind}</div>
              <div class="hum">Humidity: ${hum}</div>
            </div>
          </div>
            
            `)

        }
        
    }

    function kelvinConvert(temp) {
        valNum = ((temp-273.15)*1.8)+32;
        console.log(valNum)
        return valNum;
        
    }

    // ((valNum-273.15)*1.8)+32
    // lat
    
    // lon

    // appid

    // units = imperial

    // exclude = minutely, hourly



// Print/render the weather data to the page.