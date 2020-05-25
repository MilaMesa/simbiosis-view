import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Cuadro(props) {
  return (
    <button className="Cuadro" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Tabla extends React.Component {
  renderCuadro(i) {
    return (<Cuadro
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />
    );
  }

  render() {
    return (
      <div>
        <div className="tabla-row">
          {this.renderCuadro(0)}
          {this.renderCuadro(1)}
          {this.renderCuadro(2)}
        </div>
        <div className="tabla-row">
          {this.renderCuadro(3)}
          {this.renderCuadro(4)}
          {this.renderCuadro(5)}
        </div>
        <div className="tabla-row">
          {this.renderCuadro(6)}
          {this.renderCuadro(7)}
          {this.renderCuadro(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: null,
      player2: null,
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const cuadros = current.squares.slice();
    if (calculateWinner(cuadros) || cuadros[i]) {
      return;
    }
    cuadros[i] = this.state.xIsNext ?  'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: cuadros,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  componentDidMount() {
    const player1 = prompt('Ingrese el nombre del primer jugador', 'X');
    const player2 = prompt('Ingrese el nombre del segundo jugador', 'O');
    this.setState({
      ...this.state,
      player1: player1.trim().toUpperCase(),
      player2: player2.trim().toUpperCase(),
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Ir al movimiento #' + move :
        'Ir al inicio del juego';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'GANADOR: ' + (winner ==='X' ? this.state.player1 : this.state.player2);
    } else {
      status = 'Siguiente jugador: ' + (this.state.xIsNext ? this.state.player1 : this.state.player2);
    }
    return (
      <div className="game">
        <div className="game-tabla">
          <Tabla
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}