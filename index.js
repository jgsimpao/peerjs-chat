const http = require('http');
//const fs = require('fs');
//const path = require('path');
const express = require('express');

const app = express();
//const publicPath = path.resolve(__dirname, 'public/css');

//app.use('/css', express.static('public/css'));
/*
app.get('/', (req, res) => {
    res.render('public/index');
});
*/

/*
app.listen(port, () => {
    console.log("http://localhost:${port}");
});
*/

app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 5000;
http.createServer(app).listen(port);
/*
const server = http.createServer((req, res) => {
    //if (req.url.indexOf('.html') !== -1) {
        fs.readFile(__dirname + '/public/index.html', (err, data) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
        console.log(req.url.indexOf('.html'));
    //}
    
    if (req.url.indexOf('.css') !== -1) {
        fs.readFile(__dirname + '/public/css/style.css', (err, data) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });
    }

    if (req.url.indexOf('.js') !== -1) {
        fs.readFile(__dirname + '/public/js/script.js', (err, data) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });
    }
    
});

server.listen(port);
*/