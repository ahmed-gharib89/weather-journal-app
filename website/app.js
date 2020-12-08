/* Global Variables */
const key = "1d0c659b351147dd0ee55a69ab92bd63";
const units = "&units=metric"
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?appid=" + key + units;
const generateButton = document.getElementById('generate');
const zipCodeInput = document.getElementById('zip');
const feelingTextArea = document.getElementById('feelings');

// Create a new date instance dynamically with JS
/**
 * @description Get current date
 * @returns {string} Current date in format MM.DD.YYYY
 */
const getDate = () => {
    const d = new Date();
    return (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
};

// Get the weather data from openweathermap.org API
/**
 * @description     Gets weather data for today by zipcode
 * @param {string}  url the url for openweathermap.org with the key and units to be used
 * @param {string}  zipCode the zip code for the city to get it's weather data
 * @returns {object}   Weather data
 */
const getWeatherData = async (url = baseUrl, zipCode = zipCodeInput.value) => {
    const fullUrl = url + "&zip=" + zipCode
    const request = await fetch(fullUrl);
    try {
        const weatherData = await request.json();
        console.log(weatherData)
        return weatherData;
    }
    catch (error) {
        console.log("error", error);
    }
};

// Send the data to the server side to save it
/**
 * @description     Post data
 * @param {string}  url the url used to trigger and send data to server side
 * @param {object}  data weather data to post
 */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Update the UI with the data
/**
 * @description       Update the UI with the new data
 * @param {string}    Date today's date
 * @param {string}    Temp the temperature for the city
 * @param {string}    Content the user input for feeling textArea
 */
const updateUI = async () => {
    const request = await fetch('/all')
    try {
        const allData = await request.json();
        console.log(allData)
        document.getElementById('date').innerText = allData.date;
        document.getElementById('temp').innerText = allData.temp;
        document.getElementById('content').innerText = allData.content;
    }
    catch (error) {
        console.log("error", error)
    }
};

/**
 * @description Gets weather data and send it to the server then updates the UI
 * 
 */
const getPostWeather = (e) => {
    getWeatherData(baseUrl, zipCodeInput.value)
        .then(function (weatherData) {
            let temp = "";
            if (weatherData.main) {
                temp = weatherData.main.temp;
            };
            const data = {
                'temp': temp,
                'date': getDate(),
                'content': feelingTextArea.value
            };
            return data;
        })
        .then(function (data) {
            console.log(data);
            postData('/', data);
            return data;
        })
        .then(function (data) {
            updateUI();
        });
};

generateButton.addEventListener("click", getPostWeather);
