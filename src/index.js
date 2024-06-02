// sample code, please replace the content with your code

import { createServer } from 'http';  // ES module import

const os = require('os');  // CommonJS require

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello, your OS is ${os.type()}`);
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
