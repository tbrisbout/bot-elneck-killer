const { send, json } = require("micro");
const { getOr } = require("lodash/fp");

const postMessage = require("./messaging.js");
//const { createWebHook } = require("./trello/business");

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
  if (req.url.includes("favicon")) return "";

  try {
    data = await json(req);

    actionSwitcher(data);
  } catch (err) {
    data = "This is a trello webhook.";
  }

  let token;
  try {
    data = await postMessage("Hello BNPP CIB Team");
  } catch (err) {
    data = err;
  }

  // Create webhook by passing callbackUrl (must be unique).
  // try {
  //   data = await createWebHook(
  //     `https://bot-elneck-killer.now.sh?version=${Date.now()}`
  //   );
  // } catch (err) {
  //   data = err;
  // }

  console.log("-----> Debug data", data);

  send(res, statusCode, data);
};
