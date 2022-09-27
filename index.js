let respostas = []
let contadorQuestao = 0

const perguntas = [
    {
        pergunta: "Qual o valor de parcela você gostaria de pagar por mês?",
        resposta: '<input type="text">'
    },
    {
        pergunta: "Em quantas parcelas você deseja quitar o veículo?",
        resposta: '<input type="text">'
    },
    {
        pergunta: "Fazendo um cálculo de valor total do veículo, podemos te retornar veículos que estejam quantos porcento a mais? ",
        resposta: `<select name="porcentagem">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
    </select>`

    },
    {
        pergunta: "O veículo precisa ser manual ou automático? ",
        resposta: `<select name="cambio">
            <option value="manual">Manual</option>
            <option value="automatico">automatico</option>
        </select>`
    },
    {
        pergunta: "O veículo deve ser hatch, sedan, suv ou picape?",
        resposta: ` <select name="estilo">
        <option value="hatch">hatch</option>
        <option value="sedan">sedan</option>
        <option value="suv">suv</option>
        <option value="picape">picape</option>
        </select>`
    },
    {
        pergunta: "Numa escala de 1 a 3, o quão importante pra você é que o carro seja econômico?",
        resposta: `<select name="economico">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>`
    }
]
const qtdQuestoes = perguntas.length

const buscarCarros = () => {

    const respostas2 = {
        valorParcela: respostas[0].resposta,
        qtdParcelas: respostas[1].resposta,  
        porcentagem: respostas[2].resposta,
        cambio: respostas[3].resposta,
        estilo: respostas[4].resposta,
        custoCombutivel: respostas[5].resposta
    }

    respostas = []

    fetch('http://localhost:3456/carro_ideal', {
        method: 'POST',
        body: JSON.stringify(respostas2),
        // body: JSON.stringify({a: 1, b: 'Textual content'}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(dados => {
        return dados.json()
    }).then(dados => {
        console.log(dados)
    })

    
}

function openModal() {
    if (contadorQuestao === 0) {
        document.getElementById("anterior").style.display = "none"

    }
    if (contadorQuestao === (qtdQuestoes - 1)) {
        return;
    }

    $('#questao').text(perguntas[contadorQuestao].pergunta);
    $('#resposta').html(perguntas[contadorQuestao].resposta);
    $('#myModal').modal('show');
}

const proximaQuestao = () => {

    if (contadorQuestao >= 0) {
        $("#anterior").css('display', 'inline')
    }

    const penultima = qtdQuestoes - 2

    if (contadorQuestao === penultima) {
        $("#proximo").text('Finalizar')
    }

    receberResposta()

    if (contadorQuestao === (qtdQuestoes - 1)) {

        $('#myModal').modal("hide")
        $("#proximo").text('Próxima')
        buscarCarros()
        contadorQuestao = 0
        return;
    }

    contadorQuestao++

    $('#questao').text(perguntas[contadorQuestao].pergunta);
    $('#resposta').html(perguntas[contadorQuestao].resposta);
}

const questaoAnterior = () => {

    if (contadorQuestao <= 1) {
        document.getElementById("anterior").style.display = "none"

    }
    console.log(contadorQuestao)

    contadorQuestao--

    $("#proximo").text("Próxima")

    $('#questao').text(perguntas[contadorQuestao].pergunta);
    $('#resposta').html(perguntas[contadorQuestao].resposta);

    document.getElementById("proximo").style.display = "inline"

}

const receberResposta = () => {
    respostas.push({
        resposta: $("#resposta").children().val()
    })

}
