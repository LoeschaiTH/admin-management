import CryptoJS from 'crypto-js';

const key = process.env.keySecret 

export function encrypted(data) {
  const jsonString = JSON.stringify(data)

  if (key) {
    const encryptedData = CryptoJS.AES.encrypt(jsonString, key).toString();
    return encryptedData;
  } else {
    throw new Error('Key not found');
  }
}

export function decrypted(data) {
  if (key) {
    const bytes = CryptoJS.AES.decrypt(data, key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } else {
    throw new Error('Key not found');
  }
}