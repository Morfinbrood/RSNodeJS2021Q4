import { Transform } from 'stream';

class TransformStream extends Transform {
    constructor(options, transfromFn, cryptographer) {
        super(options);
        this.transfromFn = transfromFn;
    }

    _transform(chunk, encoding, callback) {
        try {
            const resultString = this.transfromFn(chunk.toString());
            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }

}

export default TransformStream;