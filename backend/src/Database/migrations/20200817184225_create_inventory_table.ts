import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('inventory', (table) => {
        table.uuid('id').primary().notNullable();
        table
            .integer('fiji_water')
            .notNullable()
            .comment('quantity')
            .defaultTo(0);
        table
            .integer('fiji_water_value')
            .notNullable()
            .defaultTo(14)
            .comment('points');

        table
            .integer('campbell_soup')
            .notNullable()
            .comment('quantity')
            .defaultTo(0);
        table
            .integer('campbell_soup_value')
            .notNullable()
            .defaultTo(12)
            .comment('points');

        table
            .integer('first_aid_pouch')
            .notNullable()
            .comment('quantity')
            .defaultTo(0);
        table
            .integer('first_aid_pouch_value')
            .notNullable()
            .comment('points')
            .defaultTo(10);

        table.integer('AK47').notNullable().comment('quantity').defaultTo(0);
        table
            .integer('AK47_value')
            .notNullable()
            .comment('points')
            .defaultTo(8);

        table.uuid('owner').references('id').inTable('survivors');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('inventory');
}
