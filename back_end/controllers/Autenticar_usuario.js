const connection = require('../connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (request, response) => {

    const { email, senha } = request.body

    if (!email || !senha) {
        return response.status(400).json({ error: 'email ou senha inválidos' })
    }

    if (senha.length < 6) {
        return response.status(400).json({ error: 'email ou senha inválidos' })
    }
    
    const query = `SELECT id, senha as senhaCryp, nome FROM users where email = "${email}"`

    const dados = await connection.awaitQuery(query)
    // console.log(dados)
    const { senhaCryp, nome, id } = dados[0]

    if (!senhaCryp) {
        return response.status(400).json({ error: 'email ou senha inválidos' })
    }

    const senhaEvalida = await bcrypt.compare(senha, senhaCryp);

    if (!senhaEvalida) {
        return response.status(400).json({ error: 'email ou senha inválidos' })
    }

    const token = jwt.sign(
        {
            id,
            nome,
            email
        },
        process.env.SECRET,
        {
            expiresIn: process.env.TIME_SECRET
        }
    );

    response.status(200).json({ token, nome });

}
