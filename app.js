


// tests 

// import Tests from './tests/tests.js'

// Tests.tests();


// import StreamManager from './streams/StreamManager.js'

// const fileInputPath = './input-output/input.txt';
// const fileOutputPath = './input-output/output.txt';

// new StreamManager(fileInputPath, fileOutputPath, 10);





import ArgumentParser from './argumentParser/ArgumentParser.js'

const argumentsCLI = ArgumentParser.getParsedArguments();
console.log(` config =  ${argumentsCLI.config}`);
console.log(` input =  ${argumentsCLI.input}`);
console.log(` output =  ${argumentsCLI.output}`);

import ConfigParser from './configParser.js';
const transfromStreamArrOfNames = ConfigParser.parseConfigToNameOfTransforms(argumentsCLI.config);

console.log(`Config = ${transfromStreamArrOfNames}`);

console.log(` chkConfigValid   ${ConfigParser.chkConfigValid(transfromStreamArrOfNames)}`);