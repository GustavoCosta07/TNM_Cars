
const express = require('express')
const mysql = require('mysql-await')
const app = express()
app.use(express.json())

app.use('/static', express.static(__dirname + '/imagens'));

app.post('/carro_ideal', async (request, response) => {
    // 5 - aplicar filtro consumo combustível () 
    const data = request.body
    console.log(data)
    const valorParcela = Number.parseFloat(data.valorParcela.split(',').join('.'))
    const totalCarro = Number.parseFloat(valorParcela * data.qtdParcelas)
    const porcentagem = (data.porcentagem * totalCarro / 100)
    const valorCarroMaisPorcentagem = totalCarro + porcentagem
    const valorCarroMenosPorcentagem = (totalCarro - porcentagem)
    const cambio = data.cambio
    const estilo = data.estilo

    const estilosPermitidos = {
        hatch: `estilo = 'hatch'`,
        sedan: `estilo = 'sedan'`,
        suv: `estilo = 'suv'`,
        picape: `estilo = 'picape'`,
        todos: `(estilo = 'hatch' or estilo = 'sedan' or estilo = 'suv' or estilo = 'picape')`
    }

    let select = `SELECT * FROM carros where ${estilosPermitidos[data.estilo]}`

    if (data.cambio === 'todos') {
        select += ` and (cambio = 'manual' or cambio = 'automatico')`
    } else {
        select += ` and cambio = '${cambio}'`
    }

    select += ` and valor BETWEEN ${valorCarroMenosPorcentagem} AND ${valorCarroMaisPorcentagem} `

    const connection = mysql.createConnection({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "root",
        database: "tnm",
        throwErrors: false
    });

    connection.on(`error`, (err) => {
        console.error(`Connection error ${err.code}`);
    });

    const carros = await connection.awaitQuery(select);

    console.log(carros);

    response.json(carros)

})

app.post('/test', async (request, response) => {
    console.log('request.query ', request.query)
    console.log('request.body ', request.body)
})

app.listen(3456, () => {
    console.log('aplicação rodando')
})

