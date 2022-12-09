
const connection = require('../connection')
const jwt = require('jsonwebtoken')
const { segredo } = require('../env')

module.exports =  async (request, response) => {
    try {


        const token = request.query.token
        const dadosDecodificados = jwt.verify(token, segredo)

        const query = `update users set confirmacao = 'Y' where id = ${dadosDecodificados.id}`
        let confirmacao = await connection.awaitQuery(query)

        response.send(`<h1> sua conta foi confirmada com sucesso!<h1>`)
    } catch (error) {
        response.send("<h1>Token não autorizado!<h1>")
    }
}


 