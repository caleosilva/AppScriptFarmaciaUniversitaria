export default class Doador{
    chavePaciente: string;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    telefone: string;
    tipoPaciente: string;
    complemento: string;
    sexo: string;
    estadoCivil: string;
    cidade: string;
    bairro: string;
    endereco: string;
    numero: string;
    comoSoube: string;
    
    constructor(chavePaciente: string, nome: string, cpf: string, dataNascimento: Date, telefone: string, tipoPaciente: string, complemento: string, sexo: string, estadoCivil: string, cidade: string, bairro: string, endereco: string, numero: string, comoSoube: string){
        this.chavePaciente = chavePaciente;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
        this.tipoPaciente = tipoPaciente;
        this.complemento = complemento;
        this.sexo = sexo;
        this.estadoCivil = estadoCivil;
        this.cidade = cidade;
        this.bairro = bairro;
        this.endereco = endereco;
        this.numero = numero;
        this.comoSoube = comoSoube;
    }

}