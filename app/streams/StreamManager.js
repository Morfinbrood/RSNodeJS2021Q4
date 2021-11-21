import { pipeline } from 'stream';
import FileReaderStream from './FileReaderStream.js';
import TransformStream from './TransformStream.js';
import FileWriterStream from './FileWriterStream.js';
import CipherShift from '../cryptographers/CipherShift.js';
import CipherAtbash from '../cryptographers/CipherAtbash.js';
import { ALPHABET, CAESAR_SHIFT, ROT8_SHIFT } from '../../const.js';
import ConfigError from '../Errors/ConfigError.js';
import ErrorHandler from '../Errors/ErrorHandler.js';

class StreamManager {
    constructor(fileInputPath, fileOutputPath, chunkLength, configTransformStreamsNames) {
        this.inputStream;
        this.outputStream;
        this.transformStreams;

        this.initInputStream(fileInputPath, chunkLength);
        this.initOutputStream(fileOutputPath, chunkLength);
        this.initCryptographersInstances();
        this.initTransformStreamsByConfig(configTransformStreamsNames);
    }

    run() {
        pipeline(
            this.inputStream,
            ...this.transformStreams,
            this.outputStream,
            (error) => {
                if (error) {
                    ErrorHandler.errorHandler(error);
                }
                else {
                    console.log('program finished');
                }
            }
        )
    }

    initTransformStreamsByConfig(configTransformStreamsNames) {
        this.transformStreams = configTransformStreamsNames.map((streamName) => {
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
                    ErrorHandler.errorHandler(new ConfigError(`Can't iniciate unkown transform stream  ${streamName}`));
            }
        })
        return true;
    }

    initInputStream(fileInputPath, chunkLength) {
        if (fileInputPath) {
            this.inputStream = new FileReaderStream(fileInputPath, chunkLength);
        }
        else {
            this.inputStream = process.stdin;
        }
        return true;
    }

    initOutputStream(fileOutputPath, chunkLength) {
        if (fileOutputPath) {
            this.outputStream = new FileWriterStream(fileOutputPath, chunkLength);
        }
        else {
            this.outputStream = process.stdout;
        }
        return true;
    }

    initCryptographersInstances() {
        this.cryptographerCaesar = new CipherShift(ALPHABET, CAESAR_SHIFT);
        this.cryptographerRot8 = new CipherShift(ALPHABET, ROT8_SHIFT);
        this.cryptographerAtbash = new CipherAtbash(ALPHABET);
        return true;
    }

}

export default StreamManager;