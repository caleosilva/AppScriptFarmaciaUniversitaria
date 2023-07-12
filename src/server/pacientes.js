import idSheet from './env';
import formatarData from '../client/dialog-demo-bootstrap/Functions/formatarData';
import { buscaBinariaSimples } from './geral';


const ordenarPlanilha = (nomeDaAba, colunaBase) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName(nomeDaAba);
    var range = ws.getDataRange().offset(1, 0); // começa na segunda linha
    range.sort(colunaBase);// ordena a faixa de células com base na coluna 1 (A)
}

export const getPacientes = () => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Pacientes");

    var lr = ws.getLastRow();

    if (lr > 1) {
        var data = ws.getRange(2, 1, lr - 1, ws.getLastColumn()).getValues();
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
                'comoSoube': data[i][13],
                'nivelEscolaridade': data[i][14],
                'profissao': data[i][15]
            }
            informacoes.push(info);
        }

        return JSON.stringify(informacoes);
    } else {
        return false
    }
}

export const appendRowPacientes = (paciente) => {

    //Abrindo a planilha:
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Pacientes");

    // Verificando se o paciente existe:
    var codigo = paciente.chavePaciente;

    var resultadoBuscaPorPaciente = buscaBinariaSimples("Pacientes", codigo, 1);

    if (resultadoBuscaPorPaciente) {
        return false;
    } else {
        let dataNascimento = formatarData(paciente.dataNascimento);
        ws.appendRow([
            paciente.chavePaciente,
            paciente.nome,
            paciente.cpf,
            dataNascimento,
            paciente.telefone,
            paciente.tipoPaciente,
            paciente.complemento,
            paciente.sexo,
            paciente.estadoCivil,
            paciente.cidade,
            paciente.bairro,
            paciente.endereco,
            paciente.numero,
            paciente.comoSoube,
            paciente.nivelEscolaridade,
            paciente.profissao
        ]);

        ordenarPlanilha("Pacientes", 1)
        return true;
    }
}

export const removeRowPaciente = (paciente) => {
    //Abrindo a planilha:
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Pacientes");

    // Encontrando o paciente:
    var codigo = paciente.chavePaciente;
    var dados = buscaBinariaSimples("Pacientes", codigo, 1);

    if (dados) {
        let linha = dados.linha;
        ws.deleteRow(linha);
        return true;
    }
    return false;
}

export const updateRowPaciente = (paciente) => {
    var ss = SpreadsheetApp.openById(idSheet);
    var ws = ss.getSheetByName("Pacientes");

    // Formatanto a data e pegando novo código
    // var paciente.dataNascimento = formatarData(paciente.dataNascimento);
    var novaChavePaciente = paciente.cpf;

    // Lista com os novos dados:
    var novosDados = []

    // Verifica se a nova chave (se for o caso) é válida e preenche a lista com os novos dados
    if (paciente.cpf !== paciente.chavePaciente) {

        const resultadoBusca = buscaBinariaSimples("Pacientes", novaChavePaciente, 1);

        if (resultadoBusca) {
            return false;
        } else {
            novosDados = [novaChavePaciente, paciente.nome, paciente.cpf, paciente.dataNascimento, paciente.telefone, paciente.tipoPaciente, paciente.complemento, paciente.sexo, paciente.estadoCivil, paciente.cidade, paciente.bairro, paciente.endereco, paciente.numero, paciente.comoSoube, paciente.nivelEscolaridade, paciente.profissao];
        }
    // A chave continua a mesma
    } else {
        novosDados = [paciente.chavePaciente, paciente.nome, paciente.cpf, paciente.dataNascimento, paciente.telefone, paciente.tipoPaciente, paciente.complemento, paciente.sexo, paciente.estadoCivil, paciente.cidade, paciente.bairro, paciente.endereco, paciente.numero, paciente.comoSoube, paciente.nivelEscolaridade, paciente.profissao];
    }

    var chavePacienteOriginal = paciente.chavePaciente;

    // Acha a linha que os dados originais estão:
    var buscaChaveOriginal = buscaBinariaSimples('Pacientes', chavePacienteOriginal, 1);

    if (buscaChaveOriginal) {
        // Atualiza e ordena a tabela
        ws.getRange('A' + buscaChaveOriginal.linha + ':P' + buscaChaveOriginal.linha).setValues([novosDados]);
        ordenarPlanilha('Pacientes', 1);
        return true;
    }
}