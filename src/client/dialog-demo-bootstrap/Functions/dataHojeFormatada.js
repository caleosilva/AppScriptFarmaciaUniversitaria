export default function formatarData() {
    var dataHoje = new Date();
    var dataHojeFormatada = (dataHoje.getUTCDate()) + "-" + (dataHoje.getMonth() + 1) + "-" + dataHoje.getFullYear();
    
    return dataHojeFormatada;
}