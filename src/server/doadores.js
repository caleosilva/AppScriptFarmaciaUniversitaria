const idSheet = "1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA";

const formatarData = (data) => {

    var novaData = new Date(data);
    var novaDataFormatada = (novaData.getUTCDate()) + "-" + (novaData.getMonth() + 1) + "-" + novaData.getFullYear();

    // Verifica se é o valor Default
    if (novaDataFormatada === "1-1-1900") {
        return "-";
    } else if (novaDataFormatada === "1-12-1899") {
        return "-"; // PQ TÁ ENTRANDO NESSE AQUI E NÃO NO OUTRO??
    } else {
        return novaDataFormatada;
    }

    // const caracteres = [...data]
    // const tamanho = caracteres.length;

    // if (tamanho <= 10) {
    //     return data
    // } else {
    //     var novaData = new Date(data);
    //     var novaDataFormatada = (novaData.getUTCDate()) + "-" + (novaData.getMonth() + 1) + "-" + novaData.getFullYear();

    //     // Verifica se é o valor Default
    //     if (novaDataFormatada === "01-01-1900") {
    //         return "-";
    //     } else {
    //         return novaDataFormatada;
    //     }

    // }
}

const montarQuery = (nomeDaAba, primeiraCol, ultimaCol, consulta) => {

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

const ordenarPlanilha = (nomeDaAba, colunaBase) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName(nomeDaAba);
    var range = ws.getDataRange().offset(1, 0); // começa na segunda linha
    range.sort(colunaBase);// ordena a faixa de células com base na coluna 1 (A)
}

export const queryDoador = (chaveDeBusca) => {
    var sql = "select * where A = '" + chaveDeBusca + "'";
    var dados = montarQuery('Doador', 'A', 'M', sql)

    if (dados[0][0] === '#N/A') {
        return false;
    } else {
        var informacoes = [];
        for (let i = 0; i < dados.length; i++) {
            var doador = {
                chaveDoador: dados[i][0],
                nome: dados[i][1],
                tipoDoador: dados[i][2],
                cidade: dados[i][3],
                bairro: dados[i][4],
                endereco: dados[i][5],
                numero: dados[i][6],
                comoSoube: dados[i][7],
                cnpj: dados[i][8],
                cpf: dados[i][9],
                dataNascimento: dados[i][10],
                sexo: dados[i][11],
                estadoCivil: dados[i][12]
            }

            informacoes.push(doador)
        }
        return informacoes;
    }
}

export const getDoadores = () => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Doador");
    var data = ws.getRange(2, 1, ws.getLastRow() - 1, ws.getLastColumn()).getValues();

    var informacoes = [];

    if (data.length == 0) {
        return false;
    }

    for (let i = 0; i < data.length; i++) {
        var info = {
            'chaveDoador': data[i][0],
            'nome': data[i][1],
            'tipoDoador': data[i][2],
            'cidade': data[i][3],
            'bairro': data[i][4],
            'endereco': data[i][5],
            'numero': data[i][6],
            'comoSoube': data[i][7],
            'cnpj': data[i][8],
            'cpf': data[i][9],
            'dataNascimento': data[i][10],
            'sexo': data[i][11],
            'estadoCivil': data[i][12],
        }
        informacoes.push(info);
    }

    return JSON.stringify(informacoes);
}

export const appendRowDoadores = (doador) => {

    // return JSON.stringify(doador);

    //Abrindo a planilha:
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Doador");

    // Verificando se o doador existe:
    var codigo = doador.chaveDoador;

    // var doadorBuscado = queryDoador("9988");

    // let dataNascimento = formatarData(doador.dataNascimento);

    // return JSON.stringify(dataNascimento);

    if (queryDoador(codigo)) {
        return false;
    } else {
        // return JSON.stringify(doador);

        let dataNascimento = formatarData(doador.dataNascimento);
        ws.appendRow([
            doador.chaveDoador,
            doador.nome,
            doador.tipoDoador,
            doador.cidade,
            doador.bairro,
            doador.endereco,
            doador.numero,
            doador.comoSoube,
            doador.cnpj,
            doador.cpf,
            dataNascimento,
            doador.sexo,
            doador.estadoCivil,

        ]);
        ordenarPlanilha("Doador", 1)
        return true;
    }
}