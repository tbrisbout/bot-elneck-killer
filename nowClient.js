const rp = require('request-promise')
const BASE_URL = 'https://api.zeit.co/v3'
const TEAM_ID = 'hackathon-symphony'
const TOKEN = process.env.TOKEN_NOW

const CONFIG = {
  baseUrl: BASE_URL,
  json: true,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
}

const nowClient = rp.defaults(CONFIG)

const deploy = async () => {
  try {
    const deployed = await nowClient.post({
      uri: '/now/deployments',
      body: {
        public: true,
        name: 'todoreact',
        deploymentType: 'STATIC',
        files: [
          {sha: '9b07df79c1db56a15c4e7bd411efc4b6517eef3c', file: 'asset-manifest.json', size: 160},
          {sha: '1120538c77ad1f28a89243b4b53fe2ac16cc3bc6', file: 'favicon.ico', size: 160},
          {sha: '5f34f5740ce248100ea81c2a910fb256289a8ac5', file: 'index.html', size: 160},
          {sha: '21c42782b633240e91fe0016e7eccccae7312ac2', file: 'manifest.json', size: 160},
          {sha: '590bf31d9c76613d2f641e9a90032f515a6ebcfc', file: 'service-worker.js', size: 160},
          {sha: 'da39a3ee5e6b4b0d3255bfef95601890afd80709', file: 'static', size: 160},
          {sha: 'e508eb8e29b5628fc0547faa032a3c1d236a3b80', file: 'static/css/main.c17080f1.css', size: 160},
          {sha: '2dc1cb265292f9bf1def105e73fa7b2e84e5e397', file: 'static/cssmain.c17080f1.css.map', size: 160},
          {sha: '1cce9ff47972a3280fd14a397b5d8472388ccbbf', file: 'static/js/main.d1cb61c2.js', size: 160},
          {sha: '95b2d6d8a71c7c7523e5e13e97dd9bd6dddcf0ce', file: 'statis/js/main.d1cb61c2.js.map', size: 160},
          {sha: 'aff68d3eb65414ecd2fa6e0e9d43cd7485a935c9', file: 'static/media/logo.5d5d9eef.svg', size: 160},
        ],
      },
    })
    return deployed
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  deploy,
}
