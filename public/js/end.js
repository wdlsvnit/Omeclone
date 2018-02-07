"use strict";

let test = {};
// pass receiverpublickey here
function encrypt(message) {
  let PassPhrase = "The Moon is a Harsh Mistress.";
  let Bits = 1024;
  let MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
  let MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey);

  // let plainText = "sumedh is handsome";
  let encryptedPlain = cryptico.encrypt(message, MattsPublicKeyString);
  // return MattsRSAkey along with the encryptedPlain texxt.
  encryptedPlain.MattsRSAkey = MattsRSAkey;
  return encryptedPlain;
}

function decrypt(data) {
  let decryptedPlainText = cryptico.decrypt(data.cipher, data.MattsRSAkey);
  console.log(decryptedPlainText);
  return decryptedPlainText;
}
