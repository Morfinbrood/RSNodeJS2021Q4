import { Transform } from 'stream';

class FileTransformStream extends Transform {
    _transform(chunk, encoding, callback) {
        try {
            const resultString = `*${chunk.toString('utf8')}*`;
            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }
}

export default FileTransformStream;