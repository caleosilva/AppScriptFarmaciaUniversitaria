const idSheet = "1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA"; // Testes 123

export const getPacientes = () => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Pacientes");
    var data = ws.getRange(2, 1, ws.getLastRow() - 1, ws.getLastColumn()).getValues();

    var informacoes = [];

    if (data.length == 0) {
        return false;
    }

    for (let i = 0; i < data.length; i++) {
        var info = {
            'chavePaciente': data[i][0],
            'nome': data[i][1],
            'cpf': data[i][2],
            'dataNascimento': data[i][3],
            'telefone': data[i][4],
            'tipoPaciente': data[i][5],
            'complemento': data[i][6],
            'sexo': data[i][7],
            'estadoCivil': data[i][8],
            'cidade': data[i][9],
            'bairro': data[i][10],
            'endereco': data[i][11],
            'numero': data[i][12],
            'comoSoube': data[i][13]
        }
        informacoes.push(info);
    }

    return JSON.stringify(informacoes);
}