class CipherShift {
    constructor(alphabet, shift) {
        this.alphabet = alphabet;
        this.alphabetLenght = this.alphabet.uppercase.length;
        this.shift = shift;
    }

    encode(source) {
        return this.transformText(source, this.shift);
    }

    decode(source) {
        return this.transformText(source, -this.shift);
    }

    transformText(source, shift) {
        const sourceArr = source.split('');

        const transformedArr = sourceArr.map((character) => {
            const indexOfUpperCase = this.alphabet.uppercase.indexOf(character);
            let calcTransformIndex;

            if (indexOfUpperCase != -1) {
                calcTransformIndex = this.getTransformIndex(this.alphabetLenght, shift, indexOfUpperCase);
                return this.alphabet.uppercase[calcTransformIndex]
            }
            const indexOfLowerCase = this.alphabet.lowercase.indexOf(character);
            if (indexOfLowerCase != -1) {
                calcTransformIndex = this.getTransformIndex(this.alphabetLenght, shift, indexOfLowerCase);
                return this.alphabet.lowercase[calcTransformIndex]
            }
            return character;
        });

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