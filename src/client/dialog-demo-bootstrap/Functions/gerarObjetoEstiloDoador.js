import formatarData from "./formatarData";
import gerarHashCode from "./gerarHashCode";


export default function gerarObjetoEstiloDoador(doador) {

    var dataNascimentoFormatada;
    var chaveDoador;
    if (doador.tipoDoador === "Pessoa física") {
        dataNascimentoFormatada = formatarData(doador.dataNascimento);
        chaveDoador = gerarHashCode(cpf);
    } else if (doador.tipoDoador === 'Pessoa jurídica') {
        dataNascimentoFormatada = "-";
        chaveDoador = gerarHashCode(cnpj);

    } else if (doador.tipoDoador === 'Outro') {
        dataNascimentoFormatada = "-";
        var nomeLimpo = doador.nome.replace(/\s/g, '').toString().toLowerCase();
        chaveDoador = gerarHashCode(nomeLimpo);
    }

    const dados = {
        chaveDoador,
        "nome": doador.nome,
        "tipoDoador": doador.tipoDoador,
        "cidade": doador.cidade,
        "bairro": doador.bairro,
        "endereco": doador.endereco,
        "numero": doador.numero,
        "comoSoube": doador.comoSoube,
        "cnpj": doador.cnpj,
        "cpf": doador.cpf,
        "dataNascimento": dataNascimentoFormatada,
        "sexo": doador.sexo,
        "estadoCivil": doador.estadoCivil
    }

    return dados
}