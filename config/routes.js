module.exports = app => {
    app.route('/users')
    // Podemos fazer desta forma graças a o cosign
    .post(app.api.user.save)
    .get(app.api.user.get)

    app.route('/users/:id')
    .put(app.api.user.save)

}