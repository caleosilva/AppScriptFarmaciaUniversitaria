import formatarData from "./formatarData";


export default function gerarObjetoEstiloDoador(doador) {

    // Ainda precisa dessa verificação?
    var dataNascimentoFormatada;
    if (doador.tipoDoador === "Pessoa física") {
        dataNascimentoFormatada = formatarData(doador.dataNascimento);
    } else{
        dataNascimentoFormatada = "-";
    }

    const dados = {
        "chaveDoador": doador.chaveDoador,
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
        "sexo":doador.sexo,
        "estadoCivil": doador.estadoCivil
    }

    return dados
}