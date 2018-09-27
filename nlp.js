const fs = require('fs')
const {NlpManager} = require('node-nlp')

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
  manager.AddDocument('en', 'Deploy', TAGS.NOW.DEPLOY)
  manager.AddDocument('en', 'Deploy this branch', TAGS.NOW.DEPLOY)
  manager.AddDocument('en', 'Deploy in production', TAGS.NOW.DEPLOY)
  manager.AddDocument('en', 'I want to deploy', TAGS.NOW.DEPLOY)
  manager.AddDocument('en', 'New deployment', TAGS.NOW.DEPLOY)
  manager.AddDocument('en', 'push this feature', TAGS.NOW.DEPLOY)
  // Ticket Assignation
  manager.AddDocument('en', 'assign me on the ticket', TAGS.TRELLO.ASSIGN)
  manager.AddDocument('en', 'I take the ticket', TAGS.TRELLO.ASSIGN)
  manager.AddDocument('en', 'I took the ticket', TAGS.TRELLO.ASSIGN)
  // Ticket validation
  manager.AddDocument('en', 'I valid ticket', TAGS.TRELLO.VALIDATE)
  manager.AddDocument('en', 'I confirm ticket', TAGS.TRELLO.VALIDATE)
  // Move ticket
  manager.AddDocument('en', 'move ticket', TAGS.TRELLO.MOVE)
  // Ticket information
  manager.AddDocument('en', 'show me the ticket', TAGS.TRELLO.INFO)
  manager.AddDocument('en', 'detail ticket', TAGS.TRELLO.INFO)
  manager.AddDocument('en', 'read ticket', TAGS.TRELLO.INFO)
  manager.AddDocument('en', 'info ticket', TAGS.TRELLO.INFO)
  // Ticket position
  manager.AddDocument('en', 'status ticket', TAGS.TRELLO.STATUS)

  manager.AddAnswer('en', TAGS.NOW.DEPLOY, 'I got it')
  manager.AddAnswer('en', TAGS.NOW.DEPLOY, 'Copy that')
  manager.AddAnswer('en', TAGS.NOW.DEPLOY, 'There is the temporary URL')

  manager.AddAnswer('en', TAGS.TRELLO.ASSIGN, `It's ok, you are in charge now`)
  manager.AddAnswer('en', TAGS.TRELLO.VALIDATE, 'I deploy that in production')
  manager.AddAnswer('en', TAGS.TRELLO.MOVE, 'Ticket moved with success')
  manager.AddAnswer('en', TAGS.TRELLO.INFOS, 'See detail here')
  manager.AddAnswer('en', TAGS.TRELLO.STATUS, 'See the status here')

  manager.train()
  manager.save('./model.nlp')
}

const getIntent = async (input, options) => {
  const manager = new NlpManager({languages: [LANGUAGE]})
  trainNlp(manager)

  try {
    const result = await manager.process(input)

    switch (result.intent) {
      case TAGS.NOW.DEPLOY:
        // call deploy api and make bot say the answer
        console.log(result.answer)
        return
      case TAGS.TRELLO.ASSIGN:
        // call Trello api and make bot say the answer
        console.log(result.answer)
        return
      case TAGS.TRELLO.VALIDATE:
        // call Trello api and make bot say the answer
        console.log(result.answer)
        return
      case TAGS.TRELLO.MOVE:
        // call Trello api and make bot say the answer
        console.log(result.answer)
        return
      case TAGS.TRELLO.INFOS:
        // call Trello api and make bot say the answer
        console.log(result.answer)
        return
      case TAGS.TRELLO.STATUS:
        // call Trello api and make bot say the answer
        console.log(result.answer)
        return
    }
  } catch (error) {
    // make it learn \o/
    console.log(`I'm sorry, I didn't understand what you want me to do`)
  }
}

module.exports = {
  getIntent,
}
