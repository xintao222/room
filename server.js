var express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app),
    db = require('redis').createClient(),
    room = require('./src/room');

db.on('ready', function() {
  app.use(express['static']('./public'));
  room.restore(io.sockets, db);
  app.listen(8080);
});

db.on('error', function(e) {
  // [Redis ERROR POLICY]
  // * ignores error in generall command processing
  // * for a while, treats error only here
  console.error('redis error:', e);
});
