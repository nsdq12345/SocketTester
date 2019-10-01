import React from 'react';
const io  = require('socket.io-client');
const address = 'http://localhost:3001';
const socket = io(address);
const Axios = require('axios');

export default class Test extends React.Component {

  constructor(props) {
    super(props);

    socket.on('connect', function(){
      console.log('connected');
    });

    this.side = 25;

    var matrix = [];
    for (var r = 0; r < this.side ; r++) {
      matrix[r] = [];
      for (var c = 0; c < this.side ; c++) {
        matrix[r][c] = 'white';
      }
    }

    this.state = {
      text: [],
      input: '',
      matrix: matrix,
      changeCount: 0,
      currentColor: 'white',
    }

    socket.on('colorChange', data => {
      console.log("received:", data);
      this.setState({
        changeCount: this.changeCount+1,
        matrix: data
      })
    })
  }

  componentDidMount() {
    Axios.get(address)
      .then(data => {
        this.setState({
          changeCount: this.changeCount+1,
          matrix: data.data
        })
      });
  }

  setColor(e) {
    this.setState({
      currentColor: e
    })
  }

  sendColor(stuff) {
    socket.emit('colorChange', stuff)
  }

  render() {
    return (
      <div>
        <button onClick={() => {this.setColor("red")}}>Red</button>
        <button onClick={() => {this.setColor("orange")}}>Orange</button>
        <button onClick={() => {this.setColor("yellow")}}>Yellow</button>
        <button onClick={() => {this.setColor("green")}}>Green</button>
        <button onClick={() => {this.setColor("blue")}}>Blue</button>
        <button onClick={() => {this.setColor("purple")}}>Purple</button>
        <button onClick={() => {this.setColor("white")}}>White</button>
        <div>
          <table style={{"borderCollapse":"collapse"}}>
            <tbody style={{"borderCollapse":"collapse"}}>
              {this.state.matrix.map((row, r) => {
                return (<tr>{row.map((cell, c) => {
                  return (<td onClick={() => this.sendColor([r, c, this.state.currentColor])} style={{backgroundColor:cell, border: '1px solid black', "borderCollapse":"collapse", width:"20px", height:"20px"}}></td>)
                })}</tr>);
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  } 
}