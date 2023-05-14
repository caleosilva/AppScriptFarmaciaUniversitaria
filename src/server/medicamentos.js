const idSheet = "1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA";

const realizarQuery = (nomeDaAba, primeiraCol, ultimaCol, consulta) => {

    var currentDoc = SpreadsheetApp.openById(idSheet)
    var tempSheet = currentDoc.insertSheet();

    var ws = currentDoc.getSheetByName(nomeDaAba);
    var lr = ws.getLastRow();

    var targetRange = nomeDaAba + '!' + primeiraCol + '2:' + ultimaCol + lr;
    var Query = '=QUERY(' + targetRange + ';\"' + consulta + '\")';

    var pushQuery = tempSheet.getRange(1, 1).setFormula(Query);
    var pullResult = tempSheet.getDataRange().getValues();

    currentDoc.deleteSheet(tempSheet);
    return pullResult;
}

const getDateToday = () => {
    var data = new Date();
    var dataFormatada = (data.getUTCDate()) + "-" + (data.getMonth() + 1) + "-" + data.getFullYear();
    return dataFormatada;
}

export const getMedicamentos = () => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Medicamentos");
    var data = ws.getRange(2, 1, ws.getLastRow() - 1, 7).getValues();

    var informacoes = [];

    for (i = 0; i < data.length; i++) {
        var dataCadastro = new Date(data[i][1]);
        var dataCadastroFormatada = (dataCadastro.getUTCDate()) + "-" + (dataCadastro.getMonth() + 1) + "-" + dataCadastro.getFullYear();

        const remedio = {
            "chaveGeral": data[i][0],
            "dataCadastroPura": data[i][1],
            "dataCadastro": dataCadastroFormatada,
            "nome": data[i][2],
            "principioAtivo": data[i][3],
            "tarja": data[i][4],
            "classe": data[i][5],
            "apresentacao": data[i][6]
        }
        informacoes.push(remedio)
    }

    return JSON.stringify(informacoes);
};

export const getInformacoesMedicamentos = () => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("InformacoesMedicamentos");
    var data = ws.getRange(2, 1, ws.getLastRow() - 1, 5).getValues();

    var informacoes = [];

    let classes = []
    let tiposMedicamentos = []
    let tarja = []
    let apresentacao = []
    let motivoDescarte = []

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {

            if (data[i][j].length > 0 && j == 0) {
                classes.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 1) {
                tiposMedicamentos.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 2) {
                tarja.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 3) {
                apresentacao.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 4) {
                motivoDescarte.push(data[i][j]);
            }
        }
    }
    informacoes.push(classes, tiposMedicamentos, tarja, apresentacao, motivoDescarte)
    return JSON.stringify(informacoes);
}   

export const encontrarMedicamentoTabelaMedicamentos = (chaveDeBusca) => {
    var sql = "select * where A = '" + chaveDeBusca + "'";
    var dados = realizarQuery('Medicamentos', 'A', 'G', sql)

    if (dados[0][0] === '#N/A') {
        return false;
    } else {
        var informacoes = [];

        for (let i = 0; i < dados.length; i++) {
            var data = {
                chaveGeral: dados[i][0],
                dataCadastro: dados[i][1],
                nome: dados[i][2],
                principioAtivo: dados[i][3],
                tarja: dados[i][4],
                classe: dados[i][5],
                apresentacao: dados[i][6]
            }
            informacoes.push(data)
        }

        return informacoes;
    }
}

export const appendRowMedicamentos = (medicamento) => {
    //Abrindo a planilha:
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Medicamentos");

    // Verificando se o medicamento existe:
    var codigo = medicamento.chaveGeral;
    if(encontrarMedicamentoTabelaMedicamentos(codigo)){
        return false;
    } else {
        var dataCadastro = getDateToday();
        ws.appendRow([
            medicamento.chaveGeral,
            dataCadastro,
            medicamento.nome,
            medicamento.principioAtivo,
            medicamento.classe,
            medicamento.tarja,
            medicamento.apresentacao
        ]);
        return true;
    }
}

export const updateRowMedicamentos = (medicamento) => {
    // ESTÁ ATUALIZANDO SOMENTE NA TABELA DE MEDICAMENTOS, PORÉM AO MUDAR O NOME OU O PRINCIPIO CASO A CHAVE MUDE É NECESSÁRIO MUDAR EM SUAS REFERÊNCIAS TBM
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Medicamentos");

    // Formatanto a data e pegando novo código
    // var dataCadastro = new Date(medicamento.dataCadastro);
    // var dataCadastroFormatada = (dataCadastro.getUTCDate()) + "-" + (dataCadastro.getMonth() + 1) + "-" + dataCadastro.getFullYear();
    var hoje = getDateToday()
    var dataHoje = hoje.toISOString().slice(0, 10);
    var chaveGeral = (medicamento.nome + '#' + medicamento.principioAtivo).toString().toLowerCase().replace(/\s+/g, '');

    var novosDados = [chaveGeral, dataHoje, medicamento.nome, medicamento.principioAtivo, medicamento.tarja, medicamento.classe, medicamento.apresentacao];
    var valorBuscado = medicamento.chaveGeral;

    // Busca binária e atualização:
    var posicao = buscarValor('Medicamentos', valorBuscado, 1, false, true)
    // Se achar o medicamento:
    if (posicao) {
        // Atualiza na tabela principal
        ws.getRange('A' + posicao + ':G' + posicao).setValues([novosDados]);

        // Verifica se a chave geral mudou para atualizar e reordenar as tabelas:
        if (valorBuscado !== chaveGeral) {
            // Atualização:

            //Ordenação:
            ordenarPlanilha('Medicamentos', 1)
        }
        return posicao;
    } else {
        return false;
    }
}