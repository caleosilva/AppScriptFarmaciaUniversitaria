export default class MedicamentoGeral {
    chaveGeral: string;
    dataCadastro: Date;
    dataCadastroFormatada: string;
    nome: string;
    principioAtivo: string;
    tarja: string;
    classe: string;
    apresentacao: string;

    constructor(chaveGeral: string, dataCadastro: Date, dataCadastroFormatada: string, nome: string, principioAtivo: string, tarja: string, classe: string, apresentacao: string) {

        this.chaveGeral = chaveGeral;
        this.dataCadastro = dataCadastro;
        this.dataCadastroFormatada = dataCadastroFormatada;
        this.nome = nome;
        this.principioAtivo = principioAtivo;
        this.tarja = tarja;
        this.classe = classe;
        this.apresentacao = apresentacao;
    }
}