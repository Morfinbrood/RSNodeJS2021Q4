import Cipher from "./cipher.js";

import { readFile } from 'fs/promises';
const json = JSON.parse(
    await readFile('./alphabet.json')
)

console.log ("app is started");
const alphabet = json.en;

Cipher.encode("empty", alphabet);

console.log ("app is finished");