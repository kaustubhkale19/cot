export interface Team {
    teamId: string;
    name: string;
    totalPoints?: number;
    position?: number;
    color: string;
}

export const TeamSchema = {
    version: 0,
    type: 'object',
    primaryKey: 'teamId',
    properties: {
        teamId: { type: 'string', maxLength: 10 },
        name: { type: 'string' },
        totalPoints: { type: 'number' },
        position: { type: 'number' },
        color: { type: 'string' }
    },
    required: ['teamId', 'name', 'color']
}

