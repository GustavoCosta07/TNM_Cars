const connection = require('../connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (request, response) => {

    const { email, senha } = request.body

    const query = `SELECT id, senha as senhaCryp, nome FROM users where email = "${email}"`

    const dados = await connection.awaitQuery(query)

    const { senhaCryp, nome, id } = dados[0]

    if (!senhaCryp) {
        return response.status(400).json({ error: 'email ou senha inválidos' })
    }

    const senhaEvalida = await bcrypt.compare(senha, senhaCryp);

    if (senhaEvalida) {

        const chave = {
            id,
            nome,
            email
        }

        const token = jwt.sign(
            chave,
            process.env.SECRET, 
            {
                expiresIn: '1h' 
            }
        );

        response.status(200).json({ token, nome });
    }
}
