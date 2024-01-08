const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '6565649261:AAGOcppydMk1tg49cKdvoTGuIeNsuVGb9eI';
// read the doc from https://github.com/yagop/node-telegram-bot-api to know how to catch the chatId
let chatId = 160411797;

const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"
//   console.log(chatId, msg)
//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

const telegrambot = (message, json) => {
  try {
    bot.sendMessage(chatId, message);
  } catch (err) {
    console.log('Something went wrong when trying to send a Telegram notification', err);
  }
}

const ACTIONS = {
  NEW_USER: '🙋‍♂️new user',
  NEW_MONITOR: '🖥 new monitor',
  LATENCY: '👨‍💻 somebody has used the latency tool',
  NEW_STATUS_PAGE: '📈 new status page',
  NEW_SUBSCRIPTION: '💰💰💰 a user has subscribed!',
  NEW_PAYMENT: '🤑 a payment has processed',
  WEEKLY_REPORTS_SENDING: '✴️ Weekly reports are being sent',
  WEEKLY_REPORTS_SENT: '✅ Weekly reports have been sent',
  END_TRIAL_USERS: '✋ end of trial users today',
  TRIAL_USERS_SOON_END: '👀 users that end their trials in 3 days',
}

module.exports = {
  telegrambot,
  ACTIONS
}
