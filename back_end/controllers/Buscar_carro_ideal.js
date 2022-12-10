
const connection = require('../connection')

module.exports = async (request, response) => {
    const data = request.body

    if (data.cambio && data.estilo && data.anoMaximo && data.anoMinimo && data.precoMaximo && data.precoMinimo) {
        console.log('entrou aq')
        let querySelect = `select * from carros `

        if (data.cambio == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `where cambio = '${data.cambio}' `
        }

        if (data.estilo == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `and estilo = '${data.estilo}' `
        }

        if (data.anoMinimo == 'Todos' && data.anoMaximo == 'Todos') {
            querySelect += ``
        }
        let comando = 'where'

        if (querySelect != 'select * from carros ') {
            comando = 'and'
        }

        if (data.anoMinimo == 'Todos' && data.anoMaximo != 'Todos') {
            querySelect += `${comando} ano between 1500 and ${data.anoMaximo} `
        }

        if (data.anoMaximo == 'Todos' && data.anoMinimo != 'Todos') {
            querySelect += `${comando} ano between ${data.anoMinimo} and 3000 `
        }

        if (data.anoMaximo != 'Todos' && data.anoMinimo != 'Todos') {
            querySelect += `${comando} ano between ${data.anoMinimo} and ${data.anoMaximo} `
        }
        
        if (querySelect != 'select * from carros ') {
            comando = 'and'
        }

        if (data.precoMinimo == 'Todos' && data.precoMaximo == 'Todos') {
            querySelect += ``
        }
        if (data.precoMinimo == 'Todos' && data.precoMaximo != 'Todos') {
            querySelect += `${comando} valor between 1500 and ${data.precoMaximo} `
        }

        if (data.precoMaximo == 'Todos' && data.precoMinimo != 'Todos') {
            querySelect += `${comando} valor between ${data.precoMinimo} and 900000 `
        }

        if (data.precoMaximo != 'Todos' && data.precoMinimo != 'Todos') {
            querySelect += `${comando} valor between ${data.precoMinimo} and ${data.precoMaximo} `
        }

        console.log(querySelect)
        const carros = await connection.awaitQuery(querySelect);


        for (const { id } of carros) {

            const existeCarro = await connection.awaitQuery(`select * from carros_populares where idcarro = ${id}`)
            if (existeCarro[0]) {
                const voto = existeCarro[0].votos + 1
                await connection.awaitQuery(`update carros_populares set votos = ${voto} where idcarro = ${id}`)
            } else {
                await connection.awaitQuery(`INSERT INTO carros_populares (idcarro, votos) values (?,?)`, [id, 1])
            }
        }

        return response.json(carros)
    }


    if (data.estado && data.marca && data.carroceria && data.cambio) {

        const { estado, marca, carroceria, cambio } = request.body

        console.log('entrou aq agora cara')

        let querySelect = `select * from carros `

        if (estado == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `where estado = '${estado}' `
        }


        let comando = 'where'

        if (querySelect != 'select * from carros ') {
            comando = 'and'
        }



        if (marca == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `${comando} marca = '${marca}' `
        }

        if (querySelect != 'select * from carros ') {
            comando = 'and'
        }

        if (carroceria == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `${comando} estilo = '${carroceria}' `
        }

        if (querySelect != 'select * from carros ') {
            comando = 'and'
        }

        if (cambio == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `${comando} cambio = '${cambio}'`
        }

        console.log(querySelect)
        const carros = await connection.awaitQuery(querySelect);
        return response.json(carros)

    }


}