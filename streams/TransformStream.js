import { Transform } from 'stream';

class TransformStream extends Transform {
    constructor(options, transfromFn, cryptographer) {
        super(options);
        this.transfromFn = transfromFn;
    }

    _transform(chunk, encoding, callback) {
        try {
            console.log(`TRANSFORMING chunk = ${chunk} with fn = ${this.transfromFn}`);
            const resultString = this.transfromFn(chunk.toString());
            console.log(`TRANSFORMING result = ${resultString}`);
            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }

}

export default TransformStream;