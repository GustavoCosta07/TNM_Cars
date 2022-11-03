const connection = require('../connection')

module.exports = async (request, response) => {
    const data = request.usuario

    const query = `DELETE a.*, b.* 
    FROM users a 
    LEFT JOIN favoritos b 
    ON b.idUser = a.id 
    WHERE a.id = ${data.id}`

    const deletarUsuario = await connection.awaitQuery(query)

    response.status(200).json({menssagem: 'Usuário deletado com sucesso'});

}