const express = require('express');
const app = express();
const port = 3000;
const Thermostat = require('./thermostat');
const thermostat = new Thermostat;

app.get('/temperature', (req, res) => {
  res.send(`Temperature: ${thermostat.getTemperature()}`);
});

app.post('/temperature/up', (req, res) => {
  thermostat.up();
  res.send('Request received');
});

app.post('/temperature/down', (req, res) => {
  thermostat.down();
  res.send('Request received');
});

app.delete('/temperature', (req, res) => {
  thermostat.reset();
  res.send('Luke is so kind');
});

console.log(`Server listening on localhost:${port}`);
app.listen(port);