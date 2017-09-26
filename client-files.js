const net = require('net');
const fs = require('fs');
const port = 8124;
const client = new net.Socket();

let dirs = [];
client.setEncoding('utf8');
client.connect(port, function () {
    console.log('Connected');
    let paths = process.argv;
    for (let i = 2; i < paths.length; ++i) {
        //console.log(paths[i]);
        dirs.push(paths[i]);
    }
    client.write('FILES');
});

client.on('data', (data, err) => {
    if (err) {
        console.log(err);
    }
    else if (data === 'DEC') {
        client.destroy();
    }
    else if (data === 'ACK') {
        sendFilesToServer();
    }
});

client.on('close', function () {
    console.log('Connection closed');
});

function sendFilesToServer() {
    let arrayOfFiles = [];
    for (let i = 0; i < dirs.length; ++i) {
        arrayOfFiles = fs.readdirSync(dirs[i]);
        console.log(arrayOfFiles);
        for (let j = 0; j < arrayOfFiles.length; ++j) {
            console.log(dirs[i] + '\\' + arrayOfFiles[j]);
            let buffer = fs.readFileSync(dirs[i] + '\\' + arrayOfFiles[j], 'utf-8');
            console.log(buffer);
            client.write(buffer);
        }
    }
    client.destroy();
}