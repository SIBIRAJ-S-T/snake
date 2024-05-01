import React, { useState, useEffect } from 'react';
import './SnakeGame.css'; // Import your CSS file

const SnakeGame = () => {
    const [snake1Direction, setSnake1Direction] = useState('right');
    const [snake2Direction, setSnake2Direction] = useState('right');
    const [snake1Segments, setSnake1Segments] = useState([{ x: 0, y: 0 }]);
    const [snake2Segments, setSnake2Segments] = useState([{ x: 0, y: 0 }]);
    const [snake1Length, setSnake1Length] = useState(1);
    const [snake2Length, setSnake2Length] = useState(1);
    const [foodPosition, setFoodPosition] = useState({ x: 0, y: 0 });
    const [containerWidth, setContainerWidth] = useState(600); // Adjust as needed
    const [containerHeight, setContainerHeight] = useState(400); // Adjust as needed
    const [segmentSize, setSegmentSize] = useState(20);
    const [borderWidth, setBorderWidth] = useState(2);
    const [snake1Score, setSnake1Score] = useState(0);
    const [snake2Score, setSnake2Score] = useState(0);
    const [timer, setTimer] = useState(120); // 2 minutes
    const [winner, setWinner] = useState(null);
    const [paused, setPaused] = useState(false);
    const [restarted, setRestarted] = useState(false);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (!paused && !winner) {
                switch(event.key) {
                    case 'ArrowUp':
                        if (snake1Direction !== 'down') setSnake1Direction('up');
                        break;
                    case 'ArrowDown':
                        if (snake1Direction !== 'up') setSnake1Direction('down');
                        break;
                    case 'ArrowLeft':
                        if (snake1Direction !== 'right') setSnake1Direction('left');
                        break;
                    case 'ArrowRight':
                        if (snake1Direction !== 'left') setSnake1Direction('right');
                        break;
                    case 'w':
                        if (snake2Direction !== 'down') setSnake2Direction('up');
                        break;
                    case 's':
                        if (snake2Direction !== 'up') setSnake2Direction('down');
                        break;
                    case 'a':
                        if (snake2Direction !== 'right') setSnake2Direction('left');
                        break;
                    case 'd':
                        if (snake2Direction !== 'left') setSnake2Direction('right');
                        break;
                }
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [paused, winner, snake1Direction, snake2Direction]);

    useEffect(() => {
        const moveSnake1 = () => {
            if (!paused && !winner) {
                let newSegments = [...snake1Segments];
                let newX = newSegments[0].x;
                let newY = newSegments[0].y;
                switch (snake1Direction) {
                    case 'up':
                        newY = newY <= 0 ? containerHeight - segmentSize : newY - segmentSize;
                        break;
                    case 'down':
                        newY = newY >= containerHeight - segmentSize ? 0 : newY + segmentSize;
                        break;
                    case 'left':
                        newX = newX <= 0 ? containerWidth - segmentSize : newX - segmentSize;
                        break;
                    case 'right':
                        newX = newX >= containerWidth - segmentSize ? 0 : newX + segmentSize;
                        break;
                }
                if (newX === foodPosition.x && newY === foodPosition.y) {
                    setSnake1Length(snake1Length + 1);
                    setSnake1Score(snake1Score + 1);
                    generateFood();
                    newSegments = [{ x: newX, y: newY }, ...newSegments]; // Add new segment to snake1 head
                } else {
                    newSegments.pop();
                    newSegments = [{ x: newX, y: newY }, ...newSegments];
                }
                setSnake1Segments(newSegments);
                // checkSelfCollision(newX, newY, snake1Segments);
            }
        };
        const interval = setInterval(moveSnake1, 100); // Adjust speed as needed
        return () => clearInterval(interval);
    }, [paused, winner, snake1Direction, snake1Segments, snake1Length, foodPosition]);

    useEffect(() => {
        const moveSnake2 = () => {
            if (!paused && !winner) {
                let newSegments = [...snake2Segments];
                let newX = newSegments[0].x;
                let newY = newSegments[0].y;
                switch (snake2Direction) {
                    case 'up':
                        newY = newY <= 0 ? containerHeight - segmentSize : newY - segmentSize;
                        break;
                    case 'down':
                        newY = newY >= containerHeight - segmentSize ? 0 : newY + segmentSize;
                        break;
                    case 'left':
                        newX = newX <= 0 ? containerWidth - segmentSize : newX - segmentSize;
                        break;
                    case 'right':
                        newX = newX >= containerWidth - segmentSize ? 0 : newX + segmentSize;
                        break;
                }
                if (newX === foodPosition.x && newY === foodPosition.y) {
                    setSnake2Length(snake2Length + 1);
                    setSnake2Score(snake2Score + 1);
                    generateFood();
                    newSegments = [{ x: newX, y: newY }, ...newSegments]; // Add new segment to snake2 head
                } else {
                    newSegments.pop();
                    newSegments = [{ x: newX, y: newY }, ...newSegments];
                }
                setSnake2Segments(newSegments);
                // checkSelfCollision(newX, newY, snake2Segments);
            }
        };
        const interval = setInterval(moveSnake2, 100); // Adjust speed as needed
        return () => clearInterval(interval);
    }, [paused, winner, snake2Direction, snake2Segments, snake2Length, foodPosition]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!paused && !winner) {
                setTimer((prevTimer) => prevTimer > 0 ? prevTimer - 1 : 0); // Prevent timer from going negative
                if (timer === 0) {
                    clearInterval(interval);
                    declareWinner();
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [paused, winner, timer]);

    const generateFood = () => {
        const foodX = Math.floor(Math.random() * ((containerWidth - segmentSize) / segmentSize)) * segmentSize;
        const foodY = Math.floor(Math.random() * ((containerHeight - segmentSize) / segmentSize)) * segmentSize;
        setFoodPosition({ x: foodX, y: foodY });
    };

    // const checkSelfCollision = (x, y, snakeSegments) => {
    //     for (let i = 0; i < snakeSegments.length; i++) {
    //         if (x === snakeSegments[i].x && y === snakeSegments[i].y) {
    //             setWinner(snakeSegments === snake1Segments ? 'Red Wins Self Bite' : 'Blue Wins Self Bite'); // Declare opponent as winner
    //             setPaused(true);
    //             break;
    //         }
    //     }
    // };

    const declareWinner = () => {
        if (snake1Score > snake2Score) {
            setWinner('Blue Wins Time Up');
        } else if (snake1Score < snake2Score) {
            setWinner('Red Wins Time Up');
        } else {
            setWinner('Draw Time Up');
        }
        setPaused(true);
    };

    const restartGame = () => {
        setSnake1Segments([{ x: 0, y: 0 }]);
        setSnake2Segments([{ x: 0, y: 0 }]);
        setSnake1Length(1);
        setSnake2Length(1);
        setSnake1Score(0);
        setSnake2Score(0);
        setTimer(120);
        setWinner(null);
        setPaused(false);
        setRestarted(true);
    };

    return (
        <div className='snakegamecontainer'>
    <h1>SnakeGame Doubles</h1>
    <div className="timer-display">
        Timer: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
    </div>
    <div className="game-container" style={{ width: `${containerWidth}px`, height: `${containerHeight}px`, borderWidth: `${borderWidth}px`, position: 'relative' }}>
        {snake1Segments.map((segment, index) => (
            <div
                key={index}
                className="snake"
                style={{ left: `${segment.x}px`, top: `${segment.y}px`, backgroundColor: 'blue' }}
            ></div>
        ))}
        {snake2Segments.map((segment, index) => (
            <div
                key={index}
                className="snake"
                style={{ left: `${segment.x}px`, top: `${segment.y}px`, backgroundColor: 'red' }}
            ></div>
        ))}
        <div
            id="food"
            style={{ left: `${foodPosition.x}px`, top: `${foodPosition.y}px`, backgroundColor: 'green' }}
        ></div>
    </div>
    {winner && (
        <div className="winner-display">
            {winner}
        </div>
    )}
    <button onClick={restartGame} className='snakerestart'>Restart</button>
    <div className="score-display blue">
        Blue: {snake1Score}
    </div>
    <div className="score-display red">
    Red: {snake2Score}
    </div>
    <div className="key-display blue1">
        Keys: ↑ ↓ → ←
    </div>
    <div className="key-display red1">
        Keys: W S A D
    </div>
</div>

    );
};

export default SnakeGame;
