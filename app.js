var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);
console.log("Express server listening on http://localhost:8080/");

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/template.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('newclient', { msg : 'welcome' });
  socket.on('news', function (data) {
    console.log(data);
  });
});