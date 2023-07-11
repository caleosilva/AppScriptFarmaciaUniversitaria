var CryptoJS = require("crypto-js");

export default function gerarHashCode(string) {
    var hash = CryptoJS.SHA256(string);
    var hashString = hash.toString(CryptoJS.enc.Base64);
    return hashString;
}