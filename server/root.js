import express from 'express';
import http from 'http'
import WebSocket from 'ws';
import mongoose from 'mongoose'

import User from "./Models/userSchema.js"

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

ws.on('connection', async function connection(socket) {

    socket.send('Welcome New Client!');
    const data = await User.find({})
    socket.send(JSON.stringify(data))

    // console.log(socket)

    socket.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    socket.on('getuser', async function incoming() {
        console.log('received: %s', user);
    });


});

app.use(express.json()) // to send post request
app.use(express.urlencoded({ extended: true }))

app.get('/test', (req, res) => res.send('Hello World!ofo! test working'))

app.use('/auth/', AuthRoute)

server.listen(4000, () => console.log(`Server Connected OFO-Api-S4000`))