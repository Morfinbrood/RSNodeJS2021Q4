class CipherAtbash {
    constructor(alphabet) {
        this.alphabet = alphabet;
        console.log(`init CipherAtbash alphabet`);
    }

    encode(source) {
        console.log(`CipherAtbash encoding with source = ${source}`);
        return source;
    }

    decode(source) {
        console.log(`CipherAtbash decoding with source = ${source}`);
        return source;
    }

}

export default CipherAtbash