import CipherShift from './Cryptographers/CipherShift.js';
import CipherAtbash from './cryptographers/CipherAtbash.js';

import { readFile } from 'fs/promises';
const json = JSON.parse(
    await readFile('./assets/alphabets.json')
)

// config
const CAESAR_SHIFT = 1;
const ROT8_SHIFT = 8;

console.log('app is started');
const alphabet = json.en;

const CryptographerCaesar = new CipherShift(alphabet, CAESAR_SHIFT);
const CryptographerRot8 = new CipherShift(alphabet, ROT8_SHIFT);
const CryptographerAtbash = new CipherAtbash(alphabet);

CryptographerCaesar.encode('test1');
CryptographerRot8.encode('test2');
CryptographerAtbash.encode('test3');


CryptographerCaesar.decode('test4');
CryptographerRot8.decode('test5');
CryptographerAtbash.decode('test6');


console.log('app is finished');