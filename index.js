const express = require('express');
const app = express();
const ExpressPeerServer = require('peer').ExpressPeerServer;

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 9000;
const server = app.listen(port);

const options = {
    debug: true
}

const peerserver = ExpressPeerServer(server, options);

app.use('/api', peerserver);
