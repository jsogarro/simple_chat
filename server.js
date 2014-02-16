var http = require('http'),
    fs = require('fs'),
    io = require('socket.io'),
    index;

fs.readFile('./index.html', function (err, data) {
  if (err) 
    throw err;

  index = data;
});

// Create our Node server
var server = http.createServer(function (req, res) {
  res.writeHeader(200, {'Content-Type': 'text/html'});
  res.write(index);
  res.end();
}).listen(3000);

// Tell socket.io to listen to our server
var socket = io.listen(server);
