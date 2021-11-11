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


class ChainResult {
    constructor(inputText) {
        this.res = inputText;
    }

    C1() {
        this.res = CryptographerCaesar.encode(this.res);
        return this;
    }

    C0() {
        this.res = CryptographerCaesar.decode(this.res);
        return this;
    }

    R1() {
        this.res = CryptographerRot8.encode(this.res);
        return this;
    }

    R0() {
        this.res = CryptographerRot8.decode(this.res);
        return this;
    }

    A() {
        this.res = CryptographerAtbash.encode(this.res);
        return this;
    }

}

function tests() {
    const inputText = 'This is secret. Message about "_" symbol!';
    let expectedText, res, chainResult;

    console.log('TEST1 ');
    chainResult = new ChainResult(inputText);
    // C1-C1-R0-A
    res = chainResult.C1().C1().R0().A().res

    expectedText = `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`;
    console.log(res === expectedText);

    console.log('TEST2 ');
    chainResult = new ChainResult(inputText);
    // C1-C0-A-R1-R0-A-R0-R0-C1-A
    res = chainResult.C1().C0().A().R1().R0().A().R0().R0().C1().A().res

    expectedText = `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`;
    console.log(res === expectedText);

    console.log('TEST3 ');
    chainResult = new ChainResult(inputText);
    // A-A-A-R1-R0-R0-R0-C1-C1-A
    res = chainResult.A().A().A().R1().R0().R0().R0().C1().C1().A().res
    expectedText = `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`;
    console.log(res === expectedText);

    console.log('TEST4 ');
    // C1-R1-C0-C0-A-R0-R1-R1-A-C1
    chainResult = new ChainResult(inputText);
    res = chainResult.C1().R1().C0().C0().A().R0().R1().R1().A().C1().res

    expectedText = `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`;
    console.log(res === inputText);

}

tests();