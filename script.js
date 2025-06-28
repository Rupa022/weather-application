const apiKey = '5f918a93d72037eacfd6fcf081fc9b2b'; // Replace with your OpenWeatherMap API key
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const weatherConditionElement = document.getElementById('weather-condition');
const weatherIconElement = document.getElementById('weather-icon');
const humidityElement = document.getElementById('humidity');
const visibilityElement = document.getElementById('visibility');
const windSpeedElement = document.getElementById('wind-speed');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const dateTimeElement = document.getElementById('date-time');

// Function to update the clock
function updateClock() {
    const now = new Date();
    dateTimeElement.innerHTML = now.toLocaleString();
}

// Function to fetch weather data
function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                locationElement.innerText = `${data.name}, ${data.sys.country}`;
                temperatureElement.innerText = `${Math.round(data.main.temp)}°C`;
                weatherConditionElement.innerText = data.weather[0].description;
                weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                humidityElement.innerText = `${data.main.humidity}%`;
                visibilityElement.innerText = `${(data.visibility / 1609.34).toFixed(2)} mi`; // Convert meters to miles
                windSpeedElement.innerText = `${data.wind.speed} Km/h`;
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data. Please try again later.');
        });
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Update the clock every second
setInterval(updateClock, 1000);

// Fetch default weather for a predefined city on page load
fetchWeather('Nangloi Jāt');