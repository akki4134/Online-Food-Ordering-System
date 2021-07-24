import express from 'express';
import http from 'http'
import WebSocket from 'ws';
import mongoose from 'mongoose'

import AuthRoute from './Routes/userRoute.js'

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

app.use(express.json()) // to send post request
app.use(express.urlencoded({ extended: true }))

app.get('/test', (req, res) => res.send('Hello World!ofo! test working'))

app.use('/auth/', AuthRoute)

server.listen(4000, () => console.log(`Server Connected OFO-Api-S4000`))