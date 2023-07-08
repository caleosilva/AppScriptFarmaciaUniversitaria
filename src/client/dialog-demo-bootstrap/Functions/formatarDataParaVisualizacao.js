export default function formatarDataParaVisualizacao(dataRecebida) {
    let textoData = dataRecebida.toString();
    const caracteres = [...textoData]
    const tamanho = caracteres.length;

    var data;

    if (tamanho < 8) {
        return dataRecebida;
    } else if (8 <= tamanho && tamanho <= 10) {
        let temp = dataRecebida + 'T00:00:00Z';
        data = new Date(temp);
        data.setMinutes(data.getMinutes() + data.getTimezoneOffset()); // Ajuste para o fuso horário local
    } else {
        data = new Date(dataRecebida);
        data.setMinutes(data.getMinutes() + data.getTimezoneOffset()); // Ajuste para o fuso horário local
    }

    var dia = data.getDate();
    if (dia < 10) {
        dia = '0' + dia; // Adiciona um zero à esquerda para dias menores que 10
    }

    var mes = data.getMonth() + 1; // Os meses são indexados a partir de 0, então é necessário adicionar 1
    if (mes < 10) {
        mes = '0' + mes; // Adiciona um zero à esquerda para meses menores que 10
    }

    var ano = data.getFullYear();

    var dataFormatada = dia + '/' + mes + '/' + ano;
    return dataFormatada;
}