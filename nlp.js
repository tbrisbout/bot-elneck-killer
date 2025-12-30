const fs = require('fs')
const {NlpManager} = require('node-nlp')
const { deploy } = require('./nowClient');

const LANGUAGE = 'en'
const TAGS = {
  TRELLO: {
    VALIDATE: 'trello.validate',
    ASSIGN: 'trello.assign',
    MOVE: 'trello.move',
    INFO: 'trello.infos',
    STATUS: 'trello.status',
  },
  NOW: {
    DEPLOY: 'now.deploy',
  },
}

const trainNlp = manager => {
  // if (fs.existsSync('./model.nlp')) {
  //   manager.load('./model.nlp')
  //   return
  // }
  // deployment
  manager.addDocument('en', 'Deploy', TAGS.NOW.DEPLOY)
  manager.addDocument('en', 'Deploy this branch', TAGS.NOW.DEPLOY)
  manager.addDocument('en', 'Deploy in production', TAGS.NOW.DEPLOY)
  manager.addDocument('en', 'I want to deploy', TAGS.NOW.DEPLOY)
  manager.addDocument('en', 'New deployment', TAGS.NOW.DEPLOY)
  manager.addDocument('en', 'push this feature', TAGS.NOW.DEPLOY)
  // Ticket Assignation
  manager.addDocument('en', 'assign me on the ticket', TAGS.TRELLO.ASSIGN)
  manager.addDocument('en', 'I take the ticket', TAGS.TRELLO.ASSIGN)
  manager.addDocument('en', 'I took the ticket', TAGS.TRELLO.ASSIGN)
  // Ticket validation
  manager.addDocument('en', 'I valid ticket', TAGS.TRELLO.VALIDATE)
  manager.addDocument('en', 'I confirm ticket', TAGS.TRELLO.VALIDATE)
  // Move ticket
  manager.addDocument('en', 'move ticket', TAGS.TRELLO.MOVE)
  // Ticket information
  manager.addDocument('en', 'show me the ticket', TAGS.TRELLO.INFO)
  manager.addDocument('en', 'detail ticket', TAGS.TRELLO.INFO)
  manager.addDocument('en', 'read ticket', TAGS.TRELLO.INFO)
  manager.addDocument('en', 'info ticket', TAGS.TRELLO.INFO)
  // Ticket position
  manager.addDocument('en', 'status ticket', TAGS.TRELLO.STATUS)

  manager.addAnswer('en', TAGS.NOW.DEPLOY, 'I got it')
  manager.addAnswer('en', TAGS.NOW.DEPLOY, 'Copy that')
  manager.addAnswer('en', TAGS.NOW.DEPLOY, 'Here you go')

  manager.addAnswer('en', TAGS.TRELLO.ASSIGN, `It's ok, you are in charge now`)
  manager.addAnswer('en', TAGS.TRELLO.VALIDATE, 'I deploy that in production')
  manager.addAnswer('en', TAGS.TRELLO.MOVE, 'Ticket moved with success')
  manager.addAnswer('en', TAGS.TRELLO.INFOS, 'See detail here')
  manager.addAnswer('en', TAGS.TRELLO.STATUS, 'See the status here')

  manager.train()
  manager.save()
}


const manager = new NlpManager({languages: [LANGUAGE]})
trainNlp(manager)

const getIntent = async (input, options) => {
  try {
    const result = await manager.process(input)

    switch (result.intent) {
      case TAGS.NOW.DEPLOY:
        // call deploy api and make bot say the answer
        console.log(result.answer)
        const data = await deploy();
        return { text: result.answer, link: 'https://' + (data || {}).url };
      case TAGS.TRELLO.ASSIGN:
        // call Trello api and make bot say the answer
        console.log(result.answer)
        return result.answer;
      case TAGS.TRELLO.VALIDATE:
        // call Trello api and make bot say the answer
        console.log(result.answer)
        return result.answer;
      case TAGS.TRELLO.MOVE:
        // call Trello api and make bot say the answer
        console.log(result.answer)
        return result.answer;
      case TAGS.TRELLO.INFOS:
        // call Trello api and make bot say the answer
        console.log(result.answer)
        return result.answer;
      case TAGS.TRELLO.STATUS:
        // call Trello api and make bot say the answer
        console.log(result.answer)
        return result.answer;
    }
  } catch (error) {
    // make it learn \o/
    console.log(`I'm sorry, I didn't understand what you want me to do`)
  }
}

module.exports = {
  getIntent,
}
