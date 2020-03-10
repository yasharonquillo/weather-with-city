const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the city from the html form, display in // console. Takes in as string.
        // var cityname = String(req.body.cityInput);
        // console.log(req.body.cityInput);

        var lat = String(req.body.latitudeInput);
        var lon = String(req.body.longitudeInput);
        console.log(lat,lon);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "de82c0db0c44c0274ea961ddad82002b"; //Yasha API Key
        const url = "https://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lon + "&units=" +units+ "cnt=10&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const minTemp = weatherData.main.temp_min;
            const maxTemp = weatherData.main.temp_max;
            const lat = weatherData.coord.lat;
            const lon = weatherData.coord.lon;
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const windDirection = weatherData.wind.deg;
            const weatherDescription = weatherData.weather[0].description; 
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            
            // displays the output of the results
            
          
            res.write("<h1> The weather is " + weatherDescription + "<h1>");

            res.write("<h1> The minimum temperature is " + minTemp + " degrees Farenheit. The maximum temperature is " + maxTemp + " degrees Farenheit. </h1>" );

            res.write("<h1> The wind speed is " + windSpeed + " mph at " + windDirection + "degrees. </h1>" );

            //res.write("<h2>The Temperature in " + city + " is " + temp + " Degrees Fahrenheit<h2>");

            res.write("Humidity is " + humidity + "% with wind speed of " + windSpeed+  " miles/hour");
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})


//Commented out these lines in Repl
//Uncomment these lines when running on laptop
app.listen(3000, function() {
console.log ("Server is running on port")
});