import CipherShift from './Cryptographers/CipherShift.js';
import CipherAtbash from './cryptographers/CipherAtbash.js';
import { readFile } from 'fs/promises';

const json = JSON.parse(
    await readFile('./assets/alphabets.json')
)

// config
const CAESAR_SHIFT = 1;
const ROT8_SHIFT = 8;
const alphabet = json.en;

const CryptographerCaesar = new CipherShift(alphabet, CAESAR_SHIFT);
const CryptographerRot8 = new CipherShift(alphabet, ROT8_SHIFT);
const CryptographerAtbash = new CipherAtbash(alphabet);



// tests

function C1(text) {
    return CryptographerCaesar.encode(text);
}

function C0(text) {
    return CryptographerCaesar.decode(text);
}

function R1(text) {
    return CryptographerRot8.encode(text);
}

function R0(text) {
    return CryptographerRot8.decode(text);
}

function A(text) {
    return CryptographerAtbash.encode(text);
}

function tests() {
    const inputText = 'This is secret. Message about "_" symbol!';
    let expectedText, res;

    console.log('TEST1 ');
    // C1-C1-R0-A
    res = A(R0(C1(C1(inputText))));
    expectedText = `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`;
    console.log(res === expectedText);

    console.log('TEST2 ');
    // C1-C0-A-R1-R0-A-R0-R0-C1-A
    res = A(C1(R0(R0(A(R0(R1(A(C0(C1(inputText))))))))));
    expectedText = `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`;
    console.log(res === expectedText);

    console.log('TEST3 ');
    // A-A-A-R1-R0-R0-R0-C1-C1-A
    res =A(C1(C1(R0(R0(R0(R1(A(A(A(inputText))))))))));
    expectedText = `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`;
    console.log(res === expectedText);

    console.log('TEST4 ');
    // C1-R1-C0-C0-A-R0-R1-R1-A-C1
    res =C1(A(R1(R1(R0(A(C0(C0(R1(C1(inputText))))))))));
    expectedText = `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`;
    console.log(res === inputText);

}

tests();

