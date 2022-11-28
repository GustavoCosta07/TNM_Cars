
const connection = require('../connection')

module.exports = async (request, response) => {

    const fs = require('fs')


    fs.readFile('C:\\Users\\gucos\\Desktop\\TNM_cars\\test.txt', 'utf-8', async (err, data) => {
        if (err) {
            console.err
            return
        }

        const myArray = data.split(";");
        // console.log(myArray)
        // console.log(myArray.length)

        myArray.sort((a, b) => a - b)

        function countItems(arr) {
            const countMap = Object.create(null);

            for (const element of arr) {
                if (!countMap[element]) {
                    countMap[element] = 1;
                } else {
                    countMap[element] += 1;
                }
            }
            return Object.entries(countMap).map(([value, count]) => ({
                id: value,
                quantidade: count
            }));

        }

        const idsOrdenados = countItems(myArray)

        let ids = []

        let repeticoes = idsOrdenados.length

        for (const id of idsOrdenados) {

            if (!--repeticoes) {
                ids += id.id 
            }else{

                ids += id.id + ' or id = '
            }

        }

        const query = `SELECT * FROM carros where id = ${ids}`
        const buscarCarrosPopulares = await connection.awaitQuery(query)
        console.log(idsOrdenados)
        console.log(idsOrdenados[4])


        const carrosPopulares = []
        let contador = 0
        for (const carro of buscarCarrosPopulares) {
            
            if (carro.id.toString() === idsOrdenados[contador].id ) {
                for (let index = 1; index < idsOrdenados.length; index++) { 
                    console.log(idsOrdenados[contador].quantidade)
                    console.log(idsOrdenados[index].quantidade)
                    if (idsOrdenados[contador].quantidade > idsOrdenados[index].quantidade ) {
                        carrosPopulares[contador] = carro
                        console.log('ola')
                    }
                }
            }
          
            contador++
        }            
        console.log(idsOrdenados)
        // console.log(carrosPopulares)



        response.json(buscarCarrosPopulares)
    })


    


    fs.appendFile('C:\\Users\\gucos\\Desktop\\TNM_cars\\test.txt', ';', err => {
        if (err) {
            console.err
            return
        }
    })

    // response.json()
}