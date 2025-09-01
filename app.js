// Path: cloc.stwrd.net/app.js
let secondTimezone = 'America/New_York';

function getZoneAbbr(date, timeZone) {
    return Intl.DateTimeFormat('en-US', {
        timeZone,
        timeZoneName: 'short'
    })
        .formatToParts(date)
        .find(p => p.type === 'timeZoneName').value;
}

function updateTime() {
    const now = new Date();
    const secondTime = new Date(
        now.toLocaleString('en-US', { timeZone: secondTimezone })
    );

    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const meridian = now.getHours() >= 12 ? 'PM' : 'AM';
    const zone = getZoneAbbr(now, Intl.DateTimeFormat().resolvedOptions().timeZone);

    const secondHours = secondTime.getHours() % 12 || 12;
    const secondMinutes = String(secondTime.getMinutes()).padStart(2, '0');
    const secondMeridian = secondTime.getHours() >= 12 ? 'PM' : 'AM';
    const secondZone = getZoneAbbr(secondTime, secondTimezone);

    document.getElementById('top-clock').textContent = `${hours}:${minutes}`;
    document.getElementById('top-label').textContent = `${meridian} ${zone}`;
    document.getElementById('bottom-clock').textContent = `${secondHours}:${secondMinutes}`;
    document.getElementById('bottom-label').textContent = `${secondMeridian} ${secondZone}`;
}
setInterval(updateTime, 1000);
updateTime();

// function to insert day of the week, month, and day of the month into the date element
function updateDate() {
    const now = new Date();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'short' });
    const month = now.toLocaleString('en-US', { month: 'short' });
    const dayOfMonth = now.toLocaleString('en-US', { day: 'numeric' });

    const dateString = `${dayOfWeek}<br>${month} ${dayOfMonth}`;

    document.getElementById('date').innerHTML = dateString;
}
setInterval(updateDate, 1000);
updateDate();

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

document.getElementById('settings').addEventListener('click', () => {
    document.getElementById('settings-panel').classList.toggle('hidden');
});

document.getElementById('timezone-select').addEventListener('change', event => {
    secondTimezone = event.target.value;
    updateTime();
});
