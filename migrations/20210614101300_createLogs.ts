import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasLogsTable = await knex.schema.hasTable('logs');
    if(!hasLogsTable)
        await knex.schema.createTable('logs',(table)=>{
            table.increments();
            table.integer('game_id').unsigned;
            table.integer('player_id').unsigned;
            table.integer('color_id').unsigned;
            table.integer('round').unsigned;
            table.foreign('game_id').references('game.id');
            table.foreign('player_id').references('player.id');
            table.foreign('color_id').references('color.id');
        })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('logs');
}

