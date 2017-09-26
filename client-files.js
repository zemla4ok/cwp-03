const net = require('net');
const port = 8124;
const client = new net.Socket();

client.setEncoding('utf8');
client.connect(port, function () {
    console.log('Connected');
    client.write('FILES');
});

client.on('data', (data) => {
});

client.on('close', function () {
    console.log('Connection closed');
});