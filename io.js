// app.js

var express = require('express');  
var app     = express();  
var server  = require('http').createServer(app);  
var io      = require('socket.io')(server);
var url     = require('url');
var logger  = require('morgan');

io.set('origins', '*:*');

app.use(logger('dev'));

// emit when event create ticket from user
io.sockets.on('connection',function(socket){

  console.log('have a connected with socket_id is :', socket.id);

  socket.on('create', function(res){
    io.emit('newsticket',res)
    // console.log('Received expression from client ',res);
  });

  socket.on('disconnect', function(){
    // console.log('Disconnected');
  });

  socket.on("message",function(data){
      io.sockets.emit('message',data);
  });

  socket.on("changeStatus", function (data) {
    console.log('data-changeStatus', data);
      socket.broadcast.emit('changeStatus', data);
  });

  socket.on("changeComment", function (data) {
    console.log('data-changeComment', data);
      socket.broadcast.emit('changeComment', data);
  });

  socket.on("changeStatusVersion", function (data) {
      console.log('data-changeStatusVersion', data);
      socket.broadcast.emit('changeStatusVersion', data);
  });

  socket.on("changeAttachment", function (data) {
      socket.broadcast.emit('changeAttachment', data);
  });

  socket.on("dataStep", function (data) {
      socket.broadcast.emit('dataStep', data);
  });

  socket.on("dataTask", function (data) {
      socket.broadcast.emit('dataTask', data);
  });

});


app.get('/', function(req, res, next) {  
    res.send({'message' : 'welcome to viet name !'});
});

server.listen(7788); 

console.log('Server listening at port 7788'); 
