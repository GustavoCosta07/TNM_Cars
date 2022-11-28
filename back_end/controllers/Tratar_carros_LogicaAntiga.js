
const connection = require('../connection')

module.exports = async (request, response) => {

    const dados = [
        {
            "id": 2,
            "nome": "gol",
            "marca": "volkswagen",
            "modelo": "1.0 12v",
            "ano": 2022,
            "valor": 65000.7,
            "descricao": "dsnfsakfvmarl;vmg",
            "foto": "https://cdn.motor1.com/images/mgl/MQWXX/s3/2020-honda-civic-si-coupe.webp",
            "estilo": "hatch",
            "cambio": "automatico",
            "consumo": "baixo"
        },

        {
            "id": 4,
            "nome": "gol",
            "marca": "volkswagen",
            "modelo": "1.0 12v",
            "ano": 2022,
            "valor": 65000.7,
            "descricao": "dsnfsakfvmarl;vmg",
            "foto": "https://cdn.motor1.com/images/mgl/MQWXX/s3/2020-honda-civic-si-coupe.webp",
            "estilo": "hatch",
            "cambio": "automatico",
            "consumo": "baixo"
        },

        {
            "id": 22,
            "nome": "gol",
            "marca": "volkswagen",
            "modelo": "1.0 12v",
            "ano": 2022,
            "valor": 65000.7,
            "descricao": "dsnfsakfvmarl;vmg",
            "foto": "https://cdn.motor1.com/images/mgl/MQWXX/s3/2020-honda-civic-si-coupe.webp",
            "estilo": "hatch",
            "cambio": "automatico",
            "consumo": "baixo"
        }


    ]

    let repeticoes = dados.length

    for (const dado of dados) {
        const fs = require('fs')
        let content = dado.id.toString()

        if (!--repeticoes) {
            fs.appendFile('C:\\Users\\gucos\\Desktop\\TNM_cars\\test.txt', content, err => {
                if (err) {
                    console.err
                    return
                }
            })
        } else {

            fs.appendFile('C:\\Users\\gucos\\Desktop\\TNM_cars\\test.txt', content + ';', err => {
                if (err) {
                    console.err
                    return
                }
            })

        }
    }
    response.json()
}