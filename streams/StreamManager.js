import { pipeline } from 'stream';
import FileReaderStream from './fileStreams/FileReaderStream.js'
import FileTransformStream from './fileStreams/FileTransformStream.js'
import FileWriterStream from './fileStreams/FileWriterStream.js'


class StreamManager {
    constructor(fileInputPath, fileOutputPath, chunk) {
        const fileReaderStream = new FileReaderStream(fileInputPath, chunk);
        const fileWriterStream = new FileWriterStream(fileOutputPath);
        pipeline(
            fileReaderStream,
            //new FileTransformStream(chunk),
            fileWriterStream,
            (error) => {
                if (error) { /*  error handler */ }
                else {
                    console.log('finished');
                }
            }
        )
    }
}

export default StreamManager;
