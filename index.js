const express = require('express');
const app = express();
//const ExpressPeerServer = require('peer').ExpressPeerServer;

app.use(express.static(__dirname + '/public'));

const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
const ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0';

//const server = http.createServer(myServerFunction);
//server.listen(port, ip);

app.listen(port, ip);

//const port = process.env.PORT || 9000;
//const server = app.listen(port);
//const server = app.listen(5000);
//const options = {debug: true};
//const peerserver = ExpressPeerServer(server, options);

//app.use('/api', peerserver);
