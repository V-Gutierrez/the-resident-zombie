import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('survivors', (table) => {
        table.uuid('id').primary().notNullable();
        table.string('name').notNullable().unique();
        table.integer('age').notNullable();
        table.enum('gender', ['M', 'F']).notNullable();
        table.float('latitude').notNullable().defaultTo(0);
        table.float('longitude').notNullable().defaultTo(0);
        table.boolean('infected').notNullable().defaultTo(false);
        table.integer('flags').notNullable().defaultTo(0);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('survivors');
}
