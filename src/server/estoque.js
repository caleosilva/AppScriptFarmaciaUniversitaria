import MedicamentoEspecifico from '../models/MedicamentoEspecifico';
import formatarData from '../client/dialog-demo-bootstrap/Functions/formatarData';
import idSheet from './env';
import { buscaBinariaSimples } from './geral';


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

// const buscaBinariaSimples = (nomePlanilha, valorBuscado, colBusca) => {
//     var ss = SpreadsheetApp.openById(idSheet);
//     var ws = ss.getSheetByName(nomePlanilha);

//     var values = ws.getRange(2, colBusca, ws.getLastRow() - 1, 1).getValues();
//     var lowerBound = 0;
//     var upperBound = values.length - 1;

//     while (lowerBound <= upperBound) {
//         var middle = Math.floor((lowerBound + upperBound) / 2);
//         var value = values[middle][0];

//         if (value == valorBuscado) {
//             var linhaReal = middle + 2
//             var info = ws.getRange(linhaReal, 1, 1, ws.getLastColumn()).getValues();

//             var objeto = {}

//             return { linha: linhaReal, data: info }

//         } else if (value < valorBuscado) {
//             lowerBound = middle + 1;
//         } else {
//             upperBound = middle - 1;
//         }
//     }
//     return false;
// }

const queryValidades = (chaveDeBusca) => {
    const sql = "select E where A = '" + chaveDeBusca + "'";
    var dados = realizarQuery('MedicamentoEspecifico', 'A', 'L', sql);

    if (dados[0][0] == "#N/A") {
        return false;
    } else {

        var listaValidade = [];

        for (let i = 0; i < dados.length; i++) {
            listaValidade.push(dados[i][0]);
        }
        return listaValidade;
    }
}

const encontrarMaisProxima = (listaComValidades) => {
    const currentDate = new Date();
    const dates = listaComValidades.map(dateStr => new Date(dateStr));

    let closestDate = dates[0];
    let closestDiff = Math.abs(dates[0] - currentDate);

    for (let i = 1; i < dates.length; i++) {
        const diff = Math.abs(dates[i] - currentDate);
        if (diff < closestDiff) {
            closestDiff = diff;
            closestDate = dates[i];
        }
    }

    return formatarData(closestDate);
}

const definirDataMaisRecente = (MedicamentoEspecifico) => {

    const chaveMedicamentoGeral = MedicamentoEspecifico.chaveMedicamentoGeral;

    // Pegando a data mais próxima
    const listaValidades = queryValidades(chaveMedicamentoGeral);

    var dataMaisProxima;

    if (listaValidades) {
        dataMaisProxima = encontrarMaisProxima(listaValidades);
    } else {
        dataMaisProxima = '-';
    }

    var ss = SpreadsheetApp.openById(idSheet);
    var wsMed = ss.getSheetByName("Medicamentos");

    var dadosMed = buscaBinariaSimples("Medicamentos", chaveMedicamentoGeral, 1);

    wsMed.getRange("I" + parseInt(dadosMed.linha)).setValue(dataMaisProxima);
    return JSON.stringify(dadosMed);
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
        const dataEntradaFormatada = formatarData(medicamento.dataEntrada)

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
            dataEntradaFormatada,
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

        // Atualiza a validade:
        definirDataMaisRecente(medicamento);

        return true;
    }
}

export const updateRowEstoque = (medicamento) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("MedicamentoEspecifico");

    // Formatanto a data e pegando novo código
    const validadeFormatada = formatarData(medicamento.validade);
    const dataEntradaFormatada = formatarData(medicamento.dataEntrada);

    var novaChaveMedicamentoEspecifico = (medicamento.lote + '#' + medicamento.dosagem + '#' + validadeFormatada).toLowerCase().replace(/\s/g, '');
    var novaChaveGeral = medicamento.chaveMedicamentoGeral + '#' + novaChaveMedicamentoEspecifico;

    // Lista com os novos dados:
    var novosDados = []

    // Verifica se a chave mudou e se é válida
    if (medicamento.chaveMedicamentoEspecifico !== novaChaveMedicamentoEspecifico) {

        const resultadoBusca = queryMedicamentoEspecifico(novaChaveMedicamentoEspecifico);

        if (resultadoBusca) {
            return false;
        } else {

            novosDados = [medicamento.chaveMedicamentoGeral, novaChaveMedicamentoEspecifico, medicamento.lote, medicamento.dosagem, validadeFormatada, medicamento.quantidade, medicamento.origem, medicamento.tipo, medicamento.fabricante, medicamento.motivoDoacao, dataEntradaFormatada, novaChaveGeral];
        }

        // Se a chave continuar a mesma
    } else {
        novosDados = [medicamento.chaveMedicamentoGeral, medicamento.chaveMedicamentoEspecifico, medicamento.lote, medicamento.dosagem, validadeFormatada, medicamento.quantidade, medicamento.origem, medicamento.tipo, medicamento.fabricante, medicamento.motivoDoacao, dataEntradaFormatada, novaChaveGeral];
    }

    var chaveGeralOriginal = medicamento.chaveGeral;


    // Acha a linha que os dados originais estão:
    var buscaChaveOriginal = buscaBinariaSimples('MedicamentoEspecifico', chaveGeralOriginal, 12);

    if (buscaChaveOriginal) {
        ws.getRange('A' + buscaChaveOriginal.linha + ':L' + buscaChaveOriginal.linha).setValues([novosDados]);
        ordenarPlanilha('MedicamentoEspecifico', 12);

        // Atualiza a validade:
        definirDataMaisRecente(medicamento);
        return true
    }

    return null;
}

