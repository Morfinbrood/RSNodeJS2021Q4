import ArgumentParser from './argumentParser/ArgumentParser.js';
import StreamManager from './streams/StreamManager.js';
import ConfigParser from './configParser.js';
import { CHUNK_LENGTH } from './const.js';

const argumentsCLI = ArgumentParser.getParsedArguments();
const configTransformStreamsNames = ConfigParser.parseConfigToNameOfTransforms(argumentsCLI.config);

const fileInputPath = argumentsCLI.input;
const fileOutputPath = argumentsCLI.output;
const chunkLength = CHUNK_LENGTH;
const streamManager = new StreamManager(fileInputPath, fileOutputPath, chunkLength, configTransformStreamsNames);

streamManager.run();