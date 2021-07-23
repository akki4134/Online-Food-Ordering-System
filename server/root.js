import express from 'express';
import http from 'http'
import WebSocket from 'ws';
import mongoose from 'mongoose'

const app = express()
const server = http.createServer(app)

const ws = new WebSocket.Server({ server });

mongoose.connect('mongodb://localhost/ofo',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection ERROR: " + err.message);
});

ws.on('connection', function connection(socket) {
    console.log('A new client Connected!');
    socket.send('Welcome New Client!');

    socket.on('message', function incoming(message) {
        console.log('received: %s', message);

        ws.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });

    });
});

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(4000, () => console.log(`Server Connected OFO-Api-S4000`))