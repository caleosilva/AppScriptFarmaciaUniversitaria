import MedicamentoEspecifico from '../models/MedicamentoEspecifico';
import formatarData from '../client/dialog-demo-bootstrap/Functions/formatarData';


const idSheet = "1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA"; // Testes 123
// const idSheet = "18b2ssk9V1GCerIvlg-FzsLzcCDwgDoZWy9a6Q98QxSw";    // Farmacia Universitaria

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

const ordenarPlanilha = (nomeDaAba, colunaBase) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName(nomeDaAba);
    var range = ws.getDataRange().offset(1, 0); // começa na segunda linha
    range.sort(colunaBase);// ordena a faixa de células com base na coluna, Ex: 1 (A)
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

export const queryMedicamentoEspecifico = (chaveDeBusca) => {
    var sql = "select * where B = '" + chaveDeBusca + "'";
    var dados = realizarQuery('MedicamentoEspecifico', 'A', 'L', sql)

    if (dados[0][0] === '#N/A') {
        return false;
    } else {
        var informacoes = [];

        for (let i = 0; i < dados.length; i++) {
            var remedio = {
                chaveMedicamentoGeral: dados[i][0],
                chaveMedicamentoEspecifico: dados[i][1],
                lote: dados[i][2],
                dosagem: dados[i][3],
                validade: dados[i][4],
                quantidade: dados[i][5],
                origem: dados[i][6],
                tipo: dados[i][7],
                fabricante: dados[i][8],
                motivoDoacao: dados[i][9],
                dataEntrada: dados[i][10]
            }
            informacoes.push(remedio)
        }
        return informacoes;
    }
}

export const queryAmountIndividualMedicamento = (chaveDeBusca) => {

    const sql = "select A, F where A = '" + chaveDeBusca + "'";
    var dados = realizarQuery('MedicamentoEspecifico', 'A', 'L', sql)

    if (dados[0][0] === '#N/A') {
        return false;
    } else {
        var informacoes = [];

        for (let i = 0; i < dados.length; i++) {
            var remedio = {
                chaveMedicamentoGeral: dados[i][0],
                chaveMedicamentoEspecifico: dados[i][1],
                lote: dados[i][2],
                dosagem: dados[i][3],
                validade: dados[i][4],
                quantidade: dados[i][5],
                origem: dados[i][6],
                tipo: dados[i][7],
                fabricante: dados[i][8],
                motivoDoacao: dados[i][9],
                dataEntrada: dados[i][10]
            }
            informacoes.push(remedio)
        }
        return informacoes;
    }
}

export const buscaBinariaCompleta = (sheetId, nomePlanilha, valorBuscado, colBusca) => {
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

export const queryChaveMedicamentoGeral = (chaveDeBusca) => {
    var sql = "select * where A = '" + chaveDeBusca + "'";
    var dados = realizarQuery('MedicamentoEspecifico', 'A', 'L', sql)

    if (dados[0][0] === '#N/A') {
        return false;
    } else {
        var informacoes = [];

        for (let i = 0; i < dados.length; i++) {
            // let infoValidade = new Date(dados[i][4]);
            // let validadeFormatada = (infoValidade.getUTCDate()) + "-" + (infoValidade.getMonth() + 1) + "-" + infoValidade.getFullYear();

            const dadosMedicamentoEspecifico = new MedicamentoEspecifico(dados[i][0], dados[i][1], dados[i][2], dados[i][3], dados[i][4], dados[i][5], dados[i][6], dados[i][7], dados[i][8], dados[i][9], dados[i][10], dados[i][11])

            // var data = {
            //     chaveMedicamentoGeral: dados[i][0],
            //     chaveMedicamentoEspecifico: dados[i][1],
            //     lote: dados[i][2],
            //     dosagem: dados[i][3],
            //     validade: dados[i][4],
            //     validadeFormatada,
            //     quantidade: dados[i][5],
            //     origem: dados[i][6],
            //     tipo: dados[i][7],
            //     fabricante: dados[i][8],
            //     motivoDoacao: dados[i][9],
            //     dataEntrada: dados[i][10],
            //     chaveGeral: dados[i][11]
            // }

            informacoes.push(dadosMedicamentoEspecifico);
        }

        return JSON.stringify(informacoes);
    }
}

export const appendRowMedicamentoEspecifico = (medicamento) => {
    //Abrindo a planilha:
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("MedicamentoEspecifico");

    // Verificando se o medicamento existe:
    var codigo = medicamento.chaveMedicamentoEspecifico;


    if (queryMedicamentoEspecifico(codigo, "B")) {
        return false;
    } else {
        const chaveGeral = medicamento.chaveMedicamentoGeral + medicamento.chaveMedicamentoEspecifico;
        const validadeFormatada = formatarData(medicamento.validade);
        const dataHojeFormatada = formatarData(medicamento.dataEntrada)

        ws.appendRow([
            medicamento.chaveMedicamentoGeral,
            medicamento.chaveMedicamentoEspecifico,
            medicamento.lote,
            medicamento.dosagem,
            validadeFormatada,
            medicamento.quantidade,
            medicamento.origem,
            medicamento.tipo,
            medicamento.fabricante,
            medicamento.motivoDoacao,
            dataHojeFormatada,
            chaveGeral
        ]);
        ordenarPlanilha("MedicamentoEspecifico", 12)

        // Atualiza a quantidade:
        var codigoMed = medicamento.chaveMedicamentoGeral;
        var wsMed = ss.getSheetByName("Medicamentos");
        var dadosMed = buscaBinariaSimples("Medicamentos", codigoMed, 1);

        var quantidadeMed = wsMed.getRange("H" + parseInt(dadosMed.linha)).getValue();
        var novaQuantidadeMed = parseInt(quantidadeMed) + parseInt(medicamento.quantidade);
        wsMed.getRange("H" + parseInt(dadosMed.linha)).setValue(novaQuantidadeMed);

        return true;
    }
}

export const updateRowEstoque = (medicamento) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("MedicamentoEspecifico");

    // Formatanto a data e pegando novo código
    const validadeFormatada = formatarData(medicamento.validade);
    const dataEntradaFormatada = formatarData(medicamento.dataEntrada);

    var novaChaveMedicamentoEspecifico = (medicamento.lote + '#' + medicamento.dosagem + '#' + medicamento.validadeFormatada);
    var novaChaveGeral = medicamento.chaveMedicamentoGeral + '#' + novaChaveMedicamentoEspecifico;

    // return JSON.stringify(novaChaveGeral);

    // Verifica se a nova chave (se for o caso) já existe:
    if (encontrarMedicamentoTabelaMedicamentos(novaChaveGeral)) {
        // Chave encontrada, não é possível atualizar os dados com esse nome e princípio ativo:
        return false;
    } else {
        // Chave não for encontrada, é possível atualizar os dados:
        var novosDados = [medicamento.chaveMedicamentoGeral, novaChaveMedicamentoEspecifico, medicamento.lote, medicamento.dosagem, validadeFormatada, medicamento.quantidade, medicamento.origem, medicamento.tipo, medicamento.fabricante, medicamento.motivoDoacao, dataEntradaFormatada, novaChaveGeral];

        var chaveGeralOriginal = medicamento.chaveMedicamentoGeral;

        // Acha a linha que os dados originais estão:
        var dadosEditar = buscaBinariaSimples('MedicamentoEspecifico', chaveGeralOriginal, 12);

        // return JSON.stringify(dadosEditar);

        if (dadosEditar.linha) {
            // Atualiza e ordena a tabela Medicamentos
            ws.getRange('A' + dadosEditar.linha + ':L' + dadosEditar.linha).setValues([novosDados]);
            ordenarPlanilha('MedicamentoEspecifico', 12);

            // AINDA É NECESSÁRIO EDITAR NAS OUTRAS TABELAS CASO NECESSÁRIO
            return JSON.stringify(dadosEditar);
        }

    }

    return null;
}

