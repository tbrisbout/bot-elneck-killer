const trelloClient = require("./client");

const key = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;

const defaultBoardId = "5bab4dcc2d79f9723ef248fa";

const createWebHook = (callbackURL, idModel = defaultBoardId) => {
  return trelloClient.post({
    uri: `1/tokens/${token}/webhooks`,
    body: {
      key,
      callbackURL,
      idModel,
      description: "Bot-elneck killer webhook"
    }
  });
};

const moveCardInList = (cardId, listId) => {
  return trelloClient.put({
    uri: `1/cards/${cardId}/idList?value=${listId}&key=${key}&token=${token}`
  });
};

module.exports = { createWebHook, moveCardInList };
