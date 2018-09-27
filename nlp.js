const fs = require('fs')
const {NlpManager} = require('node-nlp')

const LANGUAGE = 'en'
const TAGS = {
  NOW: {
    DEPLOY: ' now.deploy',
  },
}

const trainNlp = manager => {
  if (fs.existsSync('./model.nlp')) {
    manager.load('./model.nlp')
    return
  }
  manager.addDocument(LANGUAGE, 'Can you deploy', TAGS.NOW.DEPLOY)
  manager.addDocument(LANGUAGE, 'Can you deploy the application', TAGS.NOW.DEPLOY)
  manager.addDocument(LANGUAGE, 'Could you deploy the application', TAGS.NOW.DEPLOY)
  manager.addDocument(LANGUAGE, 'Could you deploy the application, please', TAGS.NOW.DEPLOY)

  manager.addAnswer(LANGUAGE, TAGS.NOW.DEPLOY, `Understood, I'm deploying now`)

  manager.train()
  manager.save('./model.nlp')
}

const getIntent = async input => {
  const manager = new NlpManager({languages: [LANGUAGE]})
  trainNlp(manager)

  try {
    const result = await manager.process('deploy')

    if (result.intent === TAGS.NOW.DEPLOY) {
      console.log(result.answer, 'executing deploy command')
    }
  } catch (error) {}
}

module.exports = {
  getIntent,
}
