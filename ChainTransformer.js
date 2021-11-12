import CipherShift from './cryptographers/CipherShift.js';
import CipherAtbash from './cryptographers/CipherAtbash.js';
import { ALPHABET, CAESAR_SHIFT, ROT8_SHIFT } from './config.js';

class ChainTransformer {
    constructor(inputText) {
        this.res = inputText;
        this.cryptographerCaesar = new CipherShift(ALPHABET, CAESAR_SHIFT);
        this.cryptographerRot8 = new CipherShift(ALPHABET, ROT8_SHIFT);
        this.cryptographerAtbash = new CipherAtbash(ALPHABET);
    }

    C1() {
        this.res = this.cryptographerCaesar.encode(this.res);
        return this;
    }

    C0() {
        this.res = this.cryptographerCaesar.decode(this.res);
        return this;
    }

    R1() {
        this.res = this.cryptographerRot8.encode(this.res);
        return this;
    }

    R0() {
        this.res = this.cryptographerRot8.decode(this.res);
        return this;
    }

    A() {
        this.res = this.cryptographerAtbash.encode(this.res);
        return this;
    }

}

export default ChainTransformer;