import { Writable } from 'stream';
import fs from 'fs';
import OutputError from '../Errors/OutputError.js'
import ErrorHandler from '../Errors/ErrorHandler.js'

class FileWriterStream extends Writable {
    constructor(filename) {
        super();
        this.filename = filename;
    }
    _construct(callback) {
        fs.access(this.filename, fs.F_OK, (err) => {
            if (err) {
                if (err.errno === -4058)
                    callback(new OutputError(`File does not exist ${err.path}`));
                return;
            }

            fs.open(this.filename, 'a', (err, fd) => {
                this.fd = fd;
                callback();
            });
        })
    }
    _write(chunk, encoding, callback) {
        fs.write(this.fd, chunk, callback);
    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}

export default FileWriterStream;