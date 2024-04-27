import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    const calculateWinner = squares => {
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
          setWinningSquares(lines[i]);
          return squares[a];
        }
      }
      return null;
    };

    const winnerPlayer = calculateWinner(board);
    if (winnerPlayer) {
      setWinner(winnerPlayer);
      setShowWinner(true);
      setTimeout(() => {
        setShowWinner(false);
      }, 2000);
    }
  }, [board]);

  const handleClick = i => {
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = i => {
    const isWinningSquare = winningSquares.includes(i);
    return (
      <button
        className={`square ${isWinningSquare ? 'winning-square' : ''}`}
        onClick={() => handleClick(i)}
        style={{ fontSize: '24px' }}
      >
        {board[i]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
    setWinningSquares([]);
  };
  

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        {showWinner && <div className="winner-announcement">{`${winner} wins!`}</div>}
        <button onClick={resetGame} className="reset-button">
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
