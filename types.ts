
export type Player = 'X' | 'O' | null;

export interface GameState {
  board: Player[];
  xIsNext: boolean;
  winner: Player | 'Draw';
  winningLine: number[] | null;
  isGameOver: boolean;
}