export const removeRowEstoque = (medicamento) => {
    //Abrindo a planilha:
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("MedicamentoEspecifico");

    // Encontrando o medicamento:
    var codigo = medicamento.chaveGeral;
    var dados = buscaBinariaSimples("MedicamentoEspecifico", codigo, 12)

    if (dados) {
        let linha = dados.linha;
        ws.deleteRow(linha);

        // Atualiza a quantidade total se for maior que 0:
        if (parseInt(medicamento.quantidade) > 0) {
            var codigoMed = medicamento.chaveMedicamentoGeral;
            var wsMed = ss.getSheetByName("Medicamentos");
            var dadosMed = buscaBinariaSimples("Medicamentos", codigoMed, 1);

            var quantidadeMed = wsMed.getRange("H" + parseInt(dadosMed.linha)).getValue();
            var novaQuantidadeMed = parseInt(quantidadeMed) - parseInt(medicamento.quantidade);
            wsMed.getRange("H" + parseInt(dadosMed.linha)).setValue(novaQuantidadeMed);
        }
        return true;
    }
    return false;
}

export const atualizarQuantidadeEstoque = (medicamento, quantidadeInput, adicionar) => {
    //Abrindo a planilha:
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("MedicamentoEspecifico");

    // Encontrando o medicamento:
    var codigo = medicamento.chaveGeral;
    var dados = buscaBinariaSimples("MedicamentoEspecifico", codigo, 12)

    if (dados) {
        var codigoMed = medicamento.chaveMedicamentoGeral;
        var wsMed = ss.getSheetByName("Medicamentos");
        var dadosMed = buscaBinariaSimples("Medicamentos", codigoMed, 1);

        if (adicionar) {
            var novaQuantidade = parseInt(medicamento.quantidade) + parseInt(quantidadeInput);
            ws.getRange("F" + parseInt(dados.linha)).setValue(novaQuantidade);

            var quantidadeMed = wsMed.getRange("H" + parseInt(dadosMed.linha)).getValue();
            var novaQuantidadeMed = parseInt(quantidadeMed) + parseInt(quantidadeInput);
            wsMed.getRange("H" + parseInt(dadosMed.linha)).setValue(novaQuantidadeMed);
        } else {
            var novaQuantidade = parseInt(medicamento.quantidade) - parseInt(quantidadeInput);
            ws.getRange("F" + parseInt(dados.linha)).setValue(novaQuantidade);

            var quantidadeMed = wsMed.getRange("H" + parseInt(dadosMed.linha)).getValue();
            var novaQuantidadeMed = parseInt(quantidadeMed) - parseInt(quantidadeInput);
            wsMed.getRange("H" + parseInt(dadosMed.linha)).setValue(novaQuantidadeMed);
        }
        // Adicionar as informações na aba estoque:
        return true;
    }

    return false;
}

export const definirDataMaisRecente = (medicamento) => {
    return false;
}