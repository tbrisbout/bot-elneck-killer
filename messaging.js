const { keyAuthClient, botAuthClient, botClient } = require("./bot-client");

const ROOM_ID = 'AVJ3k1TbmbVNZHAK5oU8xH___pnmDZnkdA';
const GET_MESSAGE_URL = `/agent/v4/stream/${ROOM_ID}/message?since=1538001303`;
const POST_MESSAGE_URL = `/agent/v4/stream/${ROOM_ID}/message/create`;
const STREAM_URL = '/pod/v1/streams/list';


const formatMessageML = content =>
  `<messageML>${content}</messageML>`

module.exports = async (content) => {
  const { token: sessionToken } = JSON.parse(await botAuthClient.post());
  const { token: keyManagerToken } = JSON.parse(await keyAuthClient.post());

  const headers = { sessionToken, keyManagerToken };

  const message = formatMessageML(content);

  const data = await botClient.post({ uri: POST_MESSAGE_URL, headers, formData: { message } });

  return data;
}
