import React from 'react';
const io  = require('socket.io-client');
const socket = io('http://localhost:3001');

export default class Test extends React.Component {

  constructor(props) {
    super(props);

    socket.on('connect', function(){
      console.log('connected');
    });

    this.state = {
      text: [],
      input: '',
    }

    socket.on('broadcast', data => {
      var textClone = this.state.text.slice();
      textClone.push(data);
      this.setState({
        text: textClone
      })
    })
  }

  send() {
    socket.emit('my other event', this.state.input);
  }

  render() {
    return (
      <div>
        <div><input onChange={e=>{this.setState({input: e.target.value})}}/></div>
        <div><button onClick={e => {this.send()}}>Send</button></div>
        <div>
          {this.state.text.map(text => {
            return (<div>{text}</div>)
          })}
        </div>
      </div>
    );
  } 
}