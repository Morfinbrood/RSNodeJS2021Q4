import ComandlineParser from './app/comandlineParser/ComandlineParser.js';
import StreamManager from './app/streams/StreamManager.js';
import ConfigParser from './app/configParser.js';
import { CHUNK_LENGTH } from './const.js';

// debug
// process.argv = ['123', '123', '-c', 'C1-C0-A-R1-R0-A-R0-R0-C1-A', '-i', './input.txt', -o, './output.txt'];


const argumentsCLI = ComandlineParser.getParsedArguments();
const configTransformStreamsNames = ConfigParser.parseConfigToNameOfTransforms(argumentsCLI.config);

const fileInputPath = argumentsCLI.input;
const fileOutputPath = argumentsCLI.output;
const chunkLength = CHUNK_LENGTH;
const streamManager = new StreamManager(fileInputPath, fileOutputPath, chunkLength, configTransformStreamsNames);

streamManager.run();