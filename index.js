const { send, json } = require("micro");
const { getOr } = require("lodash/fp");

const { botAuthClient, botClient } = require("./bot-client");

const TYPE_CREATE_CARD = "createCard";
const TYPE_UPDATE_CARD = "updateCard";

const sendNotification = (message, data = {}) => {
  console.log(`Send Notification ----> ${message}`, data);
};

const actionSwitcher = data => {
  const action = getOr({}, "action", data);
  const type = getOr("", "type", action);

  switch (type) {
    case TYPE_CREATE_CARD:
      sendNotification("Add new card", action);
      break;
    case TYPE_UPDATE_CARD:
      sendNotification("Update a card", action);
      break;
    default:
  }
};

module.exports = async (req, res) => {
  const statusCode = 200;
  let data;

  try {
    data = await json(req);

    actionSwitcher(data);
  } catch (err) {
    data = "This is a trello webhook.";
  }

  let token;
  try {
    data = token = await botAuthClient.post();
  } catch (err) {
    data = err;
  }

  console.log("-----> Debug data", data);

  send(res, statusCode, data);
};
