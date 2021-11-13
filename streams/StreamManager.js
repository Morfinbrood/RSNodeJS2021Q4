import { pipeline } from 'stream';
import FileReaderStream from './FileReaderStream.js';
import TransformStream from './TransformStream.js';
import FileWriterStream from './FileWriterStream.js';

import CipherShift from '../cryptographers/CipherShift.js';
import CipherAtbash from '../cryptographers/CipherAtbash.js';
import { ALPHABET, CAESAR_SHIFT, ROT8_SHIFT } from '../const.js';


class StreamManager {
    constructor(fileInputPath, fileOutputPath, chunkLength, configTransformStreamsNames) {
        this.fileInputPath = fileInputPath;
        this.fileOutputPath = fileOutputPath;
        this.chunkLength = chunkLength;
        this.configTransformStreamsNames = configTransformStreamsNames;
        this.cryptographerCaesar = new CipherShift(ALPHABET, CAESAR_SHIFT);
        this.cryptographerRot8 = new CipherShift(ALPHABET, ROT8_SHIFT);
        this.cryptographerAtbash = new CipherAtbash(ALPHABET);
    }

    run() {

        this.setConfigTransformStreams(this.configTransformStreamsNames);
        pipeline(
            new FileReaderStream(this.fileInputPath, this.chunkLength),
            ...this.transformStreams,
            new FileWriterStream(this.fileOutputPath),
            (error) => {
                if (error) {
                    // TODO imlement errorHandler class
                    switch (error.errno) {
                        case -4058:
                            console.error(`ERROR: no such file or directory, open ${error.path}`);
                            process.exit(-1);
                        case -4048:
                            console.error('ERROR: no permissions to write file');
                            process.exit(-1);
                        default:
                            console.error('ERROR: program terminated abnormally with unknown error');
                            console.error(error);
                            process.exit(-1);
                    }
                }
                else {
                    console.log('program finished');
                }
            }
        )
    }

    setConfigTransformStreams() {
        this.transformStreams = this.configTransformStreamsNames.map((streamName) => {
            switch (streamName) {
                case 'C1':
                    return new TransformStream({}, this.cryptographerCaesar.encode.bind(this.cryptographerCaesar));
                case 'C0':
                    return new TransformStream({}, this.cryptographerCaesar.decode.bind(this.cryptographerCaesar));
                case 'R1':
                    return new TransformStream({}, this.cryptographerRot8.encode.bind(this.cryptographerRot8));
                case 'R0':
                    return new TransformStream({}, this.cryptographerRot8.decode.bind(this.cryptographerRot8));
                case 'A':
                    return new TransformStream({}, this.cryptographerAtbash.encode.bind(this.cryptographerAtbash));
                default:
                    console.error(`Can't iniciate unkown transform stream  ${streamName} `);
                    process.exit(-1);
            }
        })
        return true;
    }
}

export default StreamManager;