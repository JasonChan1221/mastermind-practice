import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasPlayerTable = await knex.schema.hasTable('player');
    if(!hasPlayerTable)
        await knex.schema.createTable('player',(table)=>{
            table.increments();
            table.string('username');
            table.string('password');
            table.string('profile_pic')
        })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('player');
}

