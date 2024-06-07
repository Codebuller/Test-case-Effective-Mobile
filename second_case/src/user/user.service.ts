import { Injectable, OnModuleInit } from '@nestjs/common';
import * as pg from 'pg'
var pgClient; 
@Injectable()
export class UserService implements OnModuleInit{

    constructor() {}
    
    async getCount(){
        
        
        const response  = await pgClient.query('update users set problems = false where problems=true ; ');
        return response.rowCount;
    }
    async onModuleInit(){
        
        pgClient = new pg.Client({
                    database:process.env.PG_DATABASE, 
                    user:process.env.PG_USER, 
                    password: process.env.PG_PASSWORD})
        await pgClient.connect();
    }
}
