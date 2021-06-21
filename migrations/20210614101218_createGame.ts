import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasGameTable = await knex.schema.hasTable('game');
    if(!hasGameTable)
        await knex.schema.createTable('game',(table)=>{
            table.increments();
            table.string('answer');
            table.timestamps(false,true);
            table.integer('winner_id').unsigned;
            table.foreign('winner_id').references('player.id');
            table.boolean('winlose');
            table.integer('round');
        })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('game');
}

