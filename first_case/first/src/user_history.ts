import { UserCreatetionsAttr } from "./interfaces.js";
import pg from 'pg'
export enum operation_type {
    create = 'create',
    update = 'update',
}
// interface UserHistoryRecord {
//     user_id: number,
//     operation_type:operation_type,
//     stringify_obj:string
// }
const { Client } = pg;

    const client = new Client({
        database:process.env.PG_DATABASE, 
        user:process.env.PG_USER, 
        password: process.env.PG_PASSWORD,
        host:'localhost',
        port:5432
        })
    await client.connect()
export class UserHistory {


    async createRecord( type: operation_type, updateObject:UserCreatetionsAttr, userId?: number) {
        client.query('insert into user_history (user_id, operation_type, stringify_obj) values ($1, $2, $3)', [userId, type, JSON.stringify(updateObject)])
    }
}