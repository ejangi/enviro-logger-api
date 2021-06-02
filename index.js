const express = require('express');
const app = express();

// eslint-disable-next-line node/no-extraneous-require
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// _API_KEY
const PRESHARED_AUTH_HEADER_KEY = 'x-custom-psk';
const PRESHARED_AUTH_HEADER_VALUE = process.env._API_KEY || 'mypresharedkey';

// GET /
app.get('/', async (req, res) => {
  try {
    res.status(200).json({status: 'ok', message: 'Welcome to the App!'});
  } catch (e) {
    console.error(e);
    res.status(500).json({status: 'ok', message: 'Internal Server Error'});
  }
});

// POST /log
app.post('/log', async (req, res) => {
  const psk = req.headers[PRESHARED_AUTH_HEADER_KEY];

  try {
    if (psk !== PRESHARED_AUTH_HEADER_VALUE) {
        res.status(403).json({
            status: 'forbidden',
            message: 'You are not authorized to access this API.',
        });
    } else {
        res.status(200).json({status: 'ok', message: 'Logging...'});
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({status: 'ok', message: 'Internal Server Error'});
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`enviro-logger is listening for HTTP requests on ${PORT}`);
});
