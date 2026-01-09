import { create } from "zustand";
import { GameState } from "../schemas/gameSchema";

interface GameStore {
  playMode: 'none' | 'online' | 'offline';
  gameType: 'tombala' | 'bingo';
  gameState: GameState;
  userCard: (number | null)[][] | number[][] | null;
  isGameOver: boolean;
  isAutoFill: boolean;
  cinkoCount: number;
  markedNumbers: number[];
  setPlayMode: (mode: 'none' | 'online' | 'offline') => void;
  setGameType: (type: 'tombala' | 'bingo') => void;
  setGameState: (state: GameState) => void;
  setUserCard: (card: (number | null)[][] | number[][]) => void;
  addDrawnNumber: (num: number) => void;
  toggleMarkedNumber: (num: number) => void;
  setIsGameOver: (status: boolean) => void;
  setIsAutoFill: (status: boolean) => void;
  setCinkoCount: (count: number) => void;
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
  gameType: 'tombala',
  gameState: initialGameState,
  userCard: null,
  isGameOver: false,
  isAutoFill: true, // Varsayılan olarak açık olsun
  cinkoCount: 0,
  markedNumbers: [],
  setPlayMode: (mode) => set({ playMode: mode }),
  setGameType: (type) => set({ gameType: type }),
  setGameState: (state) => set({ gameState: state }),
  setUserCard: (card) => set({ userCard: card }),
  setIsGameOver: (status) => set({ isGameOver: status }),
  setIsAutoFill: (status) => set({ isAutoFill: status }),
  setCinkoCount: (count) => set({ cinkoCount: count }),
  toggleMarkedNumber: (num) => set((state) => ({
    markedNumbers: state.markedNumbers.includes(num)
      ? state.markedNumbers.filter(n => n !== num)
      : [...state.markedNumbers, num]
  })),
  addDrawnNumber: (num) =>
    set((state) => {
      const newDrawnNumbers = [...state.gameState.drawnNumbers, num];
      return {
        gameState: {
          ...state.gameState,
          drawnNumbers: newDrawnNumbers,
        },
        // Eğer autoFill açıksa, çekilen sayıyı otomatik olarak işaretle
        markedNumbers: state.isAutoFill ? [...state.markedNumbers, num] : state.markedNumbers
      };
    }),
  resetGame: () => set({ 
    gameState: initialGameState, 
    userCard: null, 
    isGameOver: false,
    cinkoCount: 0,
    markedNumbers: []
  }),
}));
