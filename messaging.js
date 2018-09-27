const { get, isEmpty } = require('lodash/fp');
const { keyAuthClient, botAuthClient, botClient } = require("./bot-client");
const { getIntent } = require('./nlp');

const ROOM_ID = 'AVJ3k1TbmbVNZHAK5oU8xH___pnmDZnkdA';
const GET_MESSAGE_URL = `/agent/v4/stream/${ROOM_ID}/message?since=`;
const POST_MESSAGE_URL = `/agent/v4/stream/${ROOM_ID}/message/create`;
const STREAM_URL = '/pod/v1/streams/list';


const formatMessageML = content =>
  `<messageML>${content}</messageML>`

const formatMessageLink = ({ text, link }, user) =>
  `<messageML>${text} ${user}, url: <a href="${link}">${link}</a></messageML>`

let connectedHeaders;

const sendMessage = async (content, user) => {
  try {
    const intent = await getIntent(content)

    const messageToPost = intent.link ? formatMessageLink(intent, user): formatMessageML(`${intent}, ${user}`);
    console.log('MESSAGE TO POST', messageToPost);

    await botClient.post({ uri: POST_MESSAGE_URL, headers: connectedHeaders, formData: { message: messageToPost } });
  } catch (e) {
    console.error(e)
  }
}


const parseMessage = (content = '', user = 'dear collaborator') =>
  sendMessage(content, user);

const pollMessage = () => {
  setInterval(async () => {
    const timestamp = Date.now() - 15000;
    let data;
    try {
      data = JSON.parse(await botClient.get({ uri: GET_MESSAGE_URL + timestamp, headers: {...connectedHeaders, 'content-type': 'application/json' }}));
    } catch (e) {
      console.error(e)
    }
    if (isEmpty(data)) return;
    console.log(data);
    const lastMessage = data[0];
    const user = get('user.firstName')(lastMessage)

    if (user.includes('bot')) return;
    console.log('intent', await getIntent(lastMessage.message));

    parseMessage(lastMessage.message, user);
  } , 15000)
}

const init = async (content) => {
  const { token: sessionToken } = JSON.parse(await botAuthClient.post());
  const { token: keyManagerToken } = JSON.parse(await keyAuthClient.post());

  const headers = { sessionToken, keyManagerToken };
  connectedHeaders = headers;

  const message = formatMessageML(content);

  const data = JSON.parse(await botClient.post({ uri: POST_MESSAGE_URL, headers, formData: { message } }));

  return data;
}

module.exports = { init, pollMessage, sendMessage };
