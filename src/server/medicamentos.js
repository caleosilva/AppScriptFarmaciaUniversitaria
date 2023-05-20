import MedicamentoGeral from '../models/MedicamentoGeral';
import ErroMedicamentoGeralExistente from '../erros/ErroMedicamentoGeralExistente';

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

const ordenarPlanilha = (nomeDaAba, colunaBase) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName(nomeDaAba);
    var range = ws.getDataRange().offset(1, 0); // começa na segunda linha
    range.sort(colunaBase);// ordena a faixa de células com base na coluna 1 (A)
}

const buscaBinaria = (nomePlanilha, valorBuscado, colBusca, returnLinha) => {
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

            if (returnLinha) {
                return middle + 2;
            } else {
                return info;
            }
        } else if (value < valorBuscado) {
            lowerBound = middle + 1;
        } else {
            upperBound = middle - 1;
        }
    }
    return false;
}

const buscaBinariaCompleta = (sheetId, nomePlanilha, valorBuscado, colBusca) => {
    var ss = SpreadsheetApp.openById(sheetId);
    var ws = ss.getSheetByName(nomePlanilha);

    const dados = ws.getDataRange().getValues();
    let resultado = [];

    let esquerda = 0;
    let direita = dados.length - 1;

    while (esquerda <= direita) {
        let meio = Math.floor((esquerda + direita) / 2);

        if (dados[meio][colBusca] === valorBuscado) {
            let linhaReal = meio + 1
            let informacao = ws.getRange(linhaReal, 1, 1, ws.getLastColumn()).getValues();
            resultado.push({ linha: linhaReal, data: informacao[0] });

            // Verifique os elementos à esquerda do meio
            let esquerdaIndex = meio - 1;
            while (esquerdaIndex >= 0 && dados[esquerdaIndex][colBusca] === valorBuscado) {
                let linhaReal = esquerdaIndex + 1
                let informacao = ws.getRange(linhaReal, 1, 1, ws.getLastColumn()).getValues();
                resultado.push({ linha: linhaReal, data: informacao[0] });
                esquerdaIndex--;
            }

            // Verifique os elementos à direita do meio
            let direitaIndex = meio + 1;
            while (direitaIndex < dados.length && dados[direitaIndex][colBusca] === valorBuscado) {
                let linhaReal = direitaIndex + 1
                let informacao = ws.getRange(linhaReal, 1, 1, ws.getLastColumn()).getValues();
                resultado.push({ linha: linhaReal, data: informacao[0] });
                direitaIndex++;
            }

            return resultado;
        } else if (dados[meio][colBusca] < valorBuscado) {
            esquerda = meio + 1;
        } else {
            direita = meio - 1;
        }
    }
    return resultado;
}

export const encontrarMedicamentoTabelaMedicamentos = (chaveDeBusca) => {
    var sql = "select * where A = '" + chaveDeBusca + "'";
    var dados = realizarQuery('Medicamentos', 'A', 'G', sql)

    if (dados[0][0] === '#N/A') {
        return false;
    } else {
        // var remedio = new MedicamentoGeral(data[0][0], data[0][1], data[0][2], data[0][3], data[0][4], data[0][5], data[0][6]);
        var informacoes = [];

        for (let i = 0; i < dados.length; i++) {
            // var remedio = new MedicamentoGeral(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5], data[i][6]);
            var remedio = {
                chaveGeral: dados[i][0],
                dataCadastro: dados[i][1],
                nome: dados[i][2],
                principioAtivo: dados[i][3],
                tarja: dados[i][4],
                classe: dados[i][5],
                apresentacao: dados[i][6]
            }
            informacoes.push(remedio)
        }
        return informacoes;
    }
}

