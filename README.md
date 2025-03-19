# Real-Time Weather App

A modern, responsive weather application that provides real-time weather updates with automatic data refresh every 10 seconds.

![Weather App Screenshot showing Delhi weather at 29°C with poor air quality, 5-day forecast, and detailed weather metrics including PM2.5, PM10, humidity at 28%, and wind speed of 3.6m/s](weather-app-screenshot.png)

## Features

- **Live Weather Updates**: Data refreshes automatically every 10 seconds
- **Current Weather Conditions**: Temperature, weather description, and weather icon
- **5-Day Forecast**: Extended weather forecast with daily temperatures
- **Today's Highlights**: Comprehensive weather data including:
  - Air Quality Index with detailed pollution components
  - Sunrise and Sunset times
  - Humidity, Pressure, Visibility
  - Wind Speed
  - "Feels Like" temperature
- **Hourly Forecast**: 8-hour forecast for the current day
- **Search by City**: Look up weather for any city worldwide
- **Current Location**: Get weather for your current location with geolocation
- **Visual Status Indicators**: Shows when data is being updated
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technologies Used

- HTML5
- CSS3 (with modern features like CSS variables and nested selectors)
- JavaScript (ES6+)
- OpenWeatherMap API
  - Current Weather API
  - 5-Day Forecast API
  - Air Pollution API
  - Geocoding API

## API Usage

This project uses the following OpenWeatherMap APIs:

1. **Geocoding API**: Convert city names to geographic coordinates
2. **Current Weather API**: Get current weather data
3. **5-Day Forecast API**: Get 5-day forecast data
4. **Air Pollution API**: Get air quality information

## Live Update System

The application implements a real-time update system that:

- Refreshes weather data every 10 seconds
- Shows visual indicators when data is being updated
- Provides a countdown timer to the next update
- Prevents browser caching to ensure fresh data
- Logs data changes in the console for debugging

## Installation and Setup

1. Clone the repository:
   ```
   [git clone https://github.com/ToothLess02/Weather-Dashboard.git](https://github.com/ToothLess02/Weather-Dashboard)
   ```

2. Open the project folder:
   ```
   cd Weather-Dashboard
   ```

3. Open `index.html` in your browser or use a local development server.

4. (Optional) Replace the API key in `script.js` with your own OpenWeatherMap API key if you plan to deploy the application.

## Usage

- **Search for a City**: Enter a city name in the search box and click "Search"
- **Use Current Location**: Click the "Current Location" button to get weather for your current location
- **View Detailed Information**: Scroll through the dashboard to see all weather details
- **Watch for Updates**: The status indicator at the top shows when data is being updated

## Browser Compatibility

The application works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Improvements

- Add ability to switch between Celsius and Fahrenheit
- Implement dark/light theme toggle
- Add weather alerts and notifications
- Create user accounts to save favorite locations
- Add historical weather data
- Implement weather maps

## License

MIT License

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Font Awesome](https://fontawesome.com/) and [Boxicons](https://boxicons.com/)
