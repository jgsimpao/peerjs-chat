const http = require('http');
const fs = require('fs');

fs.readFile('web/index.html', (err, html) => {
    if (err) {
        throw err;
    }

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        res.write(html);
        res.end();
    });
});
