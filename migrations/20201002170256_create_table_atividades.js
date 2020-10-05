exports.up = function (knex, Promise) {
    return knex.schema.createTable('atividades', table => {
        table.increments('id').primary()
        table.string('data_entrega').notNull()
        table.string('nome_atividade').notNull()
        table.integer('aula_id').references('id').inTable('aulas').notNull()
        table.binary('content').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.dropTable('atividades')
    
};
