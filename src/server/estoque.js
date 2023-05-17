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

export const queryChaveMedicamentoGeral = (chaveDeBusca) => {
    var sql = "select * where A = '" + chaveDeBusca + "'";
    var dados = realizarQuery('MedicamentoEspecifico', 'A', 'J', sql)

    if (dados[0][0] === '#N/A') {
        return false;
    } else {
        var informacoes = [];

        for (let i = 0; i < dados.length; i++) {
            // var infoValidade = new Date(data[i][4]);
            // var validadeFormatada = (infoValidade.getUTCDate()) + "-" + (infoValidade.getMonth() + 1) + "-" + infoValidade.getFullYear();

            var data = {
                chaveMedicamentoGeral: dados[i][0],
                chaveEspecifica: dados[i][1],
                lote: dados[i][2],
                dosagem: dados[i][3],
                validade: dados[i][4],
                quantidade: dados[i][5],
                origem: dados[i][6],
                tipo: dados[i][7],
                fabricante: dados[i][8],
                motivoDescarte: dados[i][9]
            }
            
            informacoes.push(data)
        }

        return JSON.stringify(informacoes);
    }
}