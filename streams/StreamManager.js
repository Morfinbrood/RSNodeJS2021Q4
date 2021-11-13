import { pipeline } from 'stream';
import FileReaderStream from './FileReaderStream.js';
import TransformStream from './TransformStream.js';
import FileWriterStream from './FileWriterStream.js';

import CipherShift from '../cryptographers/CipherShift.js';
import CipherAtbash from '../cryptographers/CipherAtbash.js';
import { ALPHABET, CAESAR_SHIFT, ROT8_SHIFT } from '../const.js';


class StreamManager {
    constructor(fileInputPath, fileOutputPath, chunkLength) {

        const cryptographerCaesar = new CipherShift(ALPHABET, CAESAR_SHIFT);
        const cryptographerRot8 = new CipherShift(ALPHABET, ROT8_SHIFT);
        const cryptographerAtbash = new CipherAtbash(ALPHABET);

        const transformStreams = [
            new TransformStream({}, cryptographerCaesar.encode.bind(cryptographerCaesar)),
            new TransformStream({}, cryptographerCaesar.encode.bind(cryptographerCaesar)),
            new TransformStream({}, cryptographerRot8.decode.bind(cryptographerRot8)),
            new TransformStream({}, cryptographerAtbash.encode.bind(cryptographerAtbash))
        ];
        pipeline(
            new FileReaderStream(fileInputPath, chunkLength),
            ...transformStreams,
            new FileWriterStream(fileOutputPath),
            (error) => {
                if (error) {
                    // TODO imlement errorHandler class
                    switch (error.errno) {
                        case -4058:
                            console.log(`ERROR: no such file or directory, open ${error.path}`);
                            process.exit(-1);
                        case -4048:
                            console.log('ERROR: no permissions to write file');
                            process.exit(-1);
                        default:
                            console.log('ERROR: program terminated abnormally with unknown error');
                            console.log(error);
                            process.exit(-1);
                    }
                }
                else {
                    console.log('program finished');
                }
            }
        )
    }

}

export default StreamManager;