"use strict";

let iv = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

function encode(message) {
  let textBytes = aesjs.utils.utf8.toBytes(message);
  let aesCtr = new aesjs.ModeOfOperation.ctr(iv, new aesjs.Counter(5));
  let encryptedBytes = aesCtr.encrypt(textBytes);
  let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

function decode(encrypted) {
  let encryptedBytes = aesjs.utils.hex.toBytes(encrypted);
  let aesCtr = new aesjs.ModeOfOperation.ctr(iv, new aesjs.Counter(5));
  let decryptedBytes = aesCtr.decrypt(encryptedBytes);
  let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
}