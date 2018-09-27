const { send, json } = require("micro");

module.exports = async (req, res) => {
  const statusCode = 200;
  let data;

  try {
    data = await json(req);
  } catch (err) {
    data = "This is a trello webhook";
  }

  console.log("-----> Debug data", data);

  send(res, statusCode, data);
};
