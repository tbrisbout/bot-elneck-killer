const rp = require("request-promise");

const CONFIG = {
  baseUrl: process.env.TRELLO_API_URL || "https://api.trello.com",
  "content-type": "application/json",
  json: true
};

module.exports = rp.defaults(CONFIG);
