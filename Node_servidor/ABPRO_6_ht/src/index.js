const http = require('http');
const path = require('path');
const { handleSendRequest } = require('./routes/index');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/send') {
    handleSendRequest(req, res);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