export const removeRowEstoque = (medicamento) => {
    //Abrindo a planilha:
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("MedicamentoEspecifico");

    // Encontrando o medicamento:
    var codigo = medicamento.chaveGeral;
    var dados = buscaBinariaSimples("MedicamentoEspecifico", codigo, 12);

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

        // Atualiza a data de vencimento mais próxima:
        definirDataMaisRecente(medicamento);
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

export const getMedEspecificoChaveMedGeral = (valorBuscado) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("MedicamentoEspecifico");

    const dados = ws.getDataRange().getValues();

    var resultado = []

    const objeto = {};
    let contador = 1;

    let esquerda = 0;
    let direita = dados.length - 1;

    while (esquerda <= direita) {
        let meio = Math.floor((esquerda + direita) / 2);

        if (dados[meio][0] === valorBuscado) {
            let linhaReal = meio + 1
            let informacao = ws.getRange(linhaReal, 1, 1, ws.getLastColumn()).getValues();

            let remedio = {
                chaveMedicamentoGeral: informacao[0][0],
                chaveMedicamentoEspecifico: informacao[0][1],
                lote: informacao[0][2],
                dosagem: informacao[0][3],
                validade: informacao[0][4],
                quantidade: informacao[0][5],
                origem: informacao[0][6],
                tipo: informacao[0][7],
                fabricante: informacao[0][8],
                motivoDoacao: informacao[0][9],
                dataEntrada: informacao[0][10],
                chaveGeral: informacao[0][11]
            }
            resultado.push(remedio);

            // Verifique os elementos à esquerda do meio
            let esquerdaIndex = meio - 1;
            while (esquerdaIndex >= 0 && dados[esquerdaIndex][0] === valorBuscado) {
                let linhaReal = esquerdaIndex + 1
                let informacao = ws.getRange(linhaReal, 1, 1, ws.getLastColumn()).getValues();

                let remedio = {
                    chaveMedicamentoGeral: informacao[0][0],
                    chaveMedicamentoEspecifico: informacao[0][1],
                    lote: informacao[0][2],
                    dosagem: informacao[0][3],
                    validade: informacao[0][4],
                    quantidade: informacao[0][5],
                    origem: informacao[0][6],
                    tipo: informacao[0][7],
                    fabricante: informacao[0][8],
                    motivoDoacao: informacao[0][9],
                    dataEntrada: informacao[0][10],
                    chaveGeral: informacao[0][11]
                }

                resultado.push(remedio);
                esquerdaIndex--;
            }

            // Verifique os elementos à direita do meio
            let direitaIndex = meio + 1;
            while (direitaIndex < dados.length && dados[direitaIndex][0] === valorBuscado) {
                let linhaReal = direitaIndex + 1
                let informacao = ws.getRange(linhaReal, 1, 1, ws.getLastColumn()).getValues();

                let remedio = {
                    chaveMedicamentoGeral: informacao[0][0],
                    chaveMedicamentoEspecifico: informacao[0][1],
                    lote: informacao[0][2],
                    dosagem: informacao[0][3],
                    validade: informacao[0][4],
                    quantidade: informacao[0][5],
                    origem: informacao[0][6],
                    tipo: informacao[0][7],
                    fabricante: informacao[0][8],
                    motivoDoacao: informacao[0][9],
                    dataEntrada: informacao[0][10],
                    chaveGeral: informacao[0][11]
                }

                resultado.push(remedio);
                direitaIndex++;
            }

            return JSON.stringify(resultado);
        } else if (dados[meio][0] < valorBuscado) {
            esquerda = meio + 1;
        } else {
            direita = meio - 1;
        }
    }
    return JSON.stringify(resultado);
}

