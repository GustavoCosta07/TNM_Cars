const connection = require('../connection')
const bcrypt = require('bcrypt')

module.exports = async (request, response) => {
    const data = request.body

    const { email, nome, senha, confirmacaoDeSenha } = data

    if (senha.length != 6) {
        return response.status(400).json({ error: 'A senha precisa ter seis caracteres' })
    }
    if (senha != confirmacaoDeSenha) {
        return response.status(400).json({ error: 'As senhas não conferem' })
    }

    const senhaCryp = await bcrypt.hash(senha, 10)

    const query = "INSERT INTO users (email, senha, nome) VALUES (?,?,?)"
    const insertedUser = await connection.awaitQuery(query, [email, senhaCryp, nome])

    response.json(insertedUser)


}