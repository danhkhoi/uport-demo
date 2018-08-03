const express = require('express');
const uport = require('uport');
const jsontokens = require('jsontokens')

const app = express();
const signer = uport.SimpleSigner('8a0b5361f0ff7341103ad2fc7d2f17f69e703160ab105fa04afdd867c47617c3')


const credentials = new uport.Credentials({
  appName: 'Credential Demo',
  address: '2oirHpu1a8ESSd7iNQeKdGVwcq5cET72gos',
  signer: signer

})

app.get('/', function (req, res) {
  credentials.attest({
    sub: '2owiYmxNW2ryGBKrnFi2zL34foYfexb487s',
    exp: 1552046024,
    claim: {'My Title' : {'KeyOne' : 'ValueOne', 'KeyTwo' : 'Value2', 'Last Key' : 'Last Value'} }
   
  }).then(function (att) {
    console.log(att)
    console.log(jsontokens.decodeToken(att))
    let uri = 'me.uport:add?attestations=' + att + '%26callback_type=post'
    let qrurl = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + uri
    let mobileUrl = 'https://id.uport.me/add?attestations=' + att + '&callback_type=post'
    console.log(uri)
    res.send('<div><img src=' + qrurl + '></img></div><div><a href=' + mobileUrl + '>Click here if on mobile</a></div>')
  })
})

let server = app.listen(8081, function () {
  console.log("\n\nCredential Creation service up and running!");
  console.log("Open your browser to http://localhost:8081 to test the service. \n");
  console.log("Watch this console for results from the service. \n")
  console.log("Service Output: \n")
})
