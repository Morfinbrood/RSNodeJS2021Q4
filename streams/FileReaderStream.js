
import { Readable } from 'stream';
import fs from 'fs';

class FileReaderStream extends Readable {
    constructor(filename, chunkLength) {
        super();
        this.filename = filename;
        this.fd = null;
        this.chunkLength = chunkLength;
    }
    _construct(callback) {
        fs.open(this.filename, 'r', (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }
    _read() {
        const buf = Buffer.alloc(this.chunkLength);
        fs.read(this.fd, buf, 0, this.chunkLength, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err);
            } else {
                this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
            }
        });
    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}

export default FileReaderStream;