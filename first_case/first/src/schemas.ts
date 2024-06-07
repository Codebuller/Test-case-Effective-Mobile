export const userCreationShema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        last_name: { type: 'string' },
        sex: { type: 'string', enum: ['male', 'female'] },
        problems: { type: 'boolean' }
    },
    required: ['name', 'last_name', 'sex', 'problems']
}