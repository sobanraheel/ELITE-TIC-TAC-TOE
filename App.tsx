
import React, { useState, useCallback } from 'react';
import Square from './components/Square';
import { Player, GameState } from './types';

const INITIAL_STATE: GameState = {
  board: Array(9).fill(null),
  xIsNext: true,
  winner: null,
  winningLine: null,
  isGameOver: false,
};

const calculateWinner = (squares: Player[]): { winner: Player | 'Draw'; line: number[] | null } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }

  if (squares.every(s => s !== null)) {
    return { winner: 'Draw', line: null };
  }

  return { winner: null, line: null };
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  const handleSquareClick = useCallback((index: number) => {
    if (gameState.board[index] || gameState.winner) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.xIsNext ? 'X' : 'O';
    
    const { winner, line } = calculateWinner(newBoard);
    
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      xIsNext: !prev.xIsNext,
      winner,
      winningLine: line,
      isGameOver: !!winner,
    }));
  }, [gameState.board, gameState.winner, gameState.xIsNext]);

  const resetGame = () => {
    setGameState(INITIAL_STATE);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-rose-400">
            ELITE TIC TAC TOE
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            Local Multiplayer
          </p>
        </div>

        {/* Turn Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`px-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 ${gameState.xIsNext && !gameState.winner ? 'bg-cyan-500/20 border-cyan-400 scale-110 shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'bg-slate-800 border-slate-700 opacity-50'}`}>
            <i className="fas fa-times text-cyan-400"></i>
            <span className="font-bold text-cyan-50 text-sm">PLAYER X</span>
          </div>
          <div className="h-px w-4 bg-slate-800"></div>
          <div className={`px-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 ${!gameState.xIsNext && !gameState.winner ? 'bg-rose-500/20 border-rose-400 scale-110 shadow-[0_0_15px_rgba(251,113,133,0.3)]' : 'bg-slate-800 border-slate-700 opacity-50'}`}>
            <i className="far fa-circle text-rose-400"></i>
            <span className="font-bold text-rose-50 text-sm">PLAYER O</span>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3 relative mb-8">
          {gameState.board.map((square, i) => (
            <Square
              key={i}
              value={square}
              onClick={() => handleSquareClick(i)}
              isWinningSquare={gameState.winningLine?.includes(i) || false}
              disabled={!!gameState.winner}
            />
          ))}
        </div>

        {/* Game Result */}
        {gameState.winner ? (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="mb-4">
              {gameState.winner === 'Draw' ? (
                <div className="text-2xl font-black text-slate-400 uppercase tracking-widest">Draw</div>
              ) : (
                <div className={`text-3xl font-black uppercase ${gameState.winner === 'X' ? 'text-cyan-400' : 'text-rose-400'}`}>
                  {gameState.winner} WINS!
                </div>
              )}
            </div>
            <button
              onClick={resetGame}
              className="w-full py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 group"
            >
              <i className="fas fa-sync-alt group-hover:rotate-180 transition-transform duration-500"></i>
              PLAY AGAIN
            </button>
          </div>
        ) : (
          <button
            onClick={resetGame}
            className="w-full py-3 text-slate-500 hover:text-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors uppercase tracking-widest"
          >
            <i className="fas fa-undo"></i> Reset Game
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
