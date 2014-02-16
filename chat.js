var io = require('socket.io');

var socket = io.listen(3000, "121.32.1");

var people = {};

socket.on('connection', function(client) {

  // Member joins the room
  client.on('join', function(name){
    people[client.id] = name;
    client.emit('update', name + ' , you have joined this chat.');
  
    socket.sockets.emit('update', name + ' has joined the room.')
    socket.sockets.emit('update-people', people);
  });

  // Member sends a message
  client.on('send', function(msg){
    socket.sockets.emit('chat', people[client.id], msg);
  });

  // Member disconnects from the server
  client.on('disconnect', function() {
    socket.sockets.emit('update', people[client.id] + ' has left the room.");
    delete people[client.id];
    socket.sockets.emit('update-people', people);
  });
});
