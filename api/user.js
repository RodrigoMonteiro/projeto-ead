// Criptografar a senha
const bcrypt = require('bcrypt-nodejs')




module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation


    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    //Serve para salvar um usuário e para salvar alguma alteração 
    const save = async (req, res) => {
        //O spread vai fazer uma cópia do corpo da requisição e associar a uma constante
        const user = { ...req.body }
        // Se houve id  na requisição,  setamos no nosso "clone"
        if (req.params.id) user.id = req.params.id
        try {
            existsOrError(user.name, "Nome não informado!")
            existsOrError(user.email, "E-mail não informado!")
            existsOrError(user.password, "Senha não informada!")
            existsOrError(user.confirmPassword, "Confirmação de senha inválida!")

            equalsOrError(user.password, user.confirmPassword, "Senhas não conferem!")

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
            if (user.id) {

                notExistsOrError(userFromDB, "Usuário já cadastrado!")
            }



        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        //realizando de fato o update
        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500))
        } else {
            // Inserindo o usuário
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }
    return { save, get }
}