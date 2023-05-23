const idSheet = "1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA";


export const  getDoadores = () => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Doador");
    var data = ws.getRange(2, 1, ws.getLastRow() - 1, ws.getLastColumn()).getValues();

    var informacoes = [];

    if (data.length == 0) {
        return false;
    }

    for (let i = 0; i < data.length; i++) {
        var cnpj = data[i][8] ? data[i][8] : 'null';
        var cpf = data[i][9] ? data[i][9] : 'null';
        var info = {
            'chaveDoador': data[i][0],
            'nome': data[i][1],
            'tipoDoador': data[i][2],
            'cidade': data[i][3],
            'bairro': data[i][4],
            'endereco': data[i][5],
            'numero': data[i][6],
            'comoSoube': data[i][7],
            cnpj,
            cpf,
            'dataNascimento': data[i][10],
            'sexo': data[i][11],
            'estadoCivil': data[i][12],
        }
        informacoes.push(info);
    }

    return JSON.stringify(informacoes);
}