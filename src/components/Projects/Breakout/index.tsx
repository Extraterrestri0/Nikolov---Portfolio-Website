import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Ball } from './Ball';
import { Paddle } from './Paddle';
import { Brick } from './Brick';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const BALL_SIZE = 10;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const BRICK_ROWS = 5;
const BRICK_COLS = 8;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 4;

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  isVisible: boolean;
}

export function Breakout() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paddle, setPaddle] = useState({ x: GAME_WIDTH / 2 - PADDLE_WIDTH / 2 });
  const [ball, setBall] = useState({
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT - 30,
    dx: 4,
    dy: -4,
  });
  const [bricks, setBricks] = useState<Brick[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);

  // Initialize bricks
  useEffect(() => {
    const brickWidth = (GAME_WIDTH - (BRICK_COLS + 1) * BRICK_GAP) / BRICK_COLS;
    const newBricks: Brick[] = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        newBricks.push({
          x: (brickWidth + BRICK_GAP) * col + BRICK_GAP,
          y: (BRICK_HEIGHT + BRICK_GAP) * row + BRICK_GAP,
          width: brickWidth,
          height: BRICK_HEIGHT,
          color: colors[row],
          isVisible: true,
        });
      }
    }
    setBricks(newBricks);
  }, [gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setBall((prevBall) => {
        let { x, y, dx, dy } = prevBall;
        let newDx = dx;
        let newDy = dy;

        // Ball collision with walls
        if (x <= 0 || x >= GAME_WIDTH - BALL_SIZE) newDx = -dx;
        if (y <= 0) newDy = -dy;
        if (y >= GAME_HEIGHT - BALL_SIZE) {
          setGameOver(true);
          return prevBall;
        }

        // Ball collision with paddle
        if (
          y + BALL_SIZE >= GAME_HEIGHT - PADDLE_HEIGHT - 16 &&
          x >= paddle.x &&
          x <= paddle.x + PADDLE_WIDTH
        ) {
          newDy = -Math.abs(dy);
        }

        // Ball collision with bricks
        setBricks((prevBricks) =>
          prevBricks.map((brick) => {
            if (!brick.isVisible) return brick;

            if (
              x >= brick.x &&
              x <= brick.x + brick.width &&
              y >= brick.y &&
              y <= brick.y + brick.height
            ) {
              newDy = -dy;
              setScore((prev) => prev + 10);
              return { ...brick, isVisible: false };
            }
            return brick;
          })
        );

        return {
          x: x + newDx,
          y: y + newDy,
          dx: newDx,
          dy: newDy,
        };
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, paddle.x]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameRef.current) return;
      const rect = gameRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setPaddle({ x: Math.max(0, Math.min(x - PADDLE_WIDTH / 2, GAME_WIDTH - PADDLE_WIDTH)) });
    };

    if (gameStarted && !gameOver) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setBall({
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT - 30,
      dx: 4,
      dy: -4,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={gameRef}
        className="relative bg-gray-900 rounded-lg overflow-hidden"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {bricks.map((brick, index) => (
          <Brick key={index} {...brick} />
        ))}
        
        <Ball position={{ x: ball.x, y: ball.y }} size={BALL_SIZE} />
        <Paddle position={paddle.x} width={PADDLE_WIDTH} height={PADDLE_HEIGHT} />

        {!gameStarted && !gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <button
              onClick={startGame}
              className="px-8 py-4 bg-blue-500 text-white rounded-lg text-xl font-bold hover:bg-blue-600 transition-colors"
            >
              Start Game
            </button>
          </motion.div>
        )}

        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
            <p className="text-xl text-white mb-6">Final Score: {score}</p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-blue-500 text-white rounded-lg text-xl font-bold hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </motion.div>
        )}

        <div className="absolute top-4 right-4 text-white text-xl font-bold">
          Score: {score}
        </div>
      </div>
    </div>
  );
}