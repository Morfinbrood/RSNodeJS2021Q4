import { pipeline } from 'stream';
import FileReaderStream from './fileStreams/FileReaderStream.js'
import FileTransformStream from './fileStreams/FileTransformStream.js'
import FileWriterStream from './fileStreams/FileWriterStream.js'


class StreamManager {
    constructor(fileInputPath, fileOutputPath, chunk) {
        pipeline(
            new FileReaderStream(fileInputPath, chunk),
            new FileTransformStream(),
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