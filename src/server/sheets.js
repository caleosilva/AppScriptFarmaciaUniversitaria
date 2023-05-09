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
  var data = ws.getRange(2, 1, ws.getLastRow() - 1, 7).getValues();

  var informacoes = [];

  for (i = 0; i < data.length; i++) {
    var dataCadastro = new Date(data[i][1]);
    var dataCadastroFormatada = (dataCadastro.getUTCDate()) + "-" + (dataCadastro.getMonth() + 1) + "-" + dataCadastro.getFullYear();

    const remedio = {
      "chaveGeral": data[i][0],
      "dataCadastroPura": data[i][1],
      "dataCadastro": dataCadastroFormatada,
      "nome": data[i][2],
      "principioAtivo": data[i][3],
      "tarja": data[i][4],
      "classe": data[i][5],
      "apresentacao": data[i][6]
    }
    informacoes.push(remedio)
  }

  return JSON.stringify(informacoes);
};

export const appendRowMedicamentos = (medicamento) => {
  //ABRINDO A PLANILHA
  var ss = SpreadsheetApp.openById("1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA");
  var ws = ss.getSheetByName("Medicamentos");

  // VERIFICAR SE O MEDICAMENTO EXISTE, APOS, RETORNAR TRUE OR FALSWE
  var codigo = medicamento.chaveGeral;

  if (buscarValor('Medicamentos', codigo, 1, true, true)) {
    return false;
  } else {
    ws.appendRow([
      medicamento.chaveGeral,
      medicamento.dataCadastro,
      medicamento.nome,
      medicamento.principioAtivo,
      medicamento.classe,
      medicamento.tarja,
      medicamento.apresentacao
    ]);
    ordenarPlanilha('Medicamentos', 1)
    return true;
  }
}

export const buscarValor = (nomePlanilha, valorBuscado, numDaColuna, retornarValor, retornarPosicao) => {
  //TEM QUE INFORMAR O NUMERO DA COLUNA DE FORMA DINAMICA
  var ss = SpreadsheetApp.openById("1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA");
  var ws = ss.getSheetByName(nomePlanilha);

  var values = ws.getRange(2, numDaColuna, ws.getLastRow() - 1, 1).getValues();
  var lowerBound = 0;
  var upperBound = values.length - 1;

  while (lowerBound <= upperBound) {
    var middle = Math.floor((lowerBound + upperBound) / 2); // encontra o índice do elemento central
    var value = values[middle][0]; // obtém o valor do elemento central

    if (value == valorBuscado) {
      var info = ws.getRange(middle + 2, 1, 1, ws.getLastColumn()).getValues();
      if (retornarValor) return info; // retorna as informações caso o encontre
      if (retornarPosicao) return middle + 2;
    } else if (value < valorBuscado) {
      lowerBound = middle + 1; // atualiza o limite inferior para pesquisar na metade superior do intervalo
    } else {
      upperBound = middle - 1; // atualiza o limite superior para pesquisar na metade inferior do intervalo
    }
  }
  return false; // retorna false se o valor não foi encontrado
}

export const ordenarPlanilha = (nomePlanilha, numDaColuna) => {
  var ss = SpreadsheetApp.openById("1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA");
  var ws = ss.getSheetByName(nomePlanilha);
  var range = ws.getDataRange().offset(1, 0); // começa na segunda linha
  range.sort(numDaColuna);// ordena a faixa de células com base na coluna 1 (A)
}

export const getInformacoesMedicamentos = () => {
  var ss = SpreadsheetApp.openById("1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA");
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

export const updateRowMedicamentos = (medicamento) => {
  // ESTÁ ATUALIZANDO SOMENTE NA TABELA DE MEDICAMENTOS, PORÉM AO MUDAR O NOME OU O PRINCIPIO CASO A CHAVE MUDE É NECESSÁRIO MUDAR EM SUAS REFERÊNCIAS TBM
  var ss = SpreadsheetApp.openById("1t3eQuU5-PqPzX7Yb2r-iHEjXvi1oKC3Jf0ors4MhZUA");
  var ws = ss.getSheetByName("Medicamentos");

  // Formatanto a data e pegando novo código
  var dataCadastro = new Date(medicamento.dataCadastro);
  var dataCadastroFormatada = (dataCadastro.getUTCDate()) + "-" + (dataCadastro.getMonth() + 1) + "-" + dataCadastro.getFullYear();
  var chaveGeral = (medicamento.nome + '#' + medicamento.principioAtivo).toString().toLowerCase().replace(/\s+/g, '');

  var novosDados = [chaveGeral, dataCadastroFormatada, medicamento.nome, medicamento.principioAtivo, medicamento.tarja, medicamento.classe, medicamento.apresentacao];
  var valorBuscado = medicamento.chaveGeral;

  // Busca binária e atualização:
  var posicao = buscarValor('Medicamentos', valorBuscado, 1, false, true)
  // Se achar o medicamento:
  if (posicao) {
    // Atualiza na tabela principal
    ws.getRange('A' + posicao + ':G' + posicao).setValues([novosDados]);

    // Verifica se a chave geral mudou para atualizar e reordenar as tabelas:
    if (valorBuscado !== chaveGeral){
      // Atualização:

      //Ordenação:
      ordenarPlanilha('Medicamentos', 1)
    }
    return posicao;
  } else{
    return false;
  }
}