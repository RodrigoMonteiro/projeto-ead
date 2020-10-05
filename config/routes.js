module.exports = app => {
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
}