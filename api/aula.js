module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    const save = async (req, res) => {
        const aula = { ...req.body }
        if (req.params.id) aula.id = req.params.id
        try {
            existsOrError(aula.data_aula, "Data não informada!")
            existsOrError(aula.assunto, "Assunto da aula não informado!")

            const data = await app.db('aulas')
                .where({ data_aula: aula.data_aula }).first()
            if (aula.id) {

                notExistsOrError(data, "Data já cadastrada!")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }
        if (aula.id) {
            await app.db('aulas')
                .update(aula)
                .where({ id: aula.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500))
        } else {
            await app.db('aulas')
                .insert(aula)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }
    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, "Código da aula não informado!")

            const atividades = await app.db('atividades')
                .where({ aula_id: req.params.id })
            notExistsOrError(atividades, 'A exclusão não pode ser efetuada porque existe atividade associada a aula')

            const rowDeleted = await app.db('aulas')
                .where({ id: req.params.id }).del()
            existsOrError(rowDeleted, 'Aula não encontrada!')
            res.status(204).send()

        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const get = async (req, res) => {
        await app.db('aulas')
            .then(aulas => res.json(aulas))
            .catch(err => res.status(500).sen(msg))
    }
    const getById = async (req, res) => {
        await app.db('aulas')
            .where({ id: req.params.id }).first()
            .then(aulas => res.json(aulas))
            .catch(err => res.status(500).sen(err))
    }


    // const toTree = async (aulas, tree) => {
    //     if (!tree) {
    //         aulas = await db('aulas')

    //     }
    // }
    return { save, get, remove, getById }
}