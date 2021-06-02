const assert = require('assert');
const {request} = require('gaxios');

const port = process.env.PORT || '8080';
const url = process.env.SERVICE_URL || `http://localhost:${port}`;

const PRESHARED_AUTH_HEADER_KEY = 'x-custom-psk';
const PRESHARED_AUTH_HEADER_VALUE = process.env._API_KEY || 'mypresharedkey';

describe('Default route', () => {
  it('can respond to an HTTP request', async () => {
    console.log(`    - Requesting GET ${url}/...`);

    const res = await request({
      url: url + '/',
      timeout: 5000,
    });

    assert.equal(res.status, '200');
    assert.ok(res.data.message.includes('Welcome to the App!'));
  });
});

describe('/log route', () => {
  it('can respond to an HTTP post request', async () => {
    console.log(`    - Requesting POST ${url}/log`);
    const headers = {};
    headers[PRESHARED_AUTH_HEADER_KEY] = PRESHARED_AUTH_HEADER_VALUE;

    const res = await request({
      url: url + '/log',
      method: 'POST',
      timeout: 5000,
      headers: headers,
      data: {
        "datetime": new Date(),
        "eco2": 400,
        "tvoc": 10
      }
    });

    assert.equal(res.status, '200');
    assert.equal(res.data.message, 'Logged successfully');
  });
});
