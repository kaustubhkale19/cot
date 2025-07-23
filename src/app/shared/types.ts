export interface Round {
  roundNumber: number;
  name: string;
}

export interface Game {
  gameId: number;
  name: string;
  rules?: string;
  rounds: Round[];
}

export interface Points {
    gameId: number;
    roundNumber: number;
    points: number;
}

export interface Team {
    teamId: number;
    name: string;
    totalPoints?: number;
    position?: number;
    points: Points[];
    color: string;
}

