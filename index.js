const ChatBot = require('./src/chatbot');

const databasePath = 'db.json';

const chat = new ChatBot(databasePath);

module.exports = {
  respond: (input) => chat.respond(input),
  train: (input, response) => chat.train(input, response),
  untrain: (input, response) => chat.untrain(input, response),
  loadData: () => chat.loadData(),
  saveData: () => chat.saveData(),
  getData: (input) => chat.getData(input),
  updateData: (input , newResponses) => chat.updateData(input,newResponses),
  queryData: (input) => chat.queryData(input),
};