export interface Round {
    roundId: string;
    gameId: string;
    roundNumber: string;
    name: string;
}

export const RoundSchema = {
    version: 0,
    type: 'object',
    primaryKey: {
        key: 'roundId',
        fields: ['gameId', 'roundNumber'],
        separator: '.'
    },
    properties: {
        roundId: { type: 'string', maxLength: 20 },
        gameId: { type: 'string', maxLength: 10 },
        roundNumber: { type: 'string', maxLength: 10 },
        name: { type: 'string' }
    },
    required: ['gameId', 'roundNumber', 'name']
}