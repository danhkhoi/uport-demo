

const  uportConnect = require('uport-connect');
const qrcode = require('qrcode-terminal');
const mnidAddress = '2oirHpu1a8ESSd7iNQeKdGVwcq5cET72gos';
const signingKey = '8a0b5361f0ff7341103ad2fc7d2f17f69e703160ab105fa04afdd867c47617c3';
const appName = 'My App';

const uriHandler = uri => {
    qrcode.generate(uri, { small : true})
    console.log(uri);
} 

const uport = new uportConnect.Connect('Demo App', {
    uriHandler,
    clientId: mnidAddress,
    network: 'rinkeby',
    signer: uportConnect.SimpleSigner(signingKey),
    notification: 'true',
});

uport.requestCredentials({
    requested: ['name', 'avatar', 'phone', 'country'],
}).then(x=> console.log('gi gi do', x));


// uport.requestCredentials().then(x=> console.log('gi gi do', x));

uport.attestCredentials({
    sub: ''
});