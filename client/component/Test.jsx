import React from 'react';
const io  = require('socket.io-client');
const socket = io('http://localhost:3001');

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

    console.log(matrix)

    this.state = {
      text: [],
      input: '',
      matrix: matrix,
      changeCount: 0,
    }

    socket.on('colorChange', data => {
      console.log("received:", data);

      var matrixClone = this.state.matrix.slice();
      matrixClone[data[0]][data[1]] = data[2];
      this.setState({
        changeCount: this.changeCount+1,
        matrix: matrixClone
      })
    })
  }

  changeColor(e) {
    var c = Math.floor(Math.random() * this.side);
    var r = Math.floor(Math.random() * this.side);
    socket.emit('colorChange', [c,r,e])
  }

  render() {
    return (
      <div>
        <button onClick={() => {this.changeColor("red")}}>Red</button>
        <button onClick={() => {this.changeColor("orange")}}>Orange</button>
        <button onClick={() => {this.changeColor("yellow")}}>Yellow</button>
        <button onClick={() => {this.changeColor("green")}}>Green</button>
        <button onClick={() => {this.changeColor("blue")}}>Blue</button>
        <button onClick={() => {this.changeColor("purple")}}>Purple</button>
        <div>
          <table>
            <tbody>
              {this.state.matrix.map(row => {
                return (<tr>{row.map(cell => {
                  return (<td style={{backgroundColor:cell, border: '1px solid black', width:"20px", height:"20px"}}></td>)
                })}</tr>);
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  } 
}