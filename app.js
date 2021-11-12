


// tests 

// import Tests from './tests/tests.js'

// Tests.tests();


import StreamManager from './streams/StreamManager.js'

const fileInputPath = './input-output/input.txt';
const fileOutputPath = './input-output/output.txt';

new StreamManager(fileInputPath, fileOutputPath, 10);

