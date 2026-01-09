import { z } from "zod";

export const BingoCardSchema = z.object({
  id: z.string(),
  numbers: z.array(z.array(z.number().min(1).max(75))), // 5x5 grid
  owner: z.string(),
});

export const GameStateSchema = z.object({
  gameId: z.string(),
  status: z.enum(["waiting", "playing", "finished"]),
  drawnNumbers: z.array(z.number()),
  players: z.array(z.string()),
});

export type BingoCard = z.infer<typeof BingoCardSchema>;
export type GameState = z.infer<typeof GameStateSchema>;
