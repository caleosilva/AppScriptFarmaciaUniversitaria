export default function formatarData(data){
    var novaData = new Date(data);
    var novaDataFormatada = (novaData.getUTCDate()) + "-" + (novaData.getMonth() + 1) + "-" + novaData.getFullYear();

    return novaDataFormatada;
}