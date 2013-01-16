var app = require('express')()
  , server = require('http').createServer(app);

var express = require('express')
  , http = require('http')
  , path = require('path');

app.configure(function(){
  app.set('port', process.env.PORT || 8000);
  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(express.static(path.join(__dirname, '.')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function (req, res){
  res.sendfile(__dirname + '/template.html');
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  socket.emit('newclient', { msg : 'welcome' });
  socket.on('news', function (data) {
    console.log(data);
  });
});
