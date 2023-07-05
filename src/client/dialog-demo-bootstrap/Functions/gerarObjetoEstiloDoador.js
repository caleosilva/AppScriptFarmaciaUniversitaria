export default function gerarObjetoEstiloDoador(doador) {

    var novaChaveDoador;
    var dataNascimentoFormatada;

    if (doador.tipoDoador === "Outro") {
        novaChaveDoador = doador.nome.replace(/\s/g, '').toLowerCase();
        dataNascimentoFormatada = "-";
    } else if (doador.tipoDoador === "Pessoa jurídica") {
        novaChaveDoador = doador.cnpj;
        dataNascimentoFormatada = "-";

    } else if (doador.tipoDoador === "Pessoa física") {
        novaChaveDoador = doador.cpf;
        var novaData = new Date(doador.dataNascimento);
        dataNascimentoFormatada = (novaData.getUTCDate()) + "-" + (novaData.getMonth() + 1) + "-" + novaData.getFullYear();
    }

    const dados = {
        "chaveDoador": novaChaveDoador,
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