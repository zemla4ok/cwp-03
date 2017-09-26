const net = require('net');
const fs = require('fs');
const port = 8124;
const defDir = process.env.MY_TEMP;
const maxNumb = parseInt(process.env.MAX_NUMB);
let seed = 0;
let number = 1;
let numOfClients = 0;
const logger = fs.createWriteStream('client_id.txt');
const server = net.createServer((client) => {
    if (++numOfClients > maxNumb) {
        client.write('DEC');
        return;
    }
    console.log(numOfClients);
    logger.write('client ' + client.id + ' disconnected\n');
    client.setEncoding('utf8');

    client.on('data', (data) => {
        if (data === 'FILES') {
            client.write('ACK');
            client.id = seed++;
            logger.write('Client ' + client.id + ' connected\n');
        }
        else {
            //client.write('DEC');
            console.log(data);
            let dir = defDir.slice(0, -1) + '\\\\' + client.id;
            createDir(dir);
            let file = dir + '\\' + (number++) + '.txt';
            let f = fs.createWriteStream(file);
            f.write(data);
        }
    });

    client.on('end', () => {
        logger.write('client ' + client.id + ' disconnected\n');
    });
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});

function createDir(path) {
    if (!fs.existsSync(path))
        fs.mkdirSync(path);
}
