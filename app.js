// Path: cloc.stwrd.net/app.js
function updateTime() {
    const now = new Date();

    const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));

    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    const estHours = estTime.getHours() % 12 || 12;
    const estMinutes = String(estTime.getMinutes()).padStart(2, '0');
    const estSeconds = String(estTime.getSeconds()).padStart(2, '0');
    const estTimeString = `${estHours}:${estMinutes}`;

    document.getElementById('top-clock').innerHTML = timeString;
    document.getElementById('bottom-clock').innerHTML = estTimeString;

}
setInterval(updateTime, 1000);

// function to insert day of the week, month, and day of the month into the date element
function updateDate() {
    const now = new Date();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
    const month = now.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = now.toLocaleString('en-US', { day: 'numeric' });

    const dateString = `${dayOfWeek}, ${month} ${dayOfMonth}`;

    document.getElementById('date').innerHTML = dateString;
}
setInterval(updateDate, 1000);

const apiKey = 'cee34975e4bf84d0c080f6a443c26ebc'; // Replace with your OpenWeatherMap API key

function updateWeather(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    document.getElementById('weather-icon').src = iconUrl;
    document.getElementById('weather-icon').alt = data.weather[0].description;

    const temp = Math.round(data.main.temp);
    document.getElementById('weather-temp').textContent = `${temp}°F`;
}

function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(updateWeather)
        .catch(error => console.log(error));
}

function initWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
                fetchWeather(apiUrl);
            },
            () => {
                const city = 'San Diego';
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
                fetchWeather(apiUrl);
            }
        );
    } else {
        const city = 'San Diego';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        fetchWeather(apiUrl);
    }
}

initWeather();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(error => console.log(error));
}
