const connection = require('../connection')

module.exports = async (request, response) => {
    const data = request.body

    const { id } = data

    const query = `DELETE users.*, favoritos.*
    FROM users
         INNER JOIN favoritos ON users.id = favoritos.idUser 
   WHERE (users.id)= ${id}`

    const deletarUsuario = await connection.awaitQuery(query)

    response.status(200).json({});

}