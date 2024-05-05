const secretKey = "#$HaLaBaRdAtOBrOnSReDnOwIeCzA1410";
const iv = CryptoJS.lib.WordArray.random(16);

export function szyfrowanieDanych(data){
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey,
      { iv }
    ).toString();
        
    deszyfrowanieDanych(encryptedData)

    return encryptedData
}

export function deszyfrowanieDanych(encryptedData){
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey, { iv });
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

    return decryptedData
}