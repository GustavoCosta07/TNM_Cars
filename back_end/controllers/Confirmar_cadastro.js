const connection = require('../connection')
const jwt = require('jsonwebtoken')
const { segredo } = require('../env')

module.exports =  async (request, response) => {
    try {


        const token = request.query.token
        const dadosDecodificados = jwt.verify(token, segredo)

        const query = `update users set confirmacao = 'Y' where id = ${dadosDecodificados.id}`
        let confirmacao = await connection.awaitQuery(query)

        response.send(` <h1> seu cadastro foi confirmado com sucesso, retorne para a página de Login e acesse o site com suas credenciais
        <h1>
            <a href="http://127.0.0.1:5500/front%20_end/login/login.html" >Logar</a>

            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }
                a {
                    text-decoration: none;
                    width: 13vh;
                    
                    padding: 15px 17px;
                    
                    margin-left: 80vh;
                    margin-top: 3vh;
                    background-color: #eb2f06;
                    color: white;
                    border-radius: 5px;
                    border-color: transparent;
                    display: block;
                  }
            </style>`)
        // response.sendFile("C:\\Users\\gucos\\Desktop\\TNM_cars\\front _end\\index.html")
    } catch (error) {
        response.send("<h1>Link expirado!<h1>")
    }
}