const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

export const getSheetsData = () => {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      isActive: name === activeSheetName,
    };
  });
};

export const addSheet = (sheetTitle) => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = (sheetIndex) => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = (sheetName) => {
  SpreadsheetApp.getActive().getSheetByName(sheetName).activate();
  return getSheetsData();
};

export const doGet = (e) => {
  return HtmlService.createHtmlOutputFromFile('dialog-demo-bootstrap');
}


export const getMedicamentos = () => {
  var ss = SpreadsheetApp.openById("1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA");
  var ws = ss.getSheetByName("Medicamentos");
  var data = ws.getRange(2,1,ws.getLastRow()-1, 13).getValues();
  
  var informacoes = [];

  for(i=0; i<data.length; i++){
    var dataCadastro = new Date(data[i][0]);
    var dataCadastroFormatada = (dataCadastro.getDate() + 1) + "-" + (dataCadastro.getMonth() + 1) + "-" + dataCadastro.getFullYear();

    var dataValidade = new Date(data[i][7]);
    var dataValidadeFormatada = (dataValidade.getDate() + 1) + "-" + (dataValidade.getMonth() + 1) + "-" + dataValidade.getFullYear();

    const remedio = {
      "dataCadastroPura": data[i][0],
      "dataCadastro": dataCadastroFormatada, 
      "nome": data[i][1],
      "principioAtivo": data[i][2],
      "lote": data[i][3],
      "origem": data[i][4],
      "classe": data[i][5],
      "tipo": data[i][6],
      "validadePura": data[i][7],
      "validade": dataValidadeFormatada,
      "fabricante": data[i][8],
      "tarja": data[i][9],
      "apresentacao": data[i][10],
      "motivoDescarte": data[i][11]
    }
    informacoes.push(remedio)
  }

  return JSON.stringify(informacoes);
};

export const appendRowMedicamentos = (formObject) => {
  var ss = SpreadsheetApp.openById("1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA");
  var ws = ss.getSheetByName("Medicamentos");

  ws.appendRow([
    formObject.dataCadastro,
    formObject.nome,
    formObject.principioAtivo,
    formObject.lote,
    formObject.origem,
    formObject.classe,
    formObject.tipo,
    formObject.validade,
    formObject.fabricante,
    formObject.tarja,
    formObject.apresentacao,
    formObject.motivoDescarte
  ]);
}


function getInformacoesMedicamentos(){
  var ss = SpreadsheetApp.openById("1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA");
  var ws = ss.getSheetByName("InformacoesMedicamentos");
  var data = ws.getRange(2,1,ws.getLastRow()-1, 5).getValues();

  var informacoes = [];
  let classes = []
  let tiposMedicamentos = []
  let tarja = []
  let apresentacao = []
  let motivoDescarte = []

  for(i = 0; i < data.length; i++){
    for(j=0; j<data[i].length; j++){

      if(data[i][j].length>0 && j==0){
        classes.push(data[i][j]);
      } else if (data[i][j].length>0 && j==1){
        tiposMedicamentos.push(data[i][j]);
      } else if (data[i][j].length>0 && j==2){
        tarja.push(data[i][j]);
      } else if (data[i][j].length>0 && j==3){
        apresentacao.push(data[i][j]);
      } else if (data[i][j].length>0 && j==4){
        motivoDescarte.push(data[i][j]);
      }
    }
  }
  informacoes.push(classes, tiposMedicamentos, tarja, apresentacao, motivoDescarte)
  return JSON.stringify(informacoes);
}