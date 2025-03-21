// API Key and Base URLs
const API_KEY = '06ef3cc42959f1107836bccb0f153ba7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';
const UPDATE_INTERVAL = 10000; // Update every 10 seconds

// DOM Elements
const cityInput = document.getElementById('city_input');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const updateStatus = document.getElementById('update-status');
const statusText = document.getElementById('status-text');

// Variables to store current location
let currentLat = null;
let currentLon = null;
let currentCity = 'London'; // Default city
let updateTimer = null;
let isUpdating = false;
let lastUpdateTime = null;

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        currentCity = city;
        currentLat = null;
        currentLon = null;
        setUpdatingStatus(true);
        getWeatherData(city);
        resetUpdateTimer();
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        setUpdatingStatus(true);
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                currentLat = latitude;
                currentLon = longitude;
                currentCity = null;
                getWeatherDataByCoords(latitude, longitude);
                resetUpdateTimer();
            },
            error => {
                setUpdatingStatus(false);
                alert('Error getting location: ' + error.message);
            }
        );
    } else {
        alert('Geolocation is not supported by your browser');
    }
});

// Set updating status visual indicator
function setUpdatingStatus(updating) {
    isUpdating = updating;
    if (updating) {
        updateStatus.classList.add('updating');
        statusText.textContent = 'Updating weather data...';
    } else {
        updateStatus.classList.remove('updating');
        statusText.textContent = 'Auto-updates enabled';
    }
}

// Reset update timer
function resetUpdateTimer() {
    if (updateTimer) {
        clearInterval(updateTimer);
    }
    
    updateTimer = setInterval(() => {
        updateWeatherData();
    }, UPDATE_INTERVAL);
    
    // Create counter for next update
    startUpdateCountdown(UPDATE_INTERVAL / 1000);
}

// Start countdown for next update
function startUpdateCountdown(seconds) {
    let counter = seconds;
    const countdownInterval = setInterval(() => {
        counter--;
        if (counter <= 0) {
            clearInterval(countdownInterval);
        } else if (!isUpdating) {
            statusText.textContent = `Next update in ${counter} seconds`;
        }
    }, 1000);
}

// Update current weather data based on last search
function updateWeatherData() {
    setUpdatingStatus(true);
    if (currentLat !== null && currentLon !== null) {
        getWeatherDataByCoords(currentLat, currentLon);
    } else if (currentCity) {
        getWeatherData(currentCity);
    }
}

// Fetch weather data by city name
async function getWeatherData(city) {
    try {
        // Get coordinates for the city
        const geoResponse = await fetch(`${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`);
        const geoData = await geoResponse.json();
        
        if (geoData.length === 0) {
            setUpdatingStatus(false);
            alert('City not found');
            return;
        }

        const { lat, lon } = geoData[0];
        getWeatherDataByCoords(lat, lon);
    } catch (error) {
        setUpdatingStatus(false);
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data');
    }
}

// Fetch weather data by coordinates
async function getWeatherDataByCoords(lat, lon) {
    try {
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        
        // Fetch current weather
        const currentWeatherResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&_=${timestamp}`
        );
        const currentWeather = await currentWeatherResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&_=${timestamp}`
        );
        const forecast = await forecastResponse.json();

        // Fetch air pollution data
        const airPollutionResponse = await fetch(
            `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}&_=${timestamp}`
        );
        const airPollution = await airPollutionResponse.json();

        // Check if data has actually changed
        const currentTemp = Math.round(currentWeather.main.temp);
        const lastTemp = lastUpdateTime ? document.querySelector('.current-weather h2').textContent.replace('°C', '') : null;
        
        if (lastTemp !== currentTemp.toString()) {
            console.log(`Temperature changed from ${lastTemp}°C to ${currentTemp}°C`);
            updateUI(currentWeather, forecast, airPollution);
            lastUpdateTime = new Date();
        } else {
            console.log('No temperature change detected');
        }
        
        // Update page title with current temperature and city
        document.title = `${currentTemp}°C - ${currentWeather.name} | Weather App`;
        
        // Set updating status to false after data is loaded
        setUpdatingStatus(false);
        
    } catch (error) {
        setUpdatingStatus(false);
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data');
    }
}

// Update UI with weather data
function updateUI(currentWeather, forecast, airPollution) {
    // Update current weather
    document.querySelector('.current-weather h2').textContent = `${Math.round(currentWeather.main.temp)}°C`;
    document.querySelector('.current-weather p:last-child').textContent = currentWeather.weather[0].description;
    document.querySelector('.current-weather .weather-icon img').src = 
        `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

    // Update date and location
    const date = new Date();
    document.querySelector('.card-footer p:first-child').textContent = 
        date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.querySelector('.card-footer p:last-child').textContent = currentWeather.name;

    // Update 5-day forecast
    const dailyForecasts = forecast.list.filter(item => item.dt_txt.includes('12:00:00'));
    const forecastItems = document.querySelectorAll('.forecast-item');
    
    dailyForecasts.slice(0, 5).forEach((day, index) => {
        const date = new Date(day.dt * 1000);
        forecastItems[index].querySelector('span').textContent = `${Math.round(day.main.temp)}°C`;
        forecastItems[index].querySelector('p:nth-child(2)').textContent = 
            date.toLocaleDateString('en-US', { weekday: 'short' });
        forecastItems[index].querySelector('p:last-child').textContent = 
            date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        forecastItems[index].querySelector('img').src = 
            `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
    });

    // Update air quality
    const aqi = airPollution.list[0].main.aqi;
    const aqiText = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'][aqi - 1];
    const aqiClass = `aqi-${aqi}`;
    
    document.querySelector('.air-index').textContent = aqiText;
    document.querySelector('.air-index').className = `air-index ${aqiClass}`;

    // Update air pollution components
    const components = airPollution.list[0].components;
    // Map the air pollution component keys to their display names in the HTML
    const componentMap = {
        'pm2_5': 'PM2.5',
        'pm10': 'PM10',
        'so2': 'SO2',
        'co': 'CO',
        'no': 'NO',
        'no2': 'NO2',
        'nh3': 'NH3',
        'o3': 'O3'
    };
    
    // Find all air indices items
    const airIndicesItems = document.querySelectorAll('.air-indices .item');
    
    // Update each air quality component
    airIndicesItems.forEach(item => {
        const label = item.querySelector('p').textContent.trim();
        // Find the matching component key
        for (const [key, displayName] of Object.entries(componentMap)) {
            if (displayName === label) {
                // Update the value if we have this component
                if (components[key] !== undefined) {
                    item.querySelector('h2').textContent = components[key].toFixed(2);
                }
                break;
            }
        }
    });

    // Update sunrise and sunset
    const sunrise = new Date(currentWeather.sys.sunrise * 1000);
    const sunset = new Date(currentWeather.sys.sunset * 1000);
    
    document.querySelector('.sunrise-sunset .item:first-child h2').textContent = 
        sunrise.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.querySelector('.sunrise-sunset .item:last-child h2').textContent = 
        sunset.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Update other weather details
    document.getElementById('humidityval').textContent = `${currentWeather.main.humidity}%`;
    document.getElementById('pressureval').textContent = `${currentWeather.main.pressure}hpa`;
    document.getElementById('visibilityval').textContent = `${(currentWeather.visibility / 1000).toFixed(1)}km`;
    document.getElementById('windspeedval').textContent = `${currentWeather.wind.speed}m/s`;
    document.getElementById('feelsval').textContent = `${Math.round(currentWeather.main.feels_like)}°C`;

    // Update hourly forecast
    const hourlyForecasts = forecast.list.slice(0, 8);
    const hourlyCards = document.querySelectorAll('.hourly-forecast .card');
    
    hourlyForecasts.forEach((hour, index) => {
        const date = new Date(hour.dt * 1000);
        hourlyCards[index].querySelector('p:first-child').textContent = 
            date.toLocaleTimeString('en-US', { hour: 'numeric' });
        hourlyCards[index].querySelector('img').src = 
            `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`;
        hourlyCards[index].querySelector('p:last-child').textContent = 
            `${Math.round(hour.main.temp)}°C`;
    });
    
    // Add last updated time indicator
    updateLastUpdatedTime();
}

// Update the last updated time
function updateLastUpdatedTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Create or update last updated element
    let lastUpdatedElement = document.getElementById('last-updated');
    if (!lastUpdatedElement) {
        lastUpdatedElement = document.createElement('div');
        lastUpdatedElement.id = 'last-updated';
        lastUpdatedElement.style.textAlign = 'center';
        lastUpdatedElement.style.padding = '5px';
        lastUpdatedElement.style.marginBottom = '10px';
        lastUpdatedElement.style.fontSize = '12px';
        lastUpdatedElement.style.color = '#999';
        document.querySelector('.container').appendChild(lastUpdatedElement);
    }
    
    lastUpdatedElement.textContent = `Last updated: ${timeString}`;
}

// Initialize with a default city on page load
window.addEventListener('load', () => {
    setUpdatingStatus(true);
    getWeatherData('London'); // Default city when the page loads
    resetUpdateTimer();
});
