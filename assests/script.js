// Print/render the weather data to the page.

// From the <form> element, listen to the "submit"
// From the <button> element, listen to the "click"

    // Select <input>, get its value, and provide it to the geo API

// From the <button> container element, listen to the <button> "click"

    // Get the vity from the button's data attribute



var searchBtn = $("#search-btn")

searchBtn.on("click", cityName);

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

            oneCall( lat, lon)

        });

}

    // q = Name of the city

    // limit = 5 (optional)

    // appid = Your custome API key

// Fetch the one call weather data
function oneCall(lat,lon) {

    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=5f0de267b85fd710a6d2a256aad58f56`;

    fetch( url )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            // console.log( data );
            

            // Render to page.
            fiveDay(data);
        });
    
}

const cardTemp = document.getElementById(".temp");
const cardWind = document.getElementById(".wind");
const cardHum = document.getElementById(".hum");
const cardIcon = document.getElementById(".icon");
const cardDate = document.getElementById(".date");

    function fiveDay(data) {
        console.log(data.daily);
        for (let i = 0; i < 4; i++) {
            const temp = data.daily[i].temp.day;
            const wind = data.daily[i].wind_speed;
            const hum = data.daily[i].humidity;
            const icon = data.daily[i].weather[0].icon;
            const date = data.daily[i].temp.day;
            console.log(temp, wind, hum, icon, date)
            var fer = kelvinConvert(temp);
            console.log(fer)
            // append to html
            cardTemp.appendChild(temp);
            cardWind.textContent = wind;
            cardHum.textContent = hum;
            cardIcon.textContent = icon;
            cardDate.textContent = date;

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