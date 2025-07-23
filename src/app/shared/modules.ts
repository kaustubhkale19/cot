export const RoundSchema = {
    version: 0,
    type: 'object',
    primaryKey: 'roundNumber',
    properties: {
        roundNumber: { type: 'string' },
        name: { type: 'string' }
    },
    required: ['roundNumber', 'name']
}

export const PointsSchema = {
    version: 0,
    type: 'object',
    primaryKey: {
        key: 'compositeId', 
        fields: ['gameId', 'roundNumber']
    },
    properties: {
        gameId: { type: 'string' },
        roundNumber: { type: 'string' },
        points: { type: 'number' }
    },
    required: ['gameId', 'roundNumber', 'points']
}

export const TeamSchema = {
    version: 0,
    type: 'object',
    primaryKey: 'teamId',
    properties: {
        teamId: { type: 'string' },
        name: { type: 'string' },
        color: { type: 'string' },
        totalPoints: { type: 'number' },
        position: { type: 'string' },
        points: { type: 'list' },
    },
    required: ['teamId', 'name', 'color']
}

export const GameSchema = {
    version: 0,
    type: 'object',
    primaryKey: 'gameId',
    properties: {
        gameId: { type: 'string' },
        name: { type: 'string' },
        rules: { type: 'string' },
        rounds: { type: 'list' }
    },
    required: ['gameId', 'name']
}

