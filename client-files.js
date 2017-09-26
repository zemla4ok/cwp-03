const net = require('net');
const port = 8124;
const client = new net.Socket();

let dirs = [];
client.setEncoding('utf8');
client.connect(port, function () {
    console.log('Connected');
    for(let i = 0;i<process.argv.length;i++){
        dirs.push(__dirname + process.argv[i]);
    }
    client.write('FILES');
});

client.on('data', (data) => {
    console.log(data);
});

client.on('close', function () {
    console.log('Connection closed');
});