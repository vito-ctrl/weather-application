
const apikey = '7cfec32e90cd691f34381aa9a3026f86';
const apiurl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windDirectionElement = document.getElementById("windDirection");
const weatherIcon = document.getElementById('weatherIcon');
const addToFavoritesButton = document.getElementById('addToFavorites');
const favoritesList = document.getElementById('favorites');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

addToFavoritesButton.addEventListener('click', () => {
    const location = locationElement.textContent;
    const temperature = temperatureElement.textContent;

    if (location && !favorites.some(fav => fav.city === location)) {
        favorites.push({ city: location, temperature });
        saveFavorites();
        updateFavoritesUI();
    }
});

function fetchWeather(location) {
    const url = `${apiurl}?q=${location}&appid=${apikey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or invalid request');
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}`;
            descriptionElement.textContent = data.weather[0].description;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            windDirectionElement.textContent = `Wind speed: ${data.wind.speed} km/h`;
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherIcon.alt = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}
function updateFavoritesUI() {
    favoritesList.innerHTML = ''; // Clear the current list

    favorites.forEach(fav => {
        // Create a list item
        const li = document.createElement('li');
        li.textContent = `${fav.city} - ${fav.temperature}Â°C`;

        // "Show Details" button with an icon
        const showDetailsButton = document.createElement('button');
        showDetailsButton.innerHTML = "<box-icon name='show-alt'></box-icon>";
        showDetailsButton.classList.add('details-button');
        showDetailsButton.addEventListener('click', () => fetchWeather(fav.city));

        // "Remove" button with trash icon
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.innerHTML = "<box-icon name='trash'></box-icon>";
        removeButton.addEventListener('click', () => removeFavorite(fav.city));

        // Append buttons to the list item
        li.appendChild(showDetailsButton);
        li.appendChild(removeButton);

        // Add the list item to the favorites list
        favoritesList.appendChild(li);
    });
}


function removeFavorite(city) {
    favorites = favorites.filter(fav => fav.city !== city);
    saveFavorites();
    updateFavoritesUI();
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Initialize favorites on page load
window.addEventListener('load', () => {
    updateFavoritesUI();
});