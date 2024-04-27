import React, { useState } from 'react';
import './Ladder.css';

const Ladder = () => {
  const [player1Position, setPlayer1Position] = useState(0);
  const [player2Position, setPlayer2Position] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [diceNumber, setDiceNumber] = useState(1); // Initial dice number
  
  const rollDice = () => {
    // Generate a random number between 1 and 6
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(diceRoll); // Update dice number
    
    // Move the player's car based on the dice roll
    const newPosition = currentPlayer === 1 ? player1Position + diceRoll : player2Position + diceRoll;
    setTimeout(() => {
      currentPlayer === 1 ? setPlayer1Position(newPosition) : setPlayer2Position(newPosition);
      // Check if player reaches the finish line
      if (newPosition >= 100) {
        alert(`Player ${currentPlayer} wins!`);
        // Reset the game
        setPlayer1Position(0);
        setPlayer2Position(0);
        setCurrentPlayer(1);
      } else {
        // Switch player if not 1 and 6
        if (diceRoll !== 1 && diceRoll !== 6) {
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
      }
    }, 1000); // Adjust speed of movement here
  };

  return (
    <div className="ladder-container">
      <div className="road">
        {/* Player 1 Car */}
        <div className="car car1" style={{ left: `${player1Position}%` }} />
        {/* Player 2 Car */}
        <div className="car car2" style={{ left: `${player2Position}%` }} />
      </div>
      {/* Left Dice */}
      <div className="dice dice-left">
        <p>Player 1</p>
        <button onClick={rollDice} disabled={currentPlayer !== 1}>{diceNumber}</button>
      </div>
      {/* Right Dice */}
      <div className="dice dice-right">
        <p>Player 2</p>
        <button onClick={rollDice} disabled={currentPlayer !== 2}>{diceNumber}</button>
      </div>
    </div>
  );
};

export default Ladder;
