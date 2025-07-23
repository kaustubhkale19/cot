export interface Points {
    teamPointsId: string;
    teamId: string;
    roundId: string;
    points: number;
}

export const PointsSchema = {
    version: 0,
    type: 'object',
    primaryKey: {
        key: 'teamPointsId',
        fields: ['teamId', 'roundId'],
        separator: '|'
    },
    properties: {
        teamPointsId: { type: 'string', maxLength: 20 },
        teamId: { type: 'string', maxLength: 10 },
        roundId: { type: 'string', maxLength: 10 },
        points: { type: 'number' }
    },
    required: ['teamId', 'roundId', 'points']
}