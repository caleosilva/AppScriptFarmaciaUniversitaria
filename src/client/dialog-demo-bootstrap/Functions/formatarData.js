export default function formatarData(data) {

    let textoData = data.toString();
    const caracteres = [...textoData]
    const tamanho = caracteres.length;

    if (tamanho < 8){
        return data
    }
    
    var novaData = new Date(data);
    var novaDataFormatada = (novaData.getUTCDate()) + "-" + (novaData.getMonth() + 1) + "-" + novaData.getFullYear();

    return novaDataFormatada;
}