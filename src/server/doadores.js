import idSheet from './env';

const formatarData = (doador) => {

    const data = doador.dataNascimento;

    if (data === "-") {
        return data;
    } else if (doador.tipoDoador === "Pessoa física") {
        var novaData = new Date(data);
        var novaDataFormatada = (novaData.getUTCDate()) + "-" + (novaData.getMonth() + 1) + "-" + novaData.getFullYear();
        return novaDataFormatada;
    } else {
        return "-";
    }
}

const ordenarPlanilha = (nomeDaAba, colunaBase) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName(nomeDaAba);
    var range = ws.getDataRange().offset(1, 0); // começa na segunda linha
    range.sort(colunaBase);// ordena a faixa de células com base na coluna 1 (A)
}

const buscaBinariaSimples = (nomePlanilha, valorBuscado, colBusca) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName(nomePlanilha);

    var values = ws.getRange(2, colBusca, ws.getLastRow() - 1, 1).getValues();
    var lowerBound = 0;
    var upperBound = values.length - 1;

    while (lowerBound <= upperBound) {
        var middle = Math.floor((lowerBound + upperBound) / 2);
        var value = values[middle][0];

        if (value == valorBuscado) {
            var linhaReal = middle + 2
            var info = ws.getRange(linhaReal, 1, 1, ws.getLastColumn()).getValues();

            return { linha: linhaReal, data: info }

        } else if (value < valorBuscado) {
            lowerBound = middle + 1;
        } else {
            upperBound = middle - 1;
        }
    }
    return false;
}

export const getDoadores = () => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Doador");

    var lr = ws.getLastRow();

    if (lr > 1) {
        var data = ws.getRange(2, 1, lr - 1, ws.getLastColumn()).getValues();

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

    } else {
        return false
    }
}

export const appendRowDoadores = (doador) => {

    //Abrindo a planilha:
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Doador");

    // Verificando se o doador existe:
    var codigo = doador.chaveDoador;

    var buscaPorDoador = buscaBinariaSimples("Doador", codigo, 1);

    if (buscaPorDoador) {
        return false;
    } else {
        let dataNascimento = formatarData(doador);
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

export const removeRowDoador = (doador) => {
    //Abrindo a planilha:
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Doador");

    // Encontrando o doador:
    var codigo = doador.chaveDoador;
    var dados = buscaBinariaSimples("Doador", codigo, 1);

    if (dados) {
        let linha = dados.linha;
        ws.deleteRow(linha);
        return true;
    }
    return false;
}

export const updateRowDoador = (doador) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Doador");

    // Formatanto a data e pegando novo código
    var dataNascimentoFormatada = formatarData(doador);
    var chaveMudou = false;

    // Lista com os novos dados:
    var novosDados = []

    var novaChaveDoador;
    if (doador.tipoDoador === "Outro") {

        novaChaveDoador = doador.nome.replace(/\s/g, '').toLowerCase();
        if (doador.chaveDoador !== novaChaveDoador) chaveMudou = true;

    } else if (doador.tipoDoador === "Pessoa jurídica") {

        novaChaveDoador = doador.cnpj;
        if (doador.chaveDoador !== novaChaveDoador) chaveMudou = true;

    } else if (doador.tipoDoador === "Pessoa física") {

        novaChaveDoador = doador.cpf;
        if (doador.chaveDoador !== novaChaveDoador) chaveMudou = true;
    }

    if (chaveMudou) {
        // Verifica se a nova chave já existe:
        const resultadoBusca = buscaBinariaSimples("Doador", novaChaveDoador, 1);
        if (resultadoBusca) {
            return false;
        } else {
            novosDados = [novaChaveDoador, doador.nome, doador.tipoDoador, doador.cidade, doador.bairro, doador.endereco, doador.numero, doador.comoSoube, doador.cnpj, doador.cpf, dataNascimentoFormatada, doador.sexo, doador.estadoCivil];
        }
    } else {
        novosDados = [doador.chaveDoador, doador.nome, doador.tipoDoador, doador.cidade, doador.bairro, doador.endereco, doador.numero, doador.comoSoube, doador.cnpj, doador.cpf, dataNascimentoFormatada, doador.sexo, doador.estadoCivil];
    }

    var chaveDoadorOriginal = doador.chaveDoador;

    // Acha a linha que os dados originais estão:
    var buscaChaveOriginal = buscaBinariaSimples('Doador', chaveDoadorOriginal, 1);

    if (buscaChaveOriginal) {
        // Atualiza e ordena a tabela
        ws.getRange('A' + buscaChaveOriginal.linha + ':M' + buscaChaveOriginal.linha).setValues([novosDados]);
        ordenarPlanilha('Doador', 1)

        return true;
    }


}