exports.up = function (knex, Promise) {
    return knex.schema.createTable('aulas', table => {
        table.increments('id').primary()
        table.string('data_aula').notNull()
        table.string('assunto').notNull()
        table.string('referencias')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('aulas')
};
