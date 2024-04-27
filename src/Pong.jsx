import React, { useState, useEffect, useRef } from 'react';
import './Pong.css';

const Pong = () => {
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [ballVelocity, setBallVelocity] = useState({ x: 0, y: 0 }); // Initialize ball velocity to zero
  const [paddleLeftPosition, setPaddleLeftPosition] = useState(40);
  const [paddleRightPosition, setPaddleRightPosition] = useState(40);
  const [scoreLeft, setScoreLeft] = useState(0);
  const [scoreRight, setScoreRight] = useState(0);
  const [hitLeftPaddle, setHitLeftPaddle] = useState(false);
  const [hitRightPaddle, setHitRightPaddle] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gameAreaRef = useRef(null);

  const resetGame = () => {
    setBallPosition({ x: 50, y: 50 });
    setBallVelocity({ x: 0, y: 0 });
    setPaddleLeftPosition(40);
    setPaddleRightPosition(40);
    setScoreLeft(0);
    setScoreRight(0);
    setHitLeftPaddle(false);
    setHitRightPaddle(false);
    setWinner(null);
    setGameOver(false);
    setGameStarted(false);
  };

  const startGame = () => {
    setBallVelocity({ // Set a random velocity for the ball when the game starts
      x: (Math.random() > 0.5 ? 1 : -1) * 0.5,
      y: (Math.random() > 0.5 ? 1 : -1) * 0.5
    });
    setGameStarted(true); // Mark the game as started
  };

  useEffect(() => {
    const gameArea = gameAreaRef.current;
    const handleKeyDown = (e) => {
      if (gameStarted && !gameOver) { // Ensure controls only work when the game has started and is not over
        if (e.key === 'w' && paddleLeftPosition > 0) {
          setPaddleLeftPosition((prev) => prev - 8);
        } else if (e.key === 's' && paddleLeftPosition < 80) {
          setPaddleLeftPosition((prev) => prev + 8);
        } else if (e.key === 'ArrowUp' && paddleRightPosition > 0) {
          setPaddleRightPosition((prev) => prev - 8);
        } else if (e.key === 'ArrowDown' && paddleRightPosition < 80) {
          setPaddleRightPosition((prev) => prev + 8);
        }
      }
    };

    gameArea.focus();
    gameArea.addEventListener('keydown', handleKeyDown);
    return () => {
      gameArea.removeEventListener('keydown', handleKeyDown);
    };
  }, [paddleLeftPosition, paddleRightPosition, gameStarted, gameOver]);

  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (winner) {
      setGameOver(true);
    }
    const interval = setInterval(() => {
      if (gameStarted && !gameOver) { // Update ball position only if the game has started and is not over
        const newBallX = ballPosition.x + ballVelocity.x;
        const newBallY = ballPosition.y + ballVelocity.y;

        // Ball collision with top or bottom of the game area
        if (newBallY <= 0 || newBallY >= 95) {
          setBallVelocity((prev) => ({ ...prev, y: -prev.y }));
        }

        // Ball collision with left paddle
        if (
          newBallX <= 5 &&
          newBallY >= paddleLeftPosition &&
          newBallY <= paddleLeftPosition + 20
        ) {
          if (!hitLeftPaddle) {
            setBallVelocity((prev) => ({ x: -prev.x, y: prev.y }));
            setHitLeftPaddle(true);
            setHitRightPaddle(false);
            if (Math.abs(ballVelocity.x) === 0.5) {
              setBallVelocity((prev) => ({ x: prev.x * 3, y: prev.y }));
            }
          }
        }

        // Ball collision with right paddle
        if (
          newBallX >= 95 &&
          newBallY >= paddleRightPosition &&
          newBallY <= paddleRightPosition + 20
        ) {
          if (!hitRightPaddle) {
            setBallVelocity((prev) => ({ x: -prev.x, y: prev.y }));
            setHitRightPaddle(true);
            setHitLeftPaddle(false);
            if (Math.abs(ballVelocity.x) === 0.5) {
              setBallVelocity((prev) => ({ x: prev.x * 3, y: prev.y }));
            }
          }
        }

        // Ball goes out of the left or right boundary
        if (newBallX <= 0) {
          setBallPosition({ x: 50, y: 50 });
          setScoreRight((prev) => prev + 1);
          setBallVelocity({
            x: (Math.random() > 0.5 ? 1 : -1) * 0.5,
            y: (Math.random() > 0.5 ? 1 : -1) * 0.5,
          });
          setHitLeftPaddle(false); // Reset hit flag
          setHitRightPaddle(false); // Reset hit flag
          if (scoreRight === 4) {
            setWinner("Player on the right wins!");
          }
        } else if (newBallX >= 100) {
          setBallPosition({ x: 50, y: 50 });
          setScoreLeft((prev) => prev + 1);
          setBallVelocity({
            x: (Math.random() > 0.5 ? 1 : -1) * 0.5,
            y: (Math.random() > 0.5 ? 1 : -1) * 0.5,
          });
          setHitLeftPaddle(false); // Reset hit flag
          setHitRightPaddle(false); // Reset hit flag
          if (scoreLeft === 4) {
            setWinner("Player on the left wins!");
          }
        } else {
          setBallPosition({ x: newBallX, y: newBallY });
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [ballPosition, ballVelocity, paddleLeftPosition, paddleRightPosition, scoreLeft, scoreRight, hitLeftPaddle, hitRightPaddle, gameOver, winner, gameStarted]);

  return (
    <div className='pongcontainer'>
    <div className='pongkeyname'><h3 className='pongws'>Key = W and S</h3> <h1>Pong Game</h1> <h3 className='pongupdown'>Key = ↑ and ↓</h3></div>
    <div
      className="game-area"
      ref={gameAreaRef}
      tabIndex="0"
    >
      <div
        className="ball"
        style={{
          left: `${ballPosition.x}%`,
          top: `${ballPosition.y}%`,
        }}
      />
      <div
        className="paddle-left"
        style={{ top: `${paddleLeftPosition}%` }}
      />
      <div
        className="paddle-right"
        style={{ top: `${paddleRightPosition}%` }}
      />
      <div className="score">
        <span>{scoreLeft}</span> - <span>{scoreRight}</span>
      </div>
    </div>
    {!gameStarted && !gameOver && <button className='pongresetbutton' onClick={startGame}>Start</button>}
    {winner && <div className="winner-message">{winner}</div>}
    {gameOver && <button className='pongresetbutton' onClick={resetGame}>Reset Game</button>}
    </div>
  );
};

export default Pong;
