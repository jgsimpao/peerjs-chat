const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

fs.readFile('web/index.html', (err, html) => {
    if (err) {
        throw err;
    }

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(html);
        res.end();
    });

    server.listen(PORT, () => {
        
    });
});
