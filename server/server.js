const express = require('express')
const app = express();
const port = 3001;

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'))

io.on('connection', (socket) => {
  
  socket.on('my other event', (data) => {
    io.emit('broadcast', 'SOMEONE PRESSED:' + data);
    // socket.emit('broadcast', 'YOU PRESSED:' + data);
  });
});

server.listen(port, () => {
  console.log(`listing on ${port}`)
})