const apiKey = "aa870f51ccb0c1ac5e016aa35d4b1f49";
const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === "404") {
            throw new Error("City not found");
        }

        const { name, main, weather } = data;

        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        weatherInfo.innerHTML = `
            <h1>${name}</h1>
            <img src="${iconUrl}" alt="${weather[0].main}" class="weather-icon">
            <p>Temperature: ${Math.round(main.temp - 273.15)}°C</p>
            <p>Feels like: ${Math.round(main.feels_like - 273.15)}°C</p>
            <p>Description: ${weather[0].description}</p>
        `;
    } catch (error) {
        alert(error.message);
    }
});
