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
      "motivoDescarte": data[i][11],
      "index": data[i][12]
    }
    informacoes.push(remedio)
  }
  return JSON.stringify(informacoes);
};

export const appendRowMedicamentos = (medicamento) => {
  var ss = SpreadsheetApp.openById("1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA");
  var ws = ss.getSheetByName("Medicamentos");
  
  ws.appendRow([
    medicamento.dataCadastro,
    medicamento.nome,
    medicamento.principioAtivo,
    medicamento.lote,
    medicamento.origem,
    medicamento.classe,
    medicamento.tipo,
    medicamento.validade,
    medicamento.fabricante,
    medicamento.tarja,
    medicamento.apresentacao,
    medicamento.motivoDescarte
  ]);
}


export const getInformacoesMedicamentos = () => {
  var ss = SpreadsheetApp.openById("1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA");
  var ws = ss.getSheetByName("InformacoesMedicamentos");
  var data = ws.getRange(2,1,ws.getLastRow()-1, 5).getValues();

  var informacoes = [];

  let classes = []
  let tiposMedicamentos = []
  let tarja = []
  let apresentacao = []
  let motivoDescarte = []


  for(let i = 0; i < data.length; i++){
    for(let j=0; j<data[i].length; j++){

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


export const findRowMedicamentos = (dados) => {
  // index deve ser passado por parâmetro:
  // var dados = ['3', 'peDro', '12'];
  // var codigo = dados[0]+ dados[1] + dados[2];
  // var codigoLower = codigo.toString().toLowerCase();

  // var ss = SpreadsheetApp.openById("1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA");
  // var ws = ss.getSheetByName("Medicamentos");
  // var lastRow = ws.getLastRow();

  // for(var i=2; i<= lastRow; i++){
  //   var info = ws.getRange(i, 2).getValue().toString() + ws.getRange(i, 4).getValue().toString() + ws.getRange(i, 8).getValue().toString();
  //   if(info.toString().toLowerCase() == codigoLower){
  //     return true;
  //   }
  // }
  return false;
}