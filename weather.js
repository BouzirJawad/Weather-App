
const searchBox = document.querySelector(".search-box");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "1f9410f779ca72a9af3f0612cfe1bbbe";

searchBox.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } 
        catch (error) {
            console.error(error);
            displayError(error);
        }
    } 
    else {
        displayError("Please enter a city !");
    }
});

async function getWeatherData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data !");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    
    const {name: city,
           main: {temp, humidity},
           wind: {speed},
           sys: {country},
           weather:[{description, id}]} = data;

    const emoji = getWeatherEmoji(id);

    card.innerHTML = `
        <div class="weather-info">
            <div class="weather-icon-container">
                <img src="${emoji}" alt="" class="weather-icon">
            </div>

            <div class="weather-info-container">
                <h1 class="temperature">${(temp - 273.15).toFixed(1)}°C</h1>
                <h4 class="location">${city},${country}</h4>
                <p class="condition">${description}</p>
                <div class="extra-info">
                    <div>
                        <img src="./media/humidity.png" alt="">
                        <p>${humidity}%</p>
                        <p>Humidity</p>
                    </div>
                    <div>
                        <img src="./media/windi.png" alt="">
                        <p>${speed}Km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div> 
        </div>

        <div class="forecast">
            <div class="days">
                <img src="./media/sun.png" alt="weather icons"><br>
                <p>Thuesday</p>
                <p>6.7°C</p>
            </div>

            <div class="days">
                <img src="./media/wind.png" alt="weather icons"><br>
                <p>Wednesday</p>
                <p>5.8°C</p>
            </div>

            <div class="days">
                <img src="./media/cloudy.png" alt="weather icons"><br>
                <p>Thursday</p>
                <p>4.7°C</p>
            </div>

            <div class="days">
                <img src="./media/rain.png" alt="weather icons"><br>
                <p>Friday</p>
                <p>4.3°C</p>
            </div>

            <div class="days">
                <img src="./media/sun.png" alt="weather icons"><br>
                <p>Saturday</p>
                <p>6.2°C</p>
            </div>
            
        </div>
    `;
    card.style.display = "block";
}

function getWeatherEmoji(weatherId) {
    
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "./media/thunder.png";
        
        case (weatherId >= 300 && weatherId < 500):
            return "./media/heavy-rain.png";

        case (weatherId >= 500 && weatherId < 515):
            return "./media/rain.png";

        case (weatherId >= 515 && weatherId < 600):
            return "./media/heavy-rain.png";

        case (weatherId >= 600 && weatherId < 700):
            return "./media/snowy.png";

        case (weatherId >= 700 && weatherId < 800):
            return "./media/cloudy.png";

        case (weatherId === 800):
            return "./media/sunny.png";

        case (weatherId > 800):
            return "./media/sun.png";

        default:
            return "./media/earth.png";
    }
}

function displayError(message) {
    
    const errorDisplay = document.createElement("h1");
    errorDisplay.classList.add("errorMessage");

    errorDisplay.textContent = message;

    card.textContent = "";
    card.style.display = "block";
    card.appendChild(errorDisplay);
}