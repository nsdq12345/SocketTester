import React from 'react'
import ReactDOM from 'react-dom';
import Test from './component/Test.jsx'

ReactDOM.render(<Test />, document.getElementById('app'))

/* const io  = require('socket.io-client');
const socket = io('http://localhost:3001');

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  socket.emit('my other event', key.name)
})

socket.on('connect', function(){
  console.log('connected');
});
socket.on('news', function(data){
  console.log('Received:', data);
});

socket.on('result', function(data){
  console.log('Received:', data);
});

socket.on('broadcast', function(data){
  console.log('Received broadcast:', data);
});

socket.on('disconnect', function(){
  console.log('disconnected');
});
*/