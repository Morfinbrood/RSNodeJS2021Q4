class CipherShift {
    constructor(alphabet, shift) {
        this.alphabet = alphabet;
        this.shift = shift;
        console.log(`init CipherShift shift = ${this.shift} alphabet = ${this.alphabet.uppercase}`);
    }

    encode(source) {
        console.log(`CipherShift encoding with source = ${source}`);
        return source;
    }

    decode(source) {
        console.log(`CipherShift decoding with source = ${source}`);
        return source;
    }

}

export default CipherShift