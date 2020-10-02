module.exports = app => {
    app.route('/users')
    // POdemos fazer desta forma graças a o cosign
    .post(app.api.user.save)
}