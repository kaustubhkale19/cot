export interface Game {
  gameId: string;
  name: string;
  rules?: string;
}

export const GameSchema = {
    version: 0,
    type: 'object',
    primaryKey: 'gameId',
    properties: {
        gameId: { type: 'string', maxLength: 10 },
        name: { type: 'string' },
        rules: { type: 'string' }
    },
    required: ['gameId', 'name']
}
