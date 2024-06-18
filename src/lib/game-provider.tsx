'use client';
import type React from 'react';
import { createContext, useContext, useReducer, useState } from 'react';
import { CommitGame } from './commit-game';

const GameContext = createContext<{
  game: CommitGame | undefined;
  startGame: (userId: string, filePosition: number, finishedAt?: Date | undefined) => void;
  update: (game: CommitGame) => void;
} | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState<CommitGame>();

  function startGame(userId: string, filePosition: number, finishedAt?: Date | undefined) {
    setGame(new CommitGame(userId, filePosition, finishedAt));
  }
  function update(game: CommitGame) {
    setGame(Object.assign(new CommitGame(game.userId, game.filePosition, game.finishedAt), { ...game }));
  }

  return <GameContext.Provider value={{ game, startGame, update }}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
