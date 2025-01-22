
const apiKey = '7cfec32e90cd691f34381aa9a3026f86';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const timeElement = document.getElementById('time');
const weatherIcon = document.getElementById('weatherIcon');
const test = document.getElementById('test');

console.log(locationInput)

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
        // storedUserData();
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // name of the location
            locationElement.textContent = data.name;
            // temperature of the location
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            // description of the locaton
            descriptionElement.textContent = data.weather[0].description;
            // curent time of the location
            const unixTime = data.dt + data.timezone;
            const dateObj = new Date(unixTime * 1000);
            const utcString = dateObj.toUTCString();
            timeElement.textContent = utcString;
            //icon that describ the
            //console.log(data);
            const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            weatherIcon.setAttribute('src', iconURL);
            // data store
            localStorage.setItem('item', JSON.stringify(data))
            
            const stordata = localStorage.getItem('item')
            
            if(stordata) {
                const userdata = JSON.parse(stordata)
                console.log(userdata);
                test.textContent = data.name;
            }else{
                console.log('User data not found in local storage')
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// function storedUserData(location) {
//     const urll = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
//     // console.log(datat)

//     fetch(urll)
//         .then(datat => {
//         })
// }
