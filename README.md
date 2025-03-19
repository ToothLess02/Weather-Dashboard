<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App</title>
    <link href="https:pro.fontawesome.com/releases/v6.0.0-beta3/css/all.css" 
    rel="stylesheet">
    <link href="https:unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Weather</h2>
            <div class="weather-input">
                <input type="text" name="city" id="city_input" placeholder="Enter City Name">
                <button type="button" id="searchBtn">
                    <i class="fa-regular.fa-search"></i> Search
                </button>
                <button type="button" id="locationBtn">
                    <i class="bx bx-target-lock"></i> Current Location
                </button>
            </div>
        </div>
        <div id="update-status" class="update-status">
            <span class="status-dot"></span>
            <span id="status-text">Auto-updates enabled</span>
        </div>
        <div class="weather-data">
            <div class="weather-left">
                <div class="card">
                    <div class="current-weather">
                        <div class="details">
                            <p>Now</p>
                            <h2>___&deg;C</h2>
                            <p>_____</p>
                        </div>
                        <div class="weather-icon">
                            <img src="https://openweathermap.org/img/wn/04d@2x.png" 
                            alt="">
                        </div>
                    </div>
                    <hr>
                    <div class="card-footer">
                        <p><i class="fa-light fa-calendar"></i> _____</p>
                        <p><i class="fa-light fa-location-dot"></i> _____</p>
                    </div>
                </div>
                <div class="card">
                    <h2>5 days forecast</h2>
                    <div class="day-forecast">
                        <div class="forecast-item">
                            <div class="icon-wrapper">
                                <img src="https://openweathermap.org/img/wn/02d.png"
                                alt="">
                                 <span>___&deg;C</span>
                            </div>
                            <p>____</p>
                            <p>____</p>
                        </div>
                        <div class="forecast-item">
                            <div class="icon-wrapper">
                                <img src="https://openweathermap.org/img/wn/02d.png"
                                alt="">
                                 <span>___&deg;C</span>
                            </div>
                            <p>____</p>
                            <p>____</p>
                        </div><div class="forecast-item">
                            <div class="icon-wrapper">
                                <img src="https://openweathermap.org/img/wn/02d.png"
                                alt="">
                                 <span>___&deg;C</span>
                            </div>
                            <p>____</p>
                            <p>____</p>
                        </div>
                        <div class="forecast-item">
                            <div class="icon-wrapper">
                                <img src="https://openweathermap.org/img/wn/02d.png"
                                alt="">
                                 <span>___&deg;C</span>
                            </div>
                            <p>____</p>
                            <p>____</p>
                        </div>
                        <div class="forecast-item">
                            <div class="icon-wrapper">
                                <img src="https://openweathermap.org/img/wn/02d.png"
                                alt="">
                                 <span>___&deg;C</span>
                            </div>
                            <p>____</p>
                            <p>____</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weather-right">
                <h2>Today's Highlights</h2>
                <div class="highlights">
                    <div class="card">
                        <div class="card-head">
                            <p>Air Quality Index</p>
                            <p class="air-index aqi-1">good</p>
                        </div>
                        <div class="air-indices">
                            <i class="fa-regular fa-wind fa-3x"></i>
                            <div class="item">
                                <p>PM2.5</p>
                                <h2>____</h2>
                            </div>
                            <div class="item">
                                <p>PM10</p>
                                <h2>____</h2>
                            </div>
                            <div class="item">
                                <p>SO2</p>
                                <h2>____</h2>
                            </div>
                            <div class="item">
                                <p>CO</p>
                                <h2>____</h2>
                            </div>
                            <div class="item">
                                <p>NO</p>
                                <h2>____</h2>
                            </div>
                            <div class="item">
                                <p>NO2</p>
                                <h2>____</h2>
                            </div>
                            <div class="item">
                                <p>NH3</p>
                                <h2>____</h2>
                            </div>
                            <div class="item">
                                <p>O3</p>
                                <h2>____</h2>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-head"> 
                            <p>Sunrise & Sunset</p>
                        </div>
                        <div class="sunrise-sunset">
                            <div class="item"> 
                                <div class="icon">
                                    <i class="fa-light fa-sunrise fa-4x"></i>
                                </div>
                                <div>
                                    <p>Sunrise</p>
                                    <h2>____</h2>
                                </div>
                            </div>
                            <div class="item"> 
                                <div class="icon">
                                    <i class="fa-light fa-sunset fa-4x"></i>
                                </div>
                                <div>
                                    <p>Sunset</p>
                                    <h2>____</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-head"> 
                            <p>Humidity</p>
                        </div>
                        <div class="card-item">
                            <i class="fa-light fa-droplet fa-2x"></i>
                            <h2 id="humidityval">____% </h2>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-head"> 
                            <p>Pressure</p>
                        </div>
                        <div class="card-item">
                            <i class="fa-light fa-compass fa-2x"></i>
                            <h2 id="pressureval">____hpa </h2>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-head"> 
                            <p>Visibility</p>
                        </div>
                        <div class="card-item">
                            <i class="fa-light fa-eye fa-2x"></i>
                            <h2 id="visibilityval">____km </h2>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-head"> 
                            <p>Wind Speed</p>
                        </div>
                        <div class="card-item">
                            <i class="fa-light fa-location fa-2x"></i>
                            <h2 id="windspeedval">____m/s </h2>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-head"> 
                            <p>Feels Like</p>
                        </div>
                        <div class="card-item">
                            <i class="fa-light fa-temperature-list fa-2x"></i>
                            <h2 id="feelsval">____&deg;C </h2>
                        </div>
                    </div>
                </div>
                <h2>Today at</h2>
                <div class="hourly-forecast">
                    <div class="card"> 
                        <p>9 AM</p>
                        <img src="https://openweathermap.org/img/wn/04d.png" alt="">
                        <p>___&deg;C</p>
                    </div>
                    <div class="card"> 
                        <p>9 AM</p>
                        <img src="https://openweathermap.org/img/wn/04d.png" alt="">
                        <p>___&deg;C</p>
                    </div>
                    <div class="card"> 
                        <p>9 AM</p>
                        <img src="https://openweathermap.org/img/wn/04d.png" alt="">
                        <p>___&deg;C</p>
                    </div>
                    <div class="card"> 
                        <p>9 AM</p>
                        <img src="https://openweathermap.org/img/wn/04d.png" alt="">
                        <p>___&deg;C</p>
                    </div>
                    <div class="card"> 
                        <p>9 AM</p>
                        <img src="https://openweathermap.org/img/wn/04d.png" alt="">
                        <p>___&deg;C</p>
                    </div>
                    <div class="card"> 
                        <p>9 AM</p>
                        <img src="https://openweathermap.org/img/wn/04d.png" alt="">
                        <p>___&deg;C</p>
                    </div>
                    <div class="card"> 
                        <p>9 AM</p>
                        <img src="https://openweathermap.org/img/wn/04d.png" alt="">
                        <p>___&deg;C</p>
                    </div>
                    <div class="card"> 
                        <p>9 AM</p>
                        <img src="https://openweathermap.org/img/wn/04d.png" alt="">
                        <p>___&deg;C</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
