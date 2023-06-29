export default class Doador{
    chaveDoador: string;
    nome: string;
    tipoDoador: string;
    cidade: string;
    bairro: string;
    endereco: string;
    numero: string;
    comoSoube: string;
    cnpj: number;
    cpf: number;
    dataNascimento: Date;
    sexo: string;
    estadoCivil: string;

    constructor(chaveDoador: string, nome: string, tipoDoador: string, cidade: string, bairro: string, endereco: string, numero: string, comoSoube: string, cnpj: number, cpf: number, dataNascimento: Date, sexo: string, estadoCivil: string){

        this.chaveDoador = chaveDoador;
        this.nome = nome;
        this.tipoDoador = tipoDoador;
        this.cidade = cidade;
        this.bairro = bairro;
        this.endereco = endereco;
        this.numero = numero;
        this.comoSoube = comoSoube;
        this.cnpj = cnpj;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;
        this.estadoCivil = estadoCivil;
    }
}