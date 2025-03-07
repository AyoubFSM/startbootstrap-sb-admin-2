const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Variable to store the latest data
let latestData = {};

// Route to receive data from ESP32
app.post('/data', (req, res) => {
  const { temperature, humidity , numConnected, signalStrength} = req.body;

  // Validate incoming data
  if (temperature === undefined || humidity === undefined || numConnected === undefined || signalStrength === undefined) {
    return res.status(400).send('Invalid data format. Please send temperature and humidity.');
  }

  latestData = { temperature, humidity, numConnected , signalStrength, timestamp: new Date().toISOString() };

  console.log('Data received:', latestData);
  res.status(200).send('Data received successfully');
});

// Route to serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get the latest data
app.get('/data/latest', (req, res) => {
  res.json(latestData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
