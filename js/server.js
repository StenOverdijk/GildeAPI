const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000;

const subscriptionKey = 'b5e309223ff14a31aa1d18321812af71'; // Replace with your actual subscription key

app.use(cors());
app.use(express.static('public'));

app.get('/disruptions', async (req, res) => {
  try {
    const response = await fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/disruptions?type=&isActive=', {
      headers: {
        'Accept-Language': 'nl-NL, nl;q=0.9, en;q=0.8, *;q=0.5',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      }
    });

    if (!response.ok) {
      throw new Error('Non-successful response from NS API');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching NS disruptions:', error.message);
    res.status(500).json({ error: 'Error fetching NS disruptions' });
  }
});

app.get('/nearest-stations/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const limit = req.query.limit || 5;

    const response = await fetch(`https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations/nearest?lat=${lat}&lng=${lng}&limit=${limit}`, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      }
    });

    console.log('NS API Response:', response.status, response.statusText);
    const data = await response.json();
    console.log('NS API Data:', data);

    if (!response.ok) {
      throw new Error('Non-successful response from NS API');
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching nearest stations:', error.message);
    res.status(500).json({ error: 'Error fetching nearest stations' });
  }
});




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
