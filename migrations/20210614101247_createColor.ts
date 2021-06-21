import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasColorTable = await knex.schema.hasTable('color');
    if(!hasColorTable)
        await knex.schema.createTable('color',(table)=>{
            table.increments();
            table.string('colorname');
        })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('color');
}

