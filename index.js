const express = require('express');
const app = express();
const {BigQuery} = require('@google-cloud/bigquery');

// Parse the body as json
app.use(express.json());

// _API_KEY
const PRESHARED_AUTH_HEADER_KEY = 'x-custom-psk';
const PRESHARED_AUTH_HEADER_VALUE = process.env._API_KEY || 'mypresharedkey';

// BigQuery details
const BQ_DATASET_ID = process.env._DATASET_ID || 'mydatasetid';
const BQ_TABLE_ID = process.env._TABLE_ID || 'mytableid';



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
  const { body } = req;

  if (psk !== PRESHARED_AUTH_HEADER_VALUE) {
    res.status(403).json({
        status: 'forbidden',
        message: 'You are not authorized to access this API.',
    });
    res.end();
  }

  if (!body) {
    res.status(400).json({
        status: 'bad',
        message: 'The request body is empty.',
    });
    res.end();
  }

  try {    
    // Log it
    const bigqueryClient = new BigQuery();
    let rows = [];
    rows.push(body);

    // Insert data into a table
    await bigqueryClient
        .dataset(BQ_DATASET_ID)
        .table(BQ_TABLE_ID)
        .insert(rows);

    res.status(200).json({status: 'ok', message: `Logged successfully`});
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
