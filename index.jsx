var http = require('http');
var app = require('./app.tsx');
var PORT = process.env.PORT || 3001;
var server = http.createServer(app);
server.listen(PORT, function () {
    console.log("Listening on port " + PORT + " ");
});
