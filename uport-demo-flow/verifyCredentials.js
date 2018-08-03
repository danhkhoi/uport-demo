const express = require('express');
const uport = require('uport');
const jsontokens = require('jsontokens')
const bodyParser = require('body-parser')

const signer = uport.SimpleSigner('8a0b5361f0ff7341103ad2fc7d2f17f69e703160ab105fa04afdd867c47617c3')
const endpoint = "101.99.31.77:8081";  // replace this with a public IP or HTTP tunnel

const credentials = new uport.Credentials({
  appName: 'Credential Tutorial',
  address: '2oirHpu1a8ESSd7iNQeKdGVwcq5cET72gos',
  signer: signer
})

const app = express();

app.use(bodyParser.json({ type: '*/*' }))

app.get('/', function (req, res) {

  credentials.createRequest({
    verified: ['My Title'],
    callbackUrl: `${endpoint}/callback`,
    exp: Math.floor(new Date().getTime()/1000) + 300
  }).then( function(requestToken) {
    let uri = 'me.uport:me?requestToken=' + requestToken + '%26callback_type=post'
    let qrurl = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + uri
    let mobileUrl = 'https://id.uport.me/me?requestToken=' + requestToken + '&callback_type=post'
    console.log(uri)
    res.send('<div><img src=' + qrurl + '></img></div><div><a href=' + mobileUrl + '>Click here if on mobile</a></div>');
  })

})

app.post('/callback', function (req, res) {

  let jwt = req.body.access_token
  console.log(jwt)

  credentials.receive(jwt).then( function(creds) {
    console.log(creds)
    if (creds.address == creds.verified[0].sub) {
      console.log('\n\nCredential verified.');
    } else {
      console.log('\n\nVerification failed.');
    }
  })

})

let server = app.listen(8081, function () {
  console.log("\n\nCredential Verification service up and running!");
  console.log(`Open your browser to ${endpoint} to test the service. \n`);
  console.log("Watch this console for results from the service. \n")
  console.log("Service Output: \n")
})
