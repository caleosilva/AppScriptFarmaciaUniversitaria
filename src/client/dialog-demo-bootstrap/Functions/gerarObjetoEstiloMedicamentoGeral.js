export default function gerarObjetoEstiloMedicamentoGeral(medicamento) {

    var chaveGeral = (medicamento.nome + "#" + medicamento.principioAtivo + "#" + medicamento.apresentacao).toString().toLowerCase().replace(/\s+/g, '');

    let dataCadastro = medicamento.dataCadastro;
    let dataCadastroFormatada = medicamento.dataCadastroFormatada;
    let nome = medicamento.nome;
    let principioAtivo = medicamento.principioAtivo;
    let classe = medicamento.classe;
    let tarja = medicamento.tarja;
    let apresentacao = medicamento.apresentacao;

    const dados = {
        chaveGeral,
        dataCadastro,
        dataCadastroFormatada,
        nome,
        principioAtivo,
        classe,
        tarja,
        apresentacao
    }

    return dados
}
