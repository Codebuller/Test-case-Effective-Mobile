import pg from 'pg'
const { Client } = pg;
const client = new Client({
  database:process.env.PG_DATABASE, 
  user:process.env.PG_USER, 
  password: process.env.PG_PASSWORD,
  host:'localhost',
  port:5432
  })
await client.connect()
export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return 'live';
  })
  fastify.get('/user_history/id',{
    schema:{
      tags: ['user_history'],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'number' },
          pageSize: { type: 'number' }
        }
      }
    }
  },
  async function (request, reply) {
    const {page, pageSize} = request.query;
    const response  = await client.query('SELECT * FROM user_history WHERE id between $1 and $2', [pageSize*(page-1), pageSize*(page-1)+pageSize]);

    return response['rows'];
  })
  fastify.get('/user_history/user_id',{
    schema:{
      tags: ['user_history'],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'number' },
          pageSize: { type: 'number' }
        }
      }
    }
  },
  async function (request, reply) {
    const {page, pageSize} = request.query;
    const response  = await client.query('SELECT * FROM user_history WHERE user_id between $1 and $2', [pageSize*(page-1), pageSize*(page-1)+pageSize]);

    return response['rows'];
  })
}
