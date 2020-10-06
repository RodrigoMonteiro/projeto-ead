module.exports = app => {
    const { existsOrError} = app.api.validation


    const save = async (req, res) => {
        const atividade = { ...req.body }
        if (req.params.id) atividade.id = req.params.id
        try {
            existsOrError(atividade.data_entrega, "Data da entrga não informada!")
            existsOrError(atividade.nome_atividade, "Nome da atividade não informado!")
            existsOrError(atividade.aula_id, "Aula associada a atividade não informada!")
            existsOrError(atividade.content, "Conteúdo da atividade não informado!")
        } catch (msg) {
            res.status(400).send(msg)
        }
        if (atividade.id) {
            await app.db('atividades')
                .update(atividade)
                .where({ id: atividade.id })
                .then(_ => { res.status(204).send() })
                .catch(err => res.status(500).send(err))
        } else {
            await app.db('atividades')
                .insert(atividade)
                .then(_ => { res.status(204).send() })
                .catch(err => res.status(500).send(err))

        }



    }

    const remove = async (req, res) => {
        try {
            const rowDeleted = await app.db('atividades')
                .where({ id: req.params.id }).del()
            ExistsOrError(rowDeleted, "Atividade não encontrada!")
            res.status(204).send()


        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    // Para implementar o paginador
    const limit = 5
    const get = async (req, res) => {
        //Esperamos que venha a página na requisição, caso nao venha vai para 1 por default
        const page = req.query.page || 1

        const result = await app.db('atividades').count('id').first()
        const count = parseInt(result.count)

        app.db('atividades')
            .select('id', 'nome_atividade', 'data_entrega')
            .limit(limit).offset(page * limit - limit)
            .then(atividades => res.json({ data: atividades, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        await app.db('atividades')
            .where({ id: req.params.id }).first()
            .then(atividade => {
                // Fazemos isso devido ao content vim no formato binário
                atividade.content = atividade.content.toString()
                return res.json(atividade)
            })
            .catch(err => res.status(500).send(err))
    }
    return { save, get, getById, remove }
}