export const getMedicamentos = () => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Medicamentos");
    var data = ws.getRange(2, 1, ws.getLastRow() - 1, 7).getValues();

    var informacoes = [];

    for (i = 0; i < data.length; i++) {
        var dataCadastro = new Date(data[i][1]);
        var dataCadastroFormatada = (dataCadastro.getUTCDate()) + "-" + (dataCadastro.getMonth() + 1) + "-" + dataCadastro.getFullYear();

        // const remedio = new MedicamentoGeral(data[i][0], data[i][1], dataCadastroFormatada, data[i][2], data[i][3], data[i][4], data[i][5], data[i][6]);

        // this.chaveGeral = chaveGeral;
        // this.dataCadastro = dataCadastro;
        // this.dataCadastroFormatada = dataCadastroFormatada;
        // this.nome = nome;
        // this.principioAtivo = principioAtivo;
        // this.tarja = tarja;
        // this.classe = classe;
        // this.apresentacao = apresentacao;

        const remedio = {
            "chaveGeral": data[i][0],
            "dataCadastro": data[i][1],
            "dataCadastroFormatada": dataCadastroFormatada,
            "nome": data[i][2],
            "principioAtivo": data[i][3],
            "classe": data[i][4],
            "tarja": data[i][5],
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

export const appendRowMedicamentos = (medicamento) => {
    //Abrindo a planilha:
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Medicamentos");

    // Verificando se o medicamento existe:
    var codigo = medicamento.chaveGeral;

    if (encontrarMedicamentoTabelaMedicamentos(codigo)) {
        // throw new ErroMedicamentoGeralExistente("O medicamento já está cadastrado!");
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
        ordenarPlanilha("Medicamentos", 1)
        return true;
    }
}

export const updateRowMedicamentos = (medicamento) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Medicamentos");

    // Formatanto a data e pegando novo código
    var dataCadastro = new Date(medicamento.dataCadastro);
    var dataCadastroFormatada = (dataCadastro.getUTCDate()) + "-" + (dataCadastro.getMonth() + 1) + "-" + dataCadastro.getFullYear();

    var novaChaveGeral = (medicamento.nome + '#' + medicamento.principioAtivo + '#' + medicamento.apresentacao).toString().toLowerCase().replace(/\s+/g, '');

    // Verifica se a nova chave (se for o caso) já existe:
    if (encontrarMedicamentoTabelaMedicamentos(novaChaveGeral)) {
        // Chave encontrada, não é possível atualizar os dados com esse nome e princípio ativo:
        return false;
    } else {
        // Chave não for encontrada, é possível atualizar os dados:
        var novosDados = [novaChaveGeral, dataCadastroFormatada, medicamento.nome, medicamento.principioAtivo, medicamento.classe, medicamento.tarja, medicamento.apresentacao];

        var chaveGeralOriginal = medicamento.chaveGeral;

        // Acha a linha que os dados originais estão:
        var posicao = buscaBinaria('Medicamentos', chaveGeralOriginal, 1, true)
        if (posicao) {
            // Atualiza e ordena a tabela Medicamentos
            ws.getRange('A' + posicao + ':G' + posicao).setValues([novosDados]);
            ordenarPlanilha('Medicamentos', 1)

            // Verifica se a chave geral mudou para atualizar e reordenar as tabelas:
            if (chaveGeralOriginal !== novaChaveGeral) {
                // Atualização:
                var wsn = ss.getSheetByName("MedicamentoEspecifico");


                var dados = buscaBinariaCompleta(idSheet, "MedicamentoEspecifico", chaveGeralOriginal, 0);
                for (let i = 0; i < dados.length; i++) {
                    wsn.getRange("A" + parseInt(dados[i].linha)).setValue(novaChaveGeral);
                }
                //Ordenação:
                ordenarPlanilha('MedicamentoEspecifico', 1)
            }
            return posicao;
        }

    }

    var novosDados = [novaChaveGeral, dataCadastroFormatada, medicamento.nome, medicamento.principioAtivo, medicamento.classe, medicamento.tarja, medicamento.apresentacao];

    var chaveGeralOriginal = medicamento.chaveGeral;

    // Busca binária e atualização:
    var posicao = buscaBinaria('Medicamentos', chaveGeralOriginal, 1, true)
    // Se achar o medicamento:
    if (posicao) {
        // Atualiza na tabela principal
        ws.getRange('A' + posicao + ':G' + posicao).setValues([novosDados]);

        // Verifica se a chave geral mudou para atualizar e reordenar as tabelas:
        if (chaveGeralOriginal !== novaChaveGeral) {
            // Atualização:

            //Ordenação:
            ordenarPlanilha('Medicamentos', 1)
        }
        return posicao;
    } else {
        return false;
    }
}