const connection = require('../connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (request, response) => {

    const { senha } = request.body

    const emailUsers = request.body.email

    if (!emailUsers || !senha) {
        return response.status(400).json({ error: 'email ou senha inválidos' })
    }

    if (senha.length < 6) {
        return response.status(400).json({ error: 'email ou senha inválidos' })
    }
    
    const query = `SELECT id, senha as senhaCryp, nome, email FROM users where email = "${emailUsers}"`

    const dados = await connection.awaitQuery(query)
    
    if (!dados[0]) {
        return response.status(400).json({ error: 'email ou senha inválidos' })
    }
    
    const { senhaCryp, nome, id, email } = dados[0]
    
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

    response.status(200).json({ token, nome, email});

}
