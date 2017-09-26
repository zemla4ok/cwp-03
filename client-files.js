const net = require('net');
const port = 8124;
const client = new net.Socket();

client.setEncoding('utf8');
client.connect(port, function () {
    console.log('Connected');
    client.write('FILES1');
});

client.on('data', (data) => {
    console.log(data);
});

client.on('close', function () {
    console.log('Connection closed');
});