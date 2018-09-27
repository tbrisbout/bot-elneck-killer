const { send, json } = require('micro');
const { botAuthClient, botClient } = require('./bot-client');

module.exports = async (req, res) => {
  const statusCode = 200;
  let data;

  try {
    data = await json(req);
  } catch (err) {
    data = "This is a trello webhook";
  }

  let token;
  try {
    data = token = await botAuthClient.post();
  } catch (err) {
    data = err
  }


  console.log("-----> Debug data", data);

  send(res, statusCode, data);
};
