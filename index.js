const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const visitors = require('./js/visitors');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    let fileUrl;
    if (req.url == '/') fileUrl = '/index.html';
    else fileUrl = req.url;

    let filePath = path.resolve('.' + fileUrl);
    let fileExt = path.extname(filePath);

    if (req.method == 'GET') {
        prepareFile(fileExt, filePath, res);
        return;
    } else if (req.method == 'POST') {
        prepareFile(fileExt, filePath, res);
        visitors.addVisitor('visitors.txt', req);
        return;
    } else {
        filePath = path.resolve('.' + '/404.html');
        prepareFile(fileExt, filePath, res);
        return;
    }
});

function prepareFile(fileExt, filePath, res) {
    if (fileExt == '.html') {
        fs.access(filePath, (err) => {
            if (err) {
                filePath = path.resolve('.' + '/404.html');
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
        });
    }
    else if (fileExt == '.css') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        fs.createReadStream(filePath).pipe(res);
    }
    else if (fileExt == '.js') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/css');
        fs.createReadStream(filePath).pipe(res);
    }
    else if (fileExt == '.jpg') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpg');
        fs.createReadStream(filePath).pipe(res);
    }
    else if (fileExt == '.ico') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/x-ico');
        fs.createReadStream(filePath).pipe(res);
    }
    else {
        filePath = path.resolve('.' + '/404.html');
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
    }
}
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});