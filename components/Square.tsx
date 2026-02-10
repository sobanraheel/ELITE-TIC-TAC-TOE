
import React from 'react';
import { Player } from '../types';

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinningSquare: boolean;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`
        h-24 w-24 md:h-32 md:w-32 text-4xl md:text-6xl font-black rounded-xl transition-all duration-300 transform
        ${!value && !disabled ? 'hover:bg-slate-700/50 hover:scale-105 active:scale-95' : ''}
        ${isWinningSquare ? 'bg-indigo-600/40 border-2 border-indigo-400 scale-105 z-10' : 'bg-slate-800/80 border border-slate-700'}
        flex items-center justify-center shadow-lg
      `}
    >
      <span className={`
        ${value === 'X' ? 'neon-x animate-in zoom-in duration-300' : ''}
        ${value === 'O' ? 'neon-o animate-in zoom-in duration-300' : ''}
      `}>
        {value === 'X' && <i className="fas fa-times"></i>}
        {value === 'O' && <i className="far fa-circle"></i>}
      </span>
    </button>
  );
};

export default Square;
