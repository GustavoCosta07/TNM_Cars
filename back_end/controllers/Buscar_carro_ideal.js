
const connection = require('../connection')

module.exports = async (request, response) => {
    const data = request.body

    const validators = {
        valorParcela: 'O valor da parcela é obrigatório',
        qtdParcelas: 'A quantidade de parcelas é obrigatória',
        porcentagem: 'A porcentagem é obrigatória',
        cambio: 'O câmbio é obrigatório',
        custoCombutivel: 'O custo de combustível é obrigatório',
        estilo: 'O estilo é obrigatório'
    }

    for (const [key, value] of Object.entries(validators)) {
        if (!data[key]) {
            return response.status(400).json({ error: value })
        }
    }

    const valorParcela = Number.parseFloat(data.valorParcela.split(',').join('.'))
    const totalCarro = Number.parseFloat(valorParcela * data.qtdParcelas)
    const porcentagem = (data.porcentagem * totalCarro / 100)
    const valorCarroMaisPorcentagem = totalCarro + porcentagem
    const valorCarroMenosPorcentagem = (totalCarro - porcentagem)
    const cambio = data.cambio
    const consumo = data.custoCombutivel

    if (!data) {
        console.log('la')
    }

    if (!data.valorParcela || !data.qtdParcelas || !data.porcentagem || !data.cambio || !data.custoCombutivel || !data.estilo) {
        return response.status(400).json({ error: 'O preenchimento de todos os campos são obrigatórios' })
    }

    const estilosPermitidos = {
        hatch: `estilo = 'hatch'`,
        sedan: `estilo = 'sedan'`,
        suv: `estilo = 'suv'`,
        picape: `estilo = 'picape'`,
        todos: `(estilo = 'hatch' or estilo = 'sedan' or estilo = 'suv' or estilo = 'picape')`
    }

    let select = `SELECT * FROM carros where ${estilosPermitidos[data.estilo]}`

    if (data.custoCombutivel === 'todos') {
        select += ` and (consumo = 'baixo' or consumo = 'medio' or consumo = 'alto')`
    } else {
        select += ` and consumo = '${consumo}'`
    }


    if (data.cambio === 'todos') {
        select += ` and (cambio = 'manual' or cambio = 'automatico')`
    } else {
        select += ` and cambio = '${cambio}'`
    }

    select += ` and valor BETWEEN ${valorCarroMenosPorcentagem} AND ${valorCarroMaisPorcentagem} `

    const carros = await connection.awaitQuery(select);

    response.json(carros)
}