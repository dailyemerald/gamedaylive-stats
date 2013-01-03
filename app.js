var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , app = express()
  , port = process.env.PORT || 5000
  , server = app.listen(port)
  , io = require('socket.io').listen(server)

io.set('log level', 1);

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

app.get('/metric', routes.metric); 

io.sockets.on('connection', function(socket) {  
  console.log('! Client connected.');
});
