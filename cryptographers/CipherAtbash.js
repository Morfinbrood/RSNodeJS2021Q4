class CipherAtbash {
    constructor(alphabet) {
        this.alphabet = alphabet;
        this.reversedAlphabet = {};
        this.reversedAlphabet.uppercase = this.alphabet.uppercase.join('').split('').reverse();
        this.reversedAlphabet.lowercase = this.alphabet.lowercase.join('').split('').reverse();
        // console.log(`init CipherAtbash alphabet`);
    }

    encode(source) {
        return this.transformText(source);
    }

    decode(source) {
        this.encode(source);
    }

    transformText(source) {
        // console.log(` transformText: source = source ${source}`);
        const sourceArr = source.split('');
        // console.log(`sourceArr =  ${sourceArr}`);


        // console.log(`reversedAlphabet =  ${this.reversedAlphabet.uppercase}`);


        const transformedArr = sourceArr.map((character) => {
            const indexOfUpperCase = this.alphabet.uppercase.indexOf(character);
            // console.log(`indexOfUpperCase= ${indexOfUpperCase}`);
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