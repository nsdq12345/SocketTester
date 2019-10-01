const express = require('express')
const app = express();
const port = 3001;

var server = require('http').Server(app);
var io = require('socket.io')(server);

var matrix = [];
for (var r = 0; r < 100; r++) {
  matrix[r] = [];
  for (var c = 0; c < 100; c++) {
    matrix[r][c] = 'white';
  }
}

app.get('/getBoard', (req, res) => {
  res.json(matrix);
})

app.use(express.static('public'))

io.on('connection', (socket) => {
  
  socket.on('colorChange', (data) => {
    console.log(data);
    matrix[data[0]][data[1]] = data[2];
    io.emit('colorChange', matrix);
    // socket.emit('broadcast', 'YOU PRESSED:' + data);
  });
});

server.listen(port, () => {
  console.log(`listing on ${port}`)
})