const express = require('express');
const uport = require('uport');
const jsontokens = require('jsontokens')
const bodyParser = require('body-parser')

const signer = uport.SimpleSigner('8a0b5361f0ff7341103ad2fc7d2f17f69e703160ab105fa04afdd867c47617c3');
const endpoint = "101.99.31.77:8081";   //public ip

const credentials = new uport.Credentials({
  appName: 'Credential Tutorial',
  address: '2od4Re9CL92phRUoAhv1LFcFkx2B9UAin92',
  signer: signer
})

const app = express();

app.use(bodyParser.json({ type: '*/*' }))

app.get('/', function (req, res) {
  credentials.createRequest({
    callbackUrl: `${endpoint}/callback`,
    exp: Math.floor(new Date().getTime()/1000) + 300
  }).then( function(requestToken) {
    let uri = 'me.uport:me?requestToken=' + requestToken + '%26callback_type=get'
    let qrurl = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + uri
    let mobileUrl = 'https://id.uport.me/me?requestToken=' + requestToken + '&callback_type=post'
    console.log(uri)
    res.send('<div><img src=' + qrurl + '></img></div><div><a href=' + mobileUrl + '>Click here if on mobile</a></div>');
  })

})

app.get('/callback', function (req, res) {
  let jwt = req.body.access_token
  console.log("\n\nJWT (access token): \n");
  console.log(jwt);

  credentials.receive(jwt).then( function(creds) {
    console.log("\n\nDecoded JWT: \n");
    console.log(creds);
  })
})

let server = app.listen(8081, function () {
  console.log("\n\nCredential Requestor service up and running!");
  console.log(`Open your browser to ${endpoint} to test the service. \n`);
  console.log("Watch this console for results from the service. \n")
  console.log("Service Output: \n")
})
