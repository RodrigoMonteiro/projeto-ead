const config = require ('../knexfile.js')
// Passando a configuração para o knex
const knex = require('knex')(config)


module.exports = knex