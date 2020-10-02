module.exports = app => {
    app.route('/users')
    // POdemos fazer desta forma graças a o cosign
    .get(app.api.user.save)
}