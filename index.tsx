
console.log('here');
require('dotenv').config();
const http = require('http');
const app = require('./app.tsx');

const PORT = process.env.PORT || 3001;

console.log('creating server');
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} `)
});

module.exports=server;
