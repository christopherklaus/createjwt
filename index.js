const jwt = require('jsonwebtoken')
const uuid4 = require('uuid4')

const REST_API_CONFIG = {
  "version": "1.2",
  "type": "rest_api",
  "private_key_id": "xxx",
  "private_key": "xxx",
  "app_uri": "xxx",
  "app_id": "xxx"
}

const payload = {
  api_version: REST_API_CONFIG.version,
  app_id: REST_API_CONFIG.app_id,
  aud: REST_API_CONFIG.app_uri,
  iat: Math.round(Date.now() / 1000),
  jti: uuid4(),
  access_token: 'xxx',
}

const privateKey = Buffer.from(REST_API_CONFIG.private_key, 'utf8')
const jwtToken = jwt.sign(payload, privateKey, { algorithm: 'ES256' })

const request = require('request')

request.get({
  url: REST_API_CONFIG.app_uri + '/location',
  headers: {
    Authorization: 'Bearer ' + jwtToken
  }
}, (error, response, body) => {
  console.log('error:', error)
  console.log('statusCode:', response && response.statusCode)
  console.log('body:', body)
})
