const rp = require('request-promise');

const cert = Buffer.from(process.env.BOT_CERTIFICATE, 'base64').toString();
const key = Buffer.from(process.env.BOT_KEY, 'base64').toString();
const passphrase = process.env.BOT_PASSWORD;

const CONFIG = {
  'content-type': 'application/json',
  cert,
  key,
  passphrase
}

const baseClient = rp.defaults(CONFIG);

const botAuthClient = baseClient.defaults({
  uri: process.env.AUTH_URL || 'https://develop2-api.symphony.com/sessionauth/v1/authenticate'
});

const botClient = baseClient.defaults({
  baseUrl: process.env.POD_URL || 'https://develop2.symphony.com'
});

module.exports = { botAuthClient, botClient };
