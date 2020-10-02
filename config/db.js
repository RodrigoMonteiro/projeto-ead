const config = require ('../knexfile.js')
// Passando a configuração para o knex
const knex = require('knex')(config)
knex.migrate.latest([config])

module.exports = knex