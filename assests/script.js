var 

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
    var url = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5f0de267b85fd710a6d2a256aad58f56`;

    fetch( url )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            console.log( data );

            oneCall( data[0].lat, data[0].lon);

        });

}

    // q = Name of the city

    // limit = 5 (optional)

    // appid = Your custome API key

// Fetch the one call weather data
function oneCall(lat,lon) {

    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid={API key}`;

    fetch( url )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            console.log( data );

            // Render to page.

        });


    // lat
    
    // lon

    // appid

    // units = imperial

    // exclude = minutely, hourly

}


// Print/render the weather data to the page.