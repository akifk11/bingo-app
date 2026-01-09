import { create } from "zustand";
import { GameState } from "../schemas/gameSchema";

interface GameStore {
  playMode: 'none' | 'online' | 'offline';
  gameState: GameState;
  setPlayMode: (mode: 'none' | 'online' | 'offline') => void;
  setGameState: (state: GameState) => void;
  addDrawnNumber: (num: number) => void;
  resetGame: () => void;
}

const initialGameState: GameState = {
  gameId: "",
  status: "waiting",
  drawnNumbers: [],
  players: [],
};

export const useGameStore = create<GameStore>((set) => ({
  playMode: 'none',
  gameState: initialGameState,
  setPlayMode: (mode) => set({ playMode: mode }),
  setGameState: (state) => set({ gameState: state }),
  addDrawnNumber: (num) =>
    set((state) => ({
      gameState: {
        ...state.gameState,
        drawnNumbers: [...state.gameState.drawnNumbers, num],
      },
    })),
  resetGame: () => set({ gameState: initialGameState }),
}));
