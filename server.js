const net = require('net');
const fs = require('fs');
const port = 8124;
let seed = 0;
const logger = fs.createWriteStream('client_id.txt');
const server = net.createServer((client) => {
    logger.write('client ' + client.id + ' disconnected\n');
    client.id = seed++;
    client.setEncoding('utf8');

    client.on('data', (data) => {
        if(data === 'FILES'){
            client.write('ACK');
        }
        else {
            client.write('DEC');
            client.destroy();
        }
    });

    client.on('end', () => {
        logger.write('client ' + client.id + ' disconnected\n');
    });
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});

function getRandom(){
    return Math.random() > 0.5 ? '1' : '0';
}