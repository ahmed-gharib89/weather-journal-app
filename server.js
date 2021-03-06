// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

/**
 * @description Logs that the server is running to the console and it's port
 */
const listening = () => {
    console.log("Server is runing");
    console.log(`running on localhost: ${port}`);
};

// Start the server
const server = app.listen(port, listening);

/**
 * @description Add weather data to the projectData object
 * @param {object} req
 * @param {object} res
 */
const addData = (req, res) => {
    const data = req.body;
    projectData['date'] = data.date;
    projectData['temp'] = data.temp;
    projectData['content'] = data.content;
    console.log(projectData);
};

// Calling the app post with the home route
app.post('/', addData);

/**
 * @description Sending projectData to the client side
 * @param {object} req
 * @param {object} res
 */
const getData = (req, res) => {
    res.send(projectData);
    console.log(projectData);
};

// Calling app get with all route
app.get('/all', getData);