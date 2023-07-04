const idSheet = "1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA"; // Testes 123
// const idSheet = "18b2ssk9V1GCerIvlg-FzsLzcCDwgDoZWy9a6Q98QxSw";    // Farmacia Universitaria

export const getInformacoesSelect = () => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("InformacoesSelect");
    var data = ws.getRange(2, 1, ws.getLastRow() - 1, ws.getLastColumn()).getValues();

    var informacoes = [];

    let classes = []
    let tiposMedicamentos = []
    let tarja = []
    let apresentacao = []
    let motivoDoacao = []

    let origemMedicamento = []

    let tipoDoador = []
    let sexo = []
    let estadoCivil = []
    let tipoPaciente = []

    let opcaoEntradaMedicamento = []
    let opcaoSaidaMedicamento = []

    let comoSoube = []


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
                motivoDoacao.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 5) {
                origemMedicamento.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 6) {
                tipoDoador.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 7) {
                sexo.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 8) {
                estadoCivil.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 9) {
                tipoPaciente.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 10) {
                opcaoEntradaMedicamento.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 11) {
                opcaoSaidaMedicamento.push(data[i][j]);
            } else if (data[i][j].length > 0 && j == 12) {
                comoSoube.push(data[i][j]);
            }
        }
    }
    informacoes.push(classes, tiposMedicamentos, tarja, apresentacao, motivoDoacao, origemMedicamento, tipoDoador, sexo, estadoCivil, tipoPaciente, opcaoEntradaMedicamento, opcaoSaidaMedicamento, comoSoube);

    return JSON.stringify(informacoes);
}