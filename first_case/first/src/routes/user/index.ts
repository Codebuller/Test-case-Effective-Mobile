import { FastifyPluginAsync, FastifyRequest } from "fastify"
import pg from 'pg'
import { userCreationShema } from "../../schemas.js";
import { UserCreatetionsAttr } from "../../interfaces.js";
import { UserHistory, operation_type } from "../../user_history.js";

const { Client } = pg;

    const client = new Client({
        database:process.env.PG_DATABASE, 
        user:process.env.PG_USER, 
        password: process.env.PG_PASSWORD,
        host:'localhost',
        port:5432
        })
    await client.connect()
const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  
  fastify.post('/',
  {
    schema:{
      body: userCreationShema,
      tags: ['users'],
    }
  }, 
  async function (request:FastifyRequest<{Body: UserCreatetionsAttr}>, reply) {
    const res = await client.query(
        'INSERT INTO users (name, last_name, sex, problems) VALUES ($1, $2, $3, $4)',
        [request.body.name, request.body.last_name, request.body.sex, request.body.problems]
    )
    const history = new UserHistory();
    history.createRecord(operation_type.create, request.body);
    return res
  })

  fastify.get('/',
  {
    schema:{
    tags: ['users']
    }
  }, 
  async function (request, reply) {
    const res = await client.query('SELECT * FROM users')
    return res['rows']
  })

  fastify.put('/:id',
    {
        schema:{
        tags: ['users'],
        body: userCreationShema
    }
  }, 
  async function (request:FastifyRequest<{Params: {id: number}, Body: UserCreatetionsAttr}>, reply) {
    
    try {
        const result = await client.query('UPDATE users SET name = $1, last_name = $2, sex = $3, problems = $4 WHERE id = $5',
        [request.body.name, request.body.last_name, request.body.sex, request.body.problems, request.params.id]
        )
            if (result.rowCount === 0) {
                return reply.code(404).send({ error: 'User not found' });
            }
            const history = new UserHistory();
            history.createRecord(operation_type.update, request.body,request.params.id);
            return reply.code(200).send({ success: true });
        } catch (error:any) {
            return reply.code(500).send({ error: 'Database error', details: error.message });
        }
  })
  fastify.patch('/:id',
    {
        schema:{
        tags: ['users'],
            body: {
                properties: userCreationShema.properties,
                required: [],
                type: 'object'
            }
        }
        
    }, 
    async function (request: FastifyRequest<{Params: {id: number}, Body: UserCreatetionsAttr}>, reply) {
        const keys = Object.keys(request.body);
        if (!request.body || keys.length === 0) {
            return reply.code(400).send({ error: 'Nothing to update' });
        }
    
        
        const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
        const query = `UPDATE users SET ${setClause} WHERE id = $${keys.length + 1}`;
        const params = [...keys.map(key => (request.body as any)[key]), request.params.id];

        try {
            const result = await client.query(query, params);
            if (result.rowCount === 0) {
                return reply.code(404).send({ error: 'User not found' });
            }
            const history = new UserHistory();
            history.createRecord(operation_type.update, request.body, request.params.id);
            return reply.code(200).send({ success: true });
        } catch (error:any) {
            return reply.code(500).send({ error: 'Database error', details: error.message });
        }
    })
}

export default users;