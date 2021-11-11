class CipherShift {
    constructor(alphabet, shift) {
        this.alphabet = alphabet;
        this.shift = shift;
        console.log(`init CipherShift shift = ${this.shift}`);
    }

    encode(source) {
        return this.transformText(source, this.shift);
    }

    decode(source) {
        return this.transformText(source, -this.shift);
    }

    transformText(source, shift) {
        console.log(`source = source ${source}`);
        const sourceArr = source.split('');
        console.log(`sourceArr =  ${sourceArr}`);

        const transformedArr = sourceArr.map((character, i, arr) => {
            const indexOfUpperCase = this.alphabet.uppercase.indexOf(character);
            let calcTransformIndex = this.getTransformIndex(arr.length, shift, indexOfUpperCase);

            if (indexOfUpperCase != -1) {
                return this.alphabet.uppercase[calcTransformIndex]
            }
            const indexOfLowerCase = this.alphabet.lowercase.indexOf(character);
            if (indexOfLowerCase != -1) {
                return this.alphabet.lowercase[calcTransformIndex]
            }
            return character;
        }, '');

        return transformedArr.join('');
    }

    getTransformIndex(alphLength, shift, i) {
        if (shift >= 0) {
            return (i + shift) % alphLength;
        }
        else {
            if (i + shift < 0) {
                return i + shift + alphLength;
            };
            return i + shift;
        }
    }


}

export default CipherShift