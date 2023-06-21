export default function formatarData(data) {
    const caracteres = [...data]
    const tamanho = caracteres.length;

    if (tamanho <= 10){
        return data
    }

    var novaData = new Date(data);
    var novaDataFormatada = (novaData.getUTCDate()) + "-" + (novaData.getMonth() + 1) + "-" + novaData.getFullYear();

    return novaDataFormatada;
}