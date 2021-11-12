class CipherAtbash {
    constructor(alphabet) {
        this.alphabet = alphabet;
        this.reversedAlphabet = {};
        this.reversedAlphabet.uppercase = this.alphabet.uppercase.join('').split('').reverse();
        this.reversedAlphabet.lowercase = this.alphabet.lowercase.join('').split('').reverse();
    }

    encode(source) {
        return this.transformText(source);
    }

    decode(source) {
        this.encode(source);
    }

    transformText(source) {
        const sourceArr = source.split('');

        const transformedArr = sourceArr.map((character) => {
            const indexOfUpperCase = this.alphabet.uppercase.indexOf(character);
            if (indexOfUpperCase != -1) {
                return this.reversedAlphabet.uppercase[indexOfUpperCase]
            }

            const indexOfLowerCase = this.alphabet.lowercase.indexOf(character);
            if (indexOfLowerCase != -1) {
                return this.reversedAlphabet.lowercase[indexOfLowerCase]
            }
            return character;
        });

        return transformedArr.join('');
    }

}

export default CipherAtbash