module.exports = app => {
    
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    
    app.route('/users')
        // Podemos fazer desta forma graças a o cosign
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/aulas')
        .get(app.api.aula.get)
        .post(app.api.aula.save)

    app.route('/aulas/:id')
        .get(app.api.aula.getById)
        .put(app.api.aula.save)
        .delete(app.api.aula.remove)


    app.route('/atividades')
        .get(app.api.atividade.get)
        .post(app.api.atividade.save)

    app.route('/atividades/:id')
        .get(app.api.atividade.getById)
        .post(app.api.atividade.save)
        .delete(app.api.atividade.remove)

        app.route('/aulas/:id/atividades')
        .get(app.api.atividade.getByAula)
}