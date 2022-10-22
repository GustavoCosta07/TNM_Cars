const connection = require('../connection')

module.exports = async (request, response) => {
    const data = request.body

    const email = data.email
    const nome = data.nome
    const senha = data.senha
    const confirmacaoDeSenha = data.confirmacaoDeSenha

    if (senha.length != 6) {
        return response.status(400).json({ error: 'A senha precisa ter seis caracteres' })
    }
    if (senha != confirmacaoDeSenha) {
        return response.status(400).json({ error: 'As senhas não conferem' })
    }

    const query = "INSERT INTO users (email, senha, nome) VALUES (?,?,?)"
    const insertedUser = await  connection.awaitQuery(query, [email, senha, nome])

    response.json(insertedUser)


